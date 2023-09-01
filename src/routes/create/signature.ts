import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Pages in your book");

const signature = Router();
signature.get("/", (_, res) => res.render("create/signatures", data));
signature.post("/", (req, res) => {
  const { report } = req.session;
  if (report) {
    report.sizes = Object.keys(req.body).map((x) => Number.parseInt(x));
    if (report.sizes.length === 0) {
      res.redirect("/signatures?retry=true");
    }
  }
  res.redirect("/options");
});

export default signature;
