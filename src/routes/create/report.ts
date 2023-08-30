import { Router } from "express";
import PageData from "../../model/PageData";
import Report from "../../model/Report";
import axios from "axios";

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
    res.render("create/report", {
      ...data,
      report: fullReport(report),
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
  res.attachment("report.txt").type("txt").send(show(full));
});
export default report;
