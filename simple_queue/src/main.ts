import express, { json } from "express";
import { StatusCodes } from "http-status-codes";

const getPort = (defaultPort: number) => {
  const envVar = process.env.PORT;
  if (!envVar) {
    return defaultPort;
  }
  const portNum = Number(envVar);
  if (isNaN(portNum)) {
    return defaultPort;
  }
  return portNum;
};

const host = process.env.HOST || "0.0.0.0";
const port = getPort(6000);

const app = express();
app.use(json());

const queue: any[] = [];

app.post("/", (req, res) => {
  queue.push(req.body);
  res.sendStatus(StatusCodes.ACCEPTED);
});

app.get("/", (_, res) => {
  const message = queue.shift();
  if (!message) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  res.json(message);
});

app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
