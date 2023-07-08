import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";

const data = new PageData("Page Sequence Calculator");
const pattern = /^\s*\d+(?:\s*,\s*\d+)*\s*$/;

const page = Router();
page.get("/", (_, res) => res.render("page", data));
page.post("/submit", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res.redirect(`/page/result?error=input`);
    return;
  }
  if (!pattern.test(signatures)) {
    res.redirect(`/page/result?error=numbers`);
    return;
  }
  try {
    const response = await axios.get("http://page_sequence:8080/", {
      params: { signatures: `[${signatures}]` },
    });
    res.json(response.data);
  } catch (e) {
    res.send(`Error - ${e}`);
  }
});
page.get("/result", (req, res) => {
  const { error } = req.query;

  res.render("pageResult", { ...data, error });
});
export default page;
