import { Router } from "express";
import PageData from "../../model/PageData";

const data = new PageData("Create a book");

const start = Router();
start.get("/", (_, res) => res.render("create/start", data));
start.post("/", (req, res) => {
  req.session.report = {};
  res.redirect("/pages");
});

export default start;
