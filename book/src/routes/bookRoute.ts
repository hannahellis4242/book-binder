import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
import databaseOperation from "../database/databaseOperation";
import Book from "../model/Book";

const db_host = process.env.DB_HOST || "localhost";
const url = `mongodb://${db_host}:27017`;
const client = new MongoClient(url);

const dbName = "book";
const booksCollection = "books";

const operation = databaseOperation(client)(dbName)(booksCollection);

const addBook = async (book: Book): Promise<ObjectId> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const result = await collection.insertOne(book);
  client.close();
  return result.insertedId;
};

const findBookByID = (id: ObjectId) =>
  operation(async (coll) => {
    const result = await coll.findOne({ _id: id });
    return result;
  });

/*
const findBookByID = async (id: ObjectId) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const result = await collection.findOne({ _id: id });
  client.close();
  return result;
};*/

const bookRoute = Router();

bookRoute.post("/", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res.status(400).json({
      usage: {
        url: "http://book/",
        body: { signatures: "<signature format> for example {3:5,4:2}" },
      },
    });
    return;
  }
  const book = new Book(signatures);
  const bookId = await addBook(book);
  if (!bookId) {
    res.sendStatus(500);
    return;
  }
  res.json(bookId);
});

bookRoute.get("/id/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const result = findBookByID(id);
  res.json(result);
});

export default bookRoute;
