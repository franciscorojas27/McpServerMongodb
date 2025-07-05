import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";
import { MongoDocumentOps } from "@mongo/mongoDocumentOps.js";

describe("MongoDocumentOps", () => {
  let mongod: MongoMemoryServer;
  let uri: string;
  let connection: MongoConnection;
  let documentOps: MongoDocumentOps;
  const dbName = "test_db";
  const collectionName = "test_collection";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    connection = new MongoConnection(uri);
    await connection.connect();
    documentOps = new MongoDocumentOps(connection);
    await connection.getClient().db(dbName).createCollection(collectionName);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongod.stop();
  });

  it("should insert a document", async () => {
    const doc = { name: "test", value: 1 };
    const res = await documentOps.insertDocument(dbName, collectionName, doc);
    expect(res.insertedId).toBeDefined();
  });

  it("should find a document", async () => {
    const doc = { name: "findme", value: 2 };
    await documentOps.insertDocument(dbName, collectionName, doc);
    const found = await documentOps.findOne(dbName, collectionName, { name: "findme" });
    expect(found).toBeDefined();
    if (found) expect(found.name).toBe("findme");
  });

  it("should update a document", async () => {
    const doc = { name: "updateme", value: 3 };
    await documentOps.insertDocument(dbName, collectionName, doc);
    await documentOps.updateOne(dbName, collectionName, { name: "updateme" }, { value: 99 });
    const found = await documentOps.findOne(dbName, collectionName, { name: "updateme" });
    expect(found).toBeDefined();
    if (found) expect(found.value).toBe(99);
  });

  it("should delete a document", async () => {
    const doc = { name: "deleteme", value: 4 };
    await documentOps.insertDocument(dbName, collectionName, doc);
    await documentOps.deleteDocument(dbName, collectionName, { name: "deleteme" });
    const found = await documentOps.findOne(dbName, collectionName, { name: "deleteme" });
    expect(found).toBeFalsy();
  });
});
