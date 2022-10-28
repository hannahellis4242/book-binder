import express from "express";
import { createProxyServer } from "http-proxy";
import { join } from "path";

const app = express();

//set up proxy
const proxy = createProxyServer();
app.use("/", (req, res, next) => {
  proxy.web(req, res, { target: "http://localhost:3000" }, next);
});
app.use("/book", (req, res, next) => {
  proxy.web(req, res, { target: "http://localhost:5000" }, next);
});

app.listen(8080, "0.0.0.0", () => {
  console.log("web server started");
});
