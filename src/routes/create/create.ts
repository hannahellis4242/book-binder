import { Router } from "express";
import start from "./start";
import pages from "./pages";
import max from "./max";

const create = Router();
create.use("/start", start);
create.use("/pages", pages);
create.use("/max", max);

export default create;
