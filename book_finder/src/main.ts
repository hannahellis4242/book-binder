import express, { json } from "express";
import solveRoute from "./routes/solveRoute";
import solve from "./solver/solve";

const app = express();
app.use(json());
app.use("/solve", solveRoute);

const host = "0.0.0.0";
const port = 5001;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
