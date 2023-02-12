import { Router } from "express";
import { ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import Book from "../model/Book";
import {
  addBook,
  findBookByID,
  findBookByPages,
  findBookByPagesExact,
  findBookBySignatures,
} from "../database/books";
import Signatures from "../model/Signatures";

const bookRoute = Router();

bookRoute.post("/", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res.status(StatusCodes.BAD_REQUEST).json({
      usage: {
        url: "http://book/",
        body: { signatures: "<signature format> for example {3:5,4:2}" },
      },
    });
    return;
  }
  const existing = await findBookBySignatures(signatures);
  if (existing) {
    const { _id } = existing;
    res.status(StatusCodes.NOT_MODIFIED).send(_id);
    return;
  }
  const book = new Book(signatures);
  const bookId = await addBook(book);
  if (!bookId) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    return;
  }
  res.status(StatusCodes.CREATED).send(bookId);
});

bookRoute.get("/id/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const result = await findBookByID(id);
  res.json(result);
});

bookRoute.get("/signatures/:signatures", async (req, res) => {
  try {
    const signatures = JSON.parse(req.params.signatures) as Signatures;
    console.log("signatures:", signatures);
    const result = await findBookBySignatures(signatures);
    if (!result) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    console.log("sending");
    res.json(result);
    console.log("sent");
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

bookRoute.get("/pages", async (req, res) => {
  const { equal, min, max } = req.query;
  const equalValue = Number(equal);
  const minValue = Number(min);
  const maxValue = Number(max);
  if (isNaN(equalValue) && isNaN(minValue) && isNaN(maxValue)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      usage: [
        {
          url: "http://book/pages?equal:<number>",
        },
        {
          url: "http://book/pages?min:<number>",
        },
        {
          url: "http://book/pages?max:<number>",
        },
        {
          url: "http://book/pages?min:<number>,max:<number>",
        },
      ],
    });
    return;
  }
  const results = !isNaN(equalValue)
    ? await findBookByPages(equalValue, equalValue)
    : await findBookByPages(minValue, maxValue);
  if (results.length === 0) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  res.json(results);
});
/*
bookRoute.get("/pages", async (req, res) => {
  const { min } = req.params;
  try {
    const n = Number(min);
    const results = await findBookByPages(n, n);
    if (results.length === 0) {
      res.status(StatusCodes.NOT_FOUND);
      return;
    }
    res.json(results);
  } catch (e) {
    console.error(e);
    if (e instanceof SyntaxError) {
      res.status(StatusCodes.BAD_REQUEST).send(e);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
  }
});*/

export default bookRoute;
