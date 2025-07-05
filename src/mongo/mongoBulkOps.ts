/**
 * Provides bulk write operations for MongoDB collections.
 */
import { MongoConnection } from "./mongoClient.js";

export class MongoBulkOps {
  /**
   * Constructs a new MongoBulkOps instance.
   * @param connection - The MongoDB connection instance
   */
  constructor(private connection: MongoConnection) {}

  /**
   * Performs a bulk write operation on the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param operations - Array of bulk operations
   * @returns The result of the bulk write operation
   */
  async bulkWrite(dbName: string, collectionName: string, operations: any[]) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.bulkWrite(operations);
  }
}
