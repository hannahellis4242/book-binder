import express from "express";
import { createProxyServer } from "http-proxy";

const getServerInfo = (name: string, defaultPort: number) => {
  const hostEnv = process.env[`${name}-host`];
  const portEnv = process.env[`${name}-port`];
  return {
    host: hostEnv || "localhost",
    port: portEnv || defaultPort.toString(),
  };
};

const app = express();
const client = getServerInfo("client", 3000);
const book = getServerInfo("book", 5000);

//set up proxy
const proxy = createProxyServer();
app.use("/book", (req, res, next) => {
  console.log("redirecting /book");
  console.log(`http://${book.host}:${book.port}`);
  console.log("/book called with :", req.method, " - ", req.body);
  proxy.web(req, res, { target: `http://${book.host}:${book.port}` }, next);
});
app.use("/", (req, res, next) => {
  console.log("redrecting /");
  proxy.web(req, res, { target: `http://${client.host}:${client.port}` }, next);
});
app.listen(8080, "0.0.0.0", () => {
  console.log("web server started");
});
