import { Router } from "express";

const max = Router();
max.get("/", (_, res) => res.render("max"));
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
      res.redirect("/max?retry=true");
    }
    report.maxAllowed = num;
  }
  console.log(report);
  res.redirect("/signatures");
});

export default max;
