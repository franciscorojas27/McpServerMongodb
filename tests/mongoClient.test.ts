import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoConnection } from "@mongo/mongoClient.js";

describe("MongoConnection", () => {
  let mongod: MongoMemoryServer;
  let uri: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should connect and disconnect without errors", async () => {
    const connection = new MongoConnection(uri);
    await expect(connection.connect()).resolves.toBeUndefined();
    await expect(connection.disconnect()).resolves.toBeUndefined();
  });

  it("should throw if getClient is called before connect", () => {
    const connection = new MongoConnection(uri);
    expect(() => connection.getClient()).toThrow();
  });
});
