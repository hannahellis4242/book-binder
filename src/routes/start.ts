import { Router } from "express";

const start = Router();
start.get("/", (_, res) => res.render("start"));
start.post("/", (req, res) => {
  req.session.report = {};
  res.redirect("/pages");
});

export default start;
