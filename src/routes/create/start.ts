import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Create a book");

const start = Router();
start.get("/", (_, res) => res.render("create/start", data));
start.post("/", (req, res) => {
  if (!req.session.report) {
    req.session.report = {};
  }
  res.redirect("/create/pages");
});

export default start;
