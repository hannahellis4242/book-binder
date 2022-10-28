import express from "express";
import { createProxyServer } from "http-proxy";
import { join } from "path";

const app = express();

app.use("/", express.static(join(__dirname, "..", "public")));

const proxy = createProxyServer();
app.use("/book", (req, res, next) => {
  console.log("using service");
  proxy.web(req, res, { target: "http://localhost:5000" }, next);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("web server started");
});
