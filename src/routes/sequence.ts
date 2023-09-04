import { Router } from "express";
import sequenceMatches from "../util/sequenceMatches";

const sequence = Router();
sequence.get("/", async (req, res) => {
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const { selectedOption } = report;
  if (!selectedOption) {
    res.redirect("/error");
    return;
  }
  const showRetry = "retry" in req.query;
  res.render("sequence", {
    signatures: selectedOption.signatures,
    showRetry,
  });
});
sequence.post("/", (req, res) => {
  console.log("sequence post body :", req.body);
  const { sequence } = req.body;
  if (!sequence) {
    res.redirect("/error");
    return;
  }
  console.log("sequence :", sequence);
  const signatureSequence: number[] = sequence
    .toString()
    .split(",")
    .map((x: string) => Number.parseInt(x));
  console.log("signatureSequence :", signatureSequence);
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const { selectedOption } = report;
  if (!selectedOption) {
    res.redirect("/error");
    return;
  }
  if (!sequenceMatches(selectedOption, signatureSequence)) {
    res.redirect("/sequence?retry=true");
    return;
  }
  report.sequence = signatureSequence;
  console.log(JSON.stringify(req.session.report, null, 2));
  res.redirect("/report");
});

export default sequence;