import { MongoClient, ObjectId } from "mongodb";
import Book from "../model/Book";
import Signatures from "../model/Signatures";

const db_host = process.env.DB_HOST || "localhost";
const url = `mongodb://${db_host}:27017`;
const client = new MongoClient(url);

const dbName = "book";
const booksCollection = "books";

export const addBook = async (book: Book): Promise<ObjectId> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const result = await collection.insertOne(book);
  client.close();
  return result.insertedId;
};

export const findBookByID = async (id: ObjectId) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const result = await collection.findOne({ _id: id });
  client.close();
  return result;
};

export const findBookBySignatures = async (signatures: Signatures) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  console.log("got collection");
  const result = await collection.findOne({ signatures });
  console.log("got result");
  client.close();
  console.log("returing ", result);
  return result;
};

export const findBookByPagesExact = async (pages: number) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const results = await collection.find({ pages }).toArray();
  client.close();
  return results;
};
