import { Router } from "express";
import start from "./start";
import pages from "./pages";
import max from "./max";
import signature from "./signature";
import options from "./options";
import sequence from "./sequence";

const create = Router();
create.use("/start", start);
create.use("/pages", pages);
create.use("/max", max);
create.use("/signatures", signature);
create.use("/options", options);
create.use("/sequence", sequence);
create.use("/report", (_, res) => {
  res.send("TODO");
});

export default create;
