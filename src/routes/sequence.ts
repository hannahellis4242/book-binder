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
    const key = await axios
      .post<string>(url, selectedOption.signatures)
      .then(({ data }) => data);
    const options = await axios
      .get(`${url}/${key}`)
      .then(({ data }) => data)
      .then((x) => OptionsSchema.parse(x));
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
  const { sequence } = req.body;
  if (!sequence) {
    res.redirect("/error");
    return;
  }
  const signatureSequence: number[] = sequence
    .toString()
    .split(",")
    .map((x: string) => Number.parseInt(x));
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
  res.redirect("/report");
});

export default sequence;
