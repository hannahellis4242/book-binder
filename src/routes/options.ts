import { Router } from "express";
import axios from "axios";
import Problem from "../model/SignatureFinder/Problem";
import SignatureList from "../model/SignatureFinder/SignatureList";
import {
  readSignatureOption,
  writeSignatureOption,
} from "../util/signatureOptionIO";

const url = "http://sigature_finder:8080/";

const options = Router();
options.get("/", async (req, res) => {
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  const { pages, maxAllowed, sizes } = report;
  if (!pages) {
    res.redirect("/error");
    return;
  }
  if (!maxAllowed) {
    res.redirect("/error");
    return;
  }
  if (!sizes) {
    res.redirect("/error");
    return;
  }
  const problem: Problem = {
    minimum: pages,
    maximum: maxAllowed,
    sizes,
    format: "json",
    pageCount: true,
  };
  try {
    const key = await axios.post<string>(url, problem).then(({ data }) => data);
    const options = await axios
      .get<SignatureList[]>(url, { params: { key } })
      .then(({ data }) => data);
    if (req.session.report) {
      report.signatureOptions = options;
    }
    const optionStrs = options.map(writeSignatureOption);
    res.render("options", {
      options: optionStrs,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/error");
  }
});
options.post("/", (req, res) => {
  const { option } = req.body;
  if (!option) {
    res.redirect("/error");
    return;
  }
  const { report } = req.session;
  if (!report) {
    res.redirect("/error");
    return;
  }
  report.selectedOption = readSignatureOption(option);
  res.redirect("/sequence");
});

export default options;
