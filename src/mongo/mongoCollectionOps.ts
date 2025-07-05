/**
 * Provides collection management operations for MongoDB.
 */
import { MongoConnection } from "./mongoClient.js";

export class MongoCollectionOps {
  /**
   * Constructs a new MongoCollectionOps instance.
   * @param connection - The MongoDB connection instance
   */
  constructor(private connection: MongoConnection) {}

  /**
   * Lists all collections in the specified database.
   * @param dbName - The database name
   * @returns An array of collection info objects
   */
  async listCollections(dbName: string) {
    const client = this.connection.getClient();
    const db = client.db(dbName);
    return await db.listCollections().toArray();
  }

  /**
   * Creates a new collection in the specified database.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @returns A message indicating success
   */
  async createCollection(dbName: string, collectionName: string) {
    const client = this.connection.getClient();
    const db = client.db(dbName);
    await db.createCollection(collectionName);
    return { message: `Collection '${collectionName}' created in database '${dbName}'.` };
  }

  /**
   * Drops a collection from the specified database.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @returns The result of the drop operation
   */
  async dropCollection(dbName: string, collectionName: string) {
    const client = this.connection.getClient();
    const db = client.db(dbName);
    return await db.collection(collectionName).drop();
  }
}
