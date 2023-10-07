import { Router } from "express";
import sequenceMatches from "../util/sequenceMatches";
import axios from "axios";
import { z } from "zod";

const url = "http://signature_order:8080";

const OptionsSchema = z.array(z.array(z.number().positive().int()));
type Options = z.infer<typeof OptionsSchema>;

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

  try {
    console.log("signatures : ", selectedOption.signatures);
    const key = await axios
      .post(url, selectedOption.signatures)
      .then(({ data }) => data);
    console.log("key :", key);
    const result = await axios.get(`${url}/${key}`).then(({ data }) => data);
    const options = OptionsSchema.parse(result);
    console.log("options :", options);
    const showRetry = "retry" in req.query;
    res.render("sequence", {
      signatures: selectedOption.signatures,
      options,
      showRetry,
    });
  } catch (err: any) {
    console.log(err.message);
    res.redirect("/error");
  }
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
