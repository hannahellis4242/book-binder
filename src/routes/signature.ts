import { Router } from "express";

const signature = Router();
signature.get("/", (_, res) => res.render("signatures"));
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
