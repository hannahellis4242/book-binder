import { Collection, MongoClient, WithId } from "mongodb";

const databaseOperation =
  (client: MongoClient) =>
  (databaseName: string) =>
  (collectionName: string) =>
  async <T extends Document>(
    operation: (collection: Collection<T>) => Promise<WithId<T>>
  ) => {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection<T>(collectionName);
    const result = await operation(collection);
    client.close();
    return result;
  };

export default databaseOperation;
