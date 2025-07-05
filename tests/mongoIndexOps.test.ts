import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";
import { MongoIndexOps } from "@mongo/mongoIndexOps.js";

describe("MongoIndexOps", () => {
  let mongod: MongoMemoryServer;
  let uri: string;
  let connection: MongoConnection;
  let indexOps: MongoIndexOps;
  const dbName = "test_db";
  const collectionName = "test_collection";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    connection = new MongoConnection(uri);
    await connection.connect();
    indexOps = new MongoIndexOps(connection);
    await connection.getClient().db(dbName).createCollection(collectionName);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongod.stop();
  });

  it("should create an index", async () => {
    const res = await indexOps.createIndex(dbName, collectionName, { field1: 1 });
    expect(res).toBeDefined();
  });

  it("should list indexes", async () => {
    await indexOps.createIndex(dbName, collectionName, { field2: 1 });
    const indexes = await indexOps.listIndexes(dbName, collectionName);
    expect(Array.isArray(indexes)).toBe(true);
    expect(indexes.some((idx: any) => idx.key.field2 === 1)).toBe(true);
  });

  it("should drop an index", async () => {
    const indexName = await indexOps.createIndex(dbName, collectionName, { field3: 1 });
    const result = await indexOps.dropIndex(dbName, collectionName, indexName);
    expect(result).toBeDefined();
  });
});
