import { Router } from "express";
import PageData from "../model/PageData";
import axios from "axios";

const data = new PageData("Signature Finder");

const signature = Router();
signature.get("/", (_, res) => res.render("signature", data));

const formatEndpoint = (format: string) => {
  switch (format) {
    case "text":
      return "/string";
    case "json":
      return "/json";
    default:
      return "";
  }
};

const pagesEndpoint = (count: string) => {
  switch (count) {
    case "yes":
      return "/pages";
    case "no":
      return "";
    default:
      return "";
  }
};

const determineEndpoint = (
  min: string,
  max: string,
  format: string,
  pages: string
) => formatEndpoint(format) + pagesEndpoint(pages) + `\${min}\${max}`;

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
  const response = await axios.get(
    `http:\\signature-finder` +
      determineEndpoint(
        minimum.toString(),
        maximum.toString(),
        format.toString(),
        count.toString()
      ),
    { params: { sizes } }
  );
  console.log(response.data);
  res.redirect("/");
});
export default signature;
