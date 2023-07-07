import express, { Request, Response } from "express";
import { join } from "path";

const app = express();
const port = 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", "src/views");

app.use(express.static(join(__dirname, "..", "src", "public")));
app.use(
  "/favicon.ico",
  express.static(join(__dirname, "..", "src", "public", "favicon.ico"))
);

// Define a route
app.get("/", (req: Request, res: Response) => {
  res.render("index", { message: "Hello, World!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
