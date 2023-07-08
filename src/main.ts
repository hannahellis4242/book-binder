import express, { Request, Response, json, urlencoded } from "express";
import { join } from "path";
import morgan from "morgan";
import home from "./routes/home";
import page from "./routes/page";
import signature from "./routes/signature";

const app = express();
app.use(morgan("combined"));
// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", join(__dirname, "..", "src", "/views"));

app.use(json());
app.use(urlencoded());
app.use(express.static(join(__dirname, "..", "src", "public")));
/*app.use(
  "/favicon.ico",
  express.static(join(__dirname, "..", "src", "public", "favicon.ico"))
);*/

app.use("/", home);
app.use("/page", page);
app.use("/signature", signature);

const port = 8080;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
