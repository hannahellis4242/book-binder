import express, { json } from "express";
import Library from "./model/Library";

const app = express();
app.use(json());
const library = new Library();

app.post("/", async (req, res) => {
  console.log("post:", req.body);
  const { signatures } = req.body;
  if (signatures) {
    console.log("processing");
    const values: number[] = signatures;
    console.log("values: ", values);
    const signaturesStr = values.map((x) => x.toString()).join("-");
    console.log("signature string : ", signaturesStr);
    const key = await library.register(signaturesStr);
    console.log("sendng key");
    res.json({ key });
  } else {
    res.sendStatus(400);
  }
});

app.get("/", (req, res) => {
  console.log("get", req.query);
  const { key } = req.query;
  console.log("key: ", key);
  if (key) {
    const book = library.book(key as string);
    if (book) {
      res.json({ pages: book.pageNumbers.map((x) => x + 1) });
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

const host: string = "0.0.0.0";
const port: number = 5000;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
