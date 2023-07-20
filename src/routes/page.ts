import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";
import ResultPage from "../model/ResultPage";

const data = new PageData("Page Sequence Calculator");
const pattern = /^\s*\d+(?:\s*,\s*\d+)*\s*$/;
type ErrorType = "input" | "number" | "exception";

const page = Router();
page.get("/", (_, res) => res.render("page", data));

const resultUrl = "/page/result/";
const redirectErrorUrl = (error: ErrorType) => `${resultUrl}?error=${error}`;

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
    const signatureValues = JSON.parse(`[${signatures}]`);
    const response = await axios.post(
      "http://page_sequence:8080/",
      signatureValues
    );
    res.redirect(`${resultUrl}?seq=${response.data}`);
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

page.get("/result/", async (req, res) => {
  const { error, seq } = req.query;
  if (error) {
    const pageData = new ResultPage(
      data.title,
      [],
      createErrorMessage(toErrorType(error?.toString()))
    );
    res.render("pageResult", pageData);
    return;
  }
  if (!seq) {
    res.redirect("/page?retry=true");
    return;
  }
  try {
    const response = await axios.get("http://page_sequence:8080/", {
      params: { key: seq.toString() },
    });
    const pageData = new ResultPage(
      data.title,
      response.data,
      createErrorMessage(toErrorType(error?.toString()))
    );
    res.render("pageResult", pageData);
  } catch (e) {
    console.error(
      `***************\n
        Exception thrown\n
        time:${Date.now()}
        url:/page/result\n
        message : ${e}\n
        ***************`
    );
    res.redirect("/page?retry=true");
    return;
  }
});
export default page;
