import { MongoClient, ObjectId } from "mongodb";
import Book from "../model/Book";
import Signatures from "../model/Signatures";

const db_host = process.env.DB_HOST || "localhost";
const url = `mongodb://${db_host}:27017`;

const dbName = "book";
const booksCollection = "books";

const client = new MongoClient(url);

export const addBook = async (book: Book): Promise<ObjectId> => {
  const client = new MongoClient(url);
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
  const result = await collection.findOne({ signatures });
  client.close();
  return result;
};

export const findBookByPages = async (min?: number, max?: number) => {
  if (!min && !max) {
    return [];
  }
  let search = {};
  if (min) {
    search = { ...search, $gte: min };
  }
  if (max) {
    search = { ...search, $lte: max };
  }
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Book>(booksCollection);
  const results = await collection.find({ pages: search }).toArray();
  client.close();
  return results;
};
