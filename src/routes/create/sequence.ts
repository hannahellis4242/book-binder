import { Router } from "express";
import PageData from "../../model/PageData";
import sequenceMatches from "../../util/sequenceMatches";

const data = new PageData("Signature Sequence");

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
  res.render("create/sequence", {
    ...data,
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
  const signatureSequence = sequence
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
    res.redirect("/create/sequence?retry=true");
    return;
  }
  report.sequence = sequence;
  console.log(JSON.stringify(req.session.report, null, 2));
  res.redirect("/create/report");
});

export default sequence;
