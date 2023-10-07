import express, { json, urlencoded } from "express";
import { join } from "path";
import morgan from "morgan";
import session from "express-session";
import routes from "./routes/routes";
import Report from "./model/Report";

declare module "express-session" {
  interface SessionData {
    report: Partial<Report>;
  }
}

const app = express();
app.use(morgan("combined"));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "..", "views"));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "..", "public")));
app.use(session({ secret: "secret", resave: false }));

app.use("/", routes);

const port = 8080;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
