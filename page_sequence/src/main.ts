import express, { json } from "express";
import pages from "./routes/pages";

const app = express();
app.use(json());

app.use("/", pages);

const host: string = "0.0.0.0";
const port: number = 5000;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
