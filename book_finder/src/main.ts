/*import express, { json } from "express";
import solveRoute from "./routes/solveRoute";

const app = express();
app.use(json());
app.use("/solve", solveRoute);

const host = "0.0.0.0";
const port = 5001;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));*/

import solve from "./solver/solve";

solve(120, 125, [3, 4, 5]).then((books) => console.log(books));
