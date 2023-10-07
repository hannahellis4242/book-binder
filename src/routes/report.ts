import { Router } from "express";
import Report, { ReportSchema } from "../model/Report";
import axios from "axios";
import showReport, { showSequence } from "../util/showReport";
import createScript from "../util/createScript";

const url = "http://page_sequence:8080/separated";

const fullReport = (report: Partial<Report>): Report | undefined => {
  const result = ReportSchema.safeParse(report);
  return result.success ? result.data : undefined;
};

interface ReportData {
  pages: number;
  signatureSequence: string;
  pageOrder: {
    bySignature: string[];
    full: string;
  };
}

const reportData = (report: Report): ReportData => ({
  pages: report.selectedOption.pages || 0,
  signatureSequence: showSequence(report.sequence),
  pageOrder: {
    bySignature: report.signaturePageSequence.map((x) => showSequence(x)),
    full: showSequence(report.pageSequence),
  },
});

const report = Router();
report.get("/", async (req, res) => {
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const { sequence } = report;
  if (!sequence) {
    res.redirect("/error");
    return;
  }
  try {
    const key = await axios
      .post<string>(url, sequence)
      .then(({ data }) => data);
    const pageSequences = await axios
      .get<number[][]>(url, { params: { key } })
      .then(({ data }) => data);
    report.signaturePageSequence = pageSequences;
    report.pageSequence = pageSequences.flat();
    const full = fullReport(report);
    if (!full) {
      res.redirect("/error");
      return;
    }
    res.render("report", {
      text: reportData(full),
    });
  } catch (err) {
    console.log(err);
    res.redirect("/error");
  }
});
report.get("/save", (req, res) => {
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const full = fullReport(report);
  if (!full) {
    res.redirect("/error");
    return;
  }
  res.attachment("report.txt").type("txt").send(showReport(full));
});
report.post("/", (req, res) => {
  const { filename } = req.body;
  if (!filename) {
    res.redirect("/error");
    return;
  }
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const full = fullReport(report);
  if (!full) {
    res.redirect("/error");
    return;
  }
  res.attachment("binding.sh").type("sh").send(createScript(full, filename));
});
export default report;
