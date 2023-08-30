import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Pages in your book");

const signature = Router();
signature.get("/", (_, res) => res.render("create/signatures", data));
signature.post("/", (req, res) => {
  const { report } = req.session;
  if (report) {
    report.sizes = Object.keys(req.body).map((x) => Number.parseInt(x));
  }
  res.redirect("/create/options");
});

export default signature;
