import { Router } from "express";
import PageData from "../model/PageData";

const homeData = new PageData("Book Binding Calculators");

const home = Router();
home.get("/", (_, res) => res.render("home", homeData));
export default home;
