import { Router } from "express";

const pages = Router();
pages.get("/", (_, res) => res.render("pages"));
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
  res.redirect("/max");
});

export default pages;
