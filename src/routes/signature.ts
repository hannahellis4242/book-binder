import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";
import ResultSignature from "../model/ResultSignature";

const data = new PageData("Signature Finder");

const signature = Router();
signature.get("/", (_, res) => res.render("signature", data));

signature.post("/submit", async (req, res) => {
  console.log(req.body);
  const { minimum, maximum, three, four, five, six, format, count } = req.body;
  const sizes = [];
  if (three) {
    sizes.push(3);
  }
  if (four) {
    sizes.push(4);
  }
  if (five) {
    sizes.push(5);
  }
  if (six) {
    sizes.push(6);
  }
  console.log("sizes :", sizes);
  if (sizes.length === 0) {
    res.redirect("/signature/error/length");
    return;
  }
  if (!minimum) {
    res.redirect("/signature/error/min");
    return;
  }
  if (!maximum) {
    res.redirect("/signature/error/max");
    return;
  }
  if (!format) {
    res.redirect("/signature/error/format");
    return;
  }
  if (!count) {
    res.redirect("/signatures/error/count");
    return;
  }
  const response = await axios.post("http://sigature_finder:8080/", {
    minimum: parseInt(minimum),
    maximum: parseInt(maximum),
    sizes,
    format,
    pageCount: count.toString() === "yes",
  });
  res.redirect(`result/${format}?opts=${response.data}`);
});

signature.get("/result/:format", async (req, res) => {
  const { opts } = req.query;
  if (!opts) {
    res.redirect("/signature?retry=true");
    return;
  }
  try {
    const response = await axios.get("http://page_sequence:8080/", {
      params: { key: opts.toString() },
    });
    if (req.params.format === "json") {
      res.json(response.data);
      return;
    }
    const pageData = new ResultSignature(data.title, response.data);
    res.render("signatureResult", pageData);
  } catch (e) {
    console.error(
      `***************\n
        Exception thrown\n
        time:${Date.now()}
        url:/signature/result\n
        message : ${e}\n
        ***************`
    );
    res.redirect("/signature?retry=true");
    return;
  }
});
export default signature;
