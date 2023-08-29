import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Pages in your book");

const pages = Router();
pages.get("/", (_, res) => res.render("create/pages", data));
pages.post("/", (req, res) => {
  const { value } = req.body;
  if (!value) {
    res.redirect("/error");
    return;
  }
  const num = Number.parseInt(value);
  if (Number.isNaN(num)) {
    res.redirect("/error");
    return;
  }
  const { report } = req.session;
  if (report) {
    report.pages = num;
  }
  console.log(report);
  res.redirect("/create/max");
});

export default pages;
