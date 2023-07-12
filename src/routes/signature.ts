import { Router } from "express";
import PageData from "../model/PageData";

const data = new PageData("Signature Finder");

const signature = Router();
signature.get("/", (_, res) => res.render("home", data));
export default signature;
