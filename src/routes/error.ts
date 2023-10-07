import { Router } from "express";

const error = Router();
error.get("/", (_, res) => res.render("error"));

export default error;
