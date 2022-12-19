import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { createPageSequence } from "../solver/createPageSequence";

// Connection URL
const db_host = process.env.DB_HOST || "localhost";
const url = `mongodb://${db_host}:27017`;
const client = new MongoClient(url);

// Database Name
const dbName = "page_sequence";
const signaturesCollection = "signatures";
const sequenceCollection = "sequence";

interface SignaturesDocument {
  signatures: number[];
  sequenceID?: ObjectId;
}

interface SequenceDocument {
  signaturesID: ObjectId;
  sequence: number[];
}

const findOrAddSignatures = async (signatures: number[]): Promise<ObjectId> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<SignaturesDocument>(signaturesCollection);
  const result = await collection.findOne({ signatures });
  if (result === null) {
    //none found add instead
    const added = await collection.insertOne({ signatures });
    client.close();
    return added.insertedId;
  }
  client.close();
  return result._id;
};

const findSignatureById = async (
  id: ObjectId
): Promise<SignaturesDocument | undefined> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<SignaturesDocument>(signaturesCollection);
  const result = await collection
    .findOne({ _id: id })
    .then((value) => (value === null ? undefined : value));
  client.close();
  return result;
};

const findSquenceById = async (
  id: ObjectId
): Promise<SequenceDocument | undefined> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<SequenceDocument>(sequenceCollection);
  const result = await collection
    .findOne({ _id: id })
    .then((value) => (value === null ? undefined : value));
  client.close();
  return result;
};

const addSquence = async (
  signaturesID: ObjectId,
  sequence: number[]
): Promise<ObjectId> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<SequenceDocument>(sequenceCollection);
  const result = await collection.insertOne({ signaturesID, sequence });
  client.close();
  return result.insertedId;
};

const updateSignaturesWithSquence = async (
  signaturesID: ObjectId,
  sequenceID: ObjectId
) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<SignaturesDocument>(signaturesCollection);
  await collection.updateOne({ _id: signaturesID }, { $set: { sequenceID } });
  client.close();
};

const pageSequence = async (signatures: number[]): Promise<ObjectId> => {
  const signaturesID = await findOrAddSignatures(signatures);
  findSignatureById(signaturesID).then(async (signature) => {
    if (!signature) {
      console.error("Error could not find signatures document after adding");
      return undefined;
    }
    if (!signature.sequenceID) {
      const sequence = createPageSequence(signatures).map((page) => page + 1);
      const sequenceID = await addSquence(signaturesID, sequence);
      updateSignaturesWithSquence(signaturesID, sequenceID);
    }
  });
  return signaturesID;
};

const pages = Router();

pages.post("/", async (req, res) => {
  const { signatures } = req.body;
  if (!signatures) {
    res
      .status(400)
      .json({ usage: { url: "/pages", body: "{signatures:number[]}" } });
    return;
  }
  const id = await pageSequence(signatures);
  res.json({ signaturesID: id });
});

pages.get("/signatures", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res
      .status(400)
      .json({ usage: { url: "/pages/signatures?id=<signaturesID>" } });
    return;
  }
  const value = findSignatureById(new ObjectId(id as string));
  if (!value) {
    res.sendStatus(404);
    return;
  }
  res.json(value);
});

pages.get("/sequence", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res
      .status(400)
      .json({ usage: { url: "/pages/squence?id=<signaturesID>" } });
    return;
  }
  const value = findSquenceById(new ObjectId(id as string));
  if (!value) {
    res.sendStatus(404);
    return;
  }
  res.json(value);
});

export default pages;
