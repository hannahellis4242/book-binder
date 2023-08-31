import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Pages in your book");

const max = Router();
max.get("/", (_, res) => res.render("create/max", data));
max.post("/", (req, res) => {
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
    const { pages } = report;
    if (pages && pages > num) {
      res.redirect("/create/max?retry=true");
    }
    report.maxAllowed = num;
  }
  console.log(report);
  res.redirect("/create/signatures");
});

export default max;
