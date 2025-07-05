import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";
import { MongoDatabaseOps } from "@mongo/mongoDatabaseOps.js";

describe("MongoDatabaseOps", () => {
  let mongod: MongoMemoryServer;
  let uri: string;
  let connection: MongoConnection;
  let dbOps: MongoDatabaseOps;
  const dbName = "test_db";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    connection = new MongoConnection(uri);
    await connection.connect();
    dbOps = new MongoDatabaseOps(connection);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongod.stop();
  });

  it("should create a database", async () => {
    const res = await dbOps.createDatabase(dbName);
    expect(res.message).toMatch(/creada/);
  });

  it("should get database info", async () => {
    await dbOps.createDatabase(dbName);
    const info = await dbOps.getDatabaseInfo(dbName);
    expect(info.name).toBe(dbName);
    expect(Array.isArray(info.collections)).toBe(true);
    expect(info.stats).toBeDefined();
  });

  it("should list databases", async () => {
    const result = await dbOps.listDatabases();
    expect(result.databases).toBeDefined();
    expect(Array.isArray(result.databases)).toBe(true);
  });

  it("should drop a database", async () => {
    await dbOps.createDatabase(dbName);
    const dropResult = await dbOps.dropDatabase(dbName);
    expect(dropResult).toBe(true);
  });
});
