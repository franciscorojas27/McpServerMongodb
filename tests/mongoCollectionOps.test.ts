import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";
import { MongoCollectionOps } from "@mongo/mongoCollectionOps.js";

describe("MongoCollectionOps", () => {
  let mongod: MongoMemoryServer;
  let uri: string;
  let connection: MongoConnection;
  let collectionOps: MongoCollectionOps;
  const dbName = "test_db";
  const collectionName = "test_collection";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    connection = new MongoConnection(uri);
    await connection.connect();
    collectionOps = new MongoCollectionOps(connection);
    // Ensure DB exists
    await connection.getClient().db(dbName).createCollection("init");
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongod.stop();
  });

  it("should create a collection", async () => {
    const res = await collectionOps.createCollection(dbName, collectionName);
    expect(res.message).toMatch(/created/);
  });

  it("should list collections", async () => {
    await collectionOps.createCollection(dbName, collectionName);
    const collections = await collectionOps.listCollections(dbName);
    expect(collections.some((c: any) => c.name === collectionName)).toBe(true);
  });

  it("should drop a collection", async () => {
    await collectionOps.createCollection(dbName, collectionName);
    const result = await collectionOps.dropCollection(dbName, collectionName);
    expect(result).toBe(true);
  });
});
