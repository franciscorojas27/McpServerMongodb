import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";
import { MongoBulkOps } from "@mongo/mongoBulkOps.js";

describe("MongoBulkOps", () => {
  let mongod: MongoMemoryServer;
  let uri: string;
  let connection: MongoConnection;
  let bulkOps: MongoBulkOps;
  const dbName = "test_db";
  const collectionName = "test_collection";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    connection = new MongoConnection(uri);
    await connection.connect();
    bulkOps = new MongoBulkOps(connection);
    await connection.getClient().db(dbName).createCollection(collectionName);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongod.stop();
  });

  it("should perform a bulkWrite", async () => {
    const operations = [
      { insertOne: { document: { name: "a", value: 1 } } },
      { insertOne: { document: { name: "b", value: 2 } } },
      { updateOne: { filter: { name: "a" }, update: { $set: { value: 10 } } } },
      { deleteOne: { filter: { name: "b" } } }
    ];
    const result = await bulkOps.bulkWrite(dbName, collectionName, operations);
    expect(result.insertedCount).toBe(2);
    expect(result.modifiedCount).toBe(1);
    expect(result.deletedCount).toBe(1);
  });
});
