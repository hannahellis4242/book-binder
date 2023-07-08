import express, { json, urlencoded } from "express";
import { join } from "path";
import morgan from "morgan";
import home from "./routes/home";
import page from "./routes/page";
import signature from "./routes/signature";

const app = express();
app.use(morgan("combined"));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "..", "views"));

app.use(json());
app.use(urlencoded());
app.use(express.static(join(__dirname, "..", "public")));

app.use("/", home);
app.use("/page", page);
app.use("/signature", signature);

const port = 8080;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
