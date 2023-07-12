import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";
import ResultPage from "../model/ResultPage";
import { encode } from "../utils";

const data = new PageData("Page Sequence Calculator");
const pattern = /^\s*\d+(?:\s*,\s*\d+)*\s*$/;
type ErrorType = "input" | "number" | "exception";

const page = Router();
page.get("/", (_, res) => res.render("page", data));

const resultUrl = "/page/result/";
const resultList = [
  "XU0ukMbBZNoXjw==",
  "RWFzdGVyIEVnZw==",
  "8RiYWgVjGY7UzQ==",
  "V2VsbCBkb25lIGRlY29kaW5nIHRoaXMgbWVzc2FnZQ==",
  "FZSfL3PWQSR7IA==",
  "SGVrYXRl",
  "WW91IG11c3QgYmUgcmVhbGx5IGJvYXJk",
  "rq2Ol-gdjAnWQA==",
  "SGVsbG8gV29ybGQ=",
  "HTfSUlamSg70pg==",
  "+reNlhoRAyObKA==",
];
const redirectErrorUrl = (error: ErrorType) =>
  `${resultUrl}${
    resultList[Math.floor(Math.random() * resultList.length)]
  }?error=${error}`;
page.post("/submit", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res.redirect(redirectErrorUrl("input"));
    return;
  }
  if (!pattern.test(signatures)) {
    res.redirect(redirectErrorUrl("number"));
    return;
  }
  try {
    const response = await axios.get("http://page_sequence:8080/", {
      params: { signatures: `[${signatures}]` },
    });
    const encoded = encode(response.data);
    res.redirect(`${resultUrl}${encoded}`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(
        `***************\n
        Exception thrown\n
        time:${Date.now()}
        url:/page/submit\n
        signatures:${signatures}\n
        message : ${e.message}\n
        ***************`
      );
      res.redirect(redirectErrorUrl("exception"));
      return;
    }
    console.error(
      `***************\n
      Exception thrown\n
      time:${Date.now()}
      url:/page/submit\n
      signatures:${signatures}\n
      error : ${e}\n
      ***************`
    );
    res.redirect(redirectErrorUrl("exception"));
    return;
  }
});

const createErrorMessage = (
  error: ErrorType | undefined
): string | undefined => {
  switch (error) {
    case "input":
      return "No signature sheet size list given";
    case "number":
      return "Please give a comma separated list of the number of sheets in each signature of your book";
    case "exception":
      return "An unknown error occurred. Please alert the owner of this website";
    default:
      return undefined;
  }
};

const toErrorType = (s?: string): ErrorType | undefined => {
  switch (s) {
    case "input":
      return "input";
    case "number":
      return "number";
    case "exception":
      return "exception";
    default:
      return undefined;
  }
};

page.get("/result/:result", (req, res) => {
  const { error } = req.query;
  const pageData = new ResultPage(
    data.title,
    req.params.result,
    createErrorMessage(toErrorType(error?.toString()))
  );
  res.render("pageResult", pageData);
});
export default page;
