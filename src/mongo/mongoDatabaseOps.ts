/**
 * Provides database management operations for MongoDB.
 */
import { MongoConnection } from "./mongoClient.js";

export class MongoDatabaseOps {
  /**
   * Constructs a new MongoDatabaseOps instance.
   * @param connection - The MongoDB connection instance
   */
  constructor(private connection: MongoConnection) {}

  /**
   * Gets information about a specific database, including collections and stats.
   * @param dbName - The database name
   * @returns An object with database name, collections, and stats
   */
  async getDatabaseInfo(dbName: string) {
    const client = this.connection.getClient();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    const stats = await db.stats();
    return { name: dbName, collections, stats };
  }

  /**
   * Lists all databases in the MongoDB server.
   * @returns An array of database info objects
   */
  async listDatabases() {
    const client = this.connection.getClient();
    const admin = client.db().admin();
    return await admin.listDatabases();
  }

  /**
   * Creates a new database by inserting a document into a default collection.
   * @param dbName - The database name
   * @returns A message indicating success
   */
  async createDatabase(dbName: string) {
    const client = this.connection.getClient();
    const db = client.db(dbName);
    await db.collection("default_collection").insertOne({ createdAt: new Date() });
    return { message: `Base de datos '${dbName}' creada.` };
  }

  /**
   * Drops the specified database.
   * @param dbName - The database name
   * @returns The result of the drop operation
   */
  async dropDatabase(dbName: string) {
    const client = this.connection.getClient();
    return await client.db(dbName).dropDatabase();
  }
}
