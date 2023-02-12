import express, { json } from "express";
import bookRoute from "./routes/bookRoute";

const app = express();
app.use(json());
app.use("/", bookRoute);

const host = "0.0.0.0";
const port = 5000;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
