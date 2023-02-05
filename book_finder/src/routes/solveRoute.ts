import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
import Book from "../solver/Book";
import solve from "../solver/solve";

const db_host = process.env.DB_HOST || "localhost";
const url = `mongodb://${db_host}:27017`;
const client = new MongoClient(url);

const dbName = "book_finder";
const problemsCollection = "problems";
const booksCollection = "books";

interface Problem {
  target: number;
  allowedSheetsPerSignature: number[];
  solution?: ObjectId;
}

const addProblem = async (target: number): Promise<ObjectId> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Problem>(problemsCollection);
  const result = await collection.insertOne({
    target,
    allowedSheetsPerSignature: [3, 4, 5],
  });
  client.close();
  return result.insertedId;
};

const findProblem = async (target: number) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Problem>(problemsCollection);
  const result = await collection.findOne({ target });
  client.close();
  return result;
};

const findProblemById = async (id: ObjectId) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Problem>(problemsCollection);
  const result = await collection.findOne({ _id: id });
  client.close();
  return result;
};

const findOrAddProblem = async (target: number): Promise<ObjectId> => {
  const doc = await findProblem(target);
  return doc ? doc._id : addProblem(target);
};

interface Books {
  problemID: ObjectId;
  books: Book[];
}

const addSoluton = async (problemID: ObjectId, books: Book[]) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Books>(booksCollection);
  const result = await collection.insertOne({ problemID, books });
  client.close();
  return result.insertedId;
};

const updateProblem = async (problem: ObjectId, solution: ObjectId) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Problem>(problemsCollection);
  const result = await await collection.updateOne(
    { _id: problem },
    { $set: { solution } }
  );
  client.close();
};

const startSolver = async (id: ObjectId, target: number) => {
  const books: Book[] = solve(target, target, [3, 4, 5]);
  const solutionId = await addSoluton(id, books);
  updateProblem(id, solutionId);
};

const solveRoute = Router();

solveRoute.post("/", async (req, res) => {
  const { target } = req.body;
  if (!target) {
    res.status(400).json({
      usage: {
        url: "http://finder/",
        body: { target: "<number of pages required>" },
      },
    });
    return;
  }
  const problem = await findOrAddProblem(target).then(findProblemById);
  if (!problem) {
    res.sendStatus(500);
    return;
  }
  if (!problem.solution) {
    startSolver(problem._id, target);
  }
  res.json({ problem });
});

export default solveRoute;
