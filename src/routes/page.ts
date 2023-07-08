import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";

const data = new PageData("Page Sequence Calculator");
const pattern = /^\s*\d+(?:\s*,\s*\d+)*\s*$/;

const page = Router();
page.get("/", (_, res) => res.render("page", data));
page.post("/submit", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res.send("Error - no signatures given");
    return;
  }
  if (!pattern.test(signatures)) {
    res.send("Error - signatures are not a list of numbers");
  }
  const list: number[] = JSON.parse(`[${signatures}]`);
  console.log(list);
  try {
    const response = await axios.get("http://page_sequence:8080/", {
      params: { signatures: list },
    });
    res.json(response.data);
  } catch (e) {
    res.send(`Error - ${e}`);
  }
});
export default page;
