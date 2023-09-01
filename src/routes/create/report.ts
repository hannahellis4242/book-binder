import { Router } from "express";
import PageData from "../../model/PageData";
import Report from "../../model/Report";
import axios from "axios";
import showReport, { showSequence } from "../../util/showReport";
import { writeSignatureOption } from "../../util/signatureOptionIO";

const data = new PageData("Report");

const url = "http://page_sequence:8080/separated";

const fullReport = ({
  pages,
  maxAllowed,
  sizes,
  signatureOptions,
  selectedOption,
  sequence,
  pageSequence,
  signaturePageSequence,
}: Partial<Report>): Report | undefined => {
  if (
    pages &&
    maxAllowed &&
    sizes &&
    signatureOptions &&
    selectedOption &&
    sequence &&
    pageSequence &&
    signaturePageSequence
  ) {
    return {
      pages,
      maxAllowed,
      sizes,
      signatureOptions,
      selectedOption,
      sequence,
      pageSequence,
      signaturePageSequence,
    };
  }
  return undefined;
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
    console.log(JSON.stringify(reportData(full), null, 2));
    res.render("create/report", {
      ...data,
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
  res.send("TODO");
});
export default report;
