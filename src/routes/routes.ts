import { Router } from "express";
import start from "./start";
import pages from "./pages";
import max from "./max";
import signature from "./signature";
import options from "./options";
import sequence from "./sequence";
import report from "./report";

const routes = Router();
routes.use("/", start);
routes.use("/pages", pages);
routes.use("/max", max);
routes.use("/signatures", signature);
routes.use("/options", options);
routes.use("/sequence", sequence);
routes.use("/report", report);

export default routes;
