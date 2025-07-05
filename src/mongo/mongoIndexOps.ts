/**
 * Provides index management operations for MongoDB collections.
 */
import { MongoConnection } from "./mongoClient.js";

export class MongoIndexOps {
  /**
   * Constructs a new MongoIndexOps instance.
   * @param connection - The MongoDB connection instance
   */
  constructor(private connection: MongoConnection) {}

  /**
   * Creates an index on the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param keys - The index keys
   * @param options - Optional index options
   * @returns The result of the createIndex operation
   */
  async createIndex(dbName: string, collectionName: string, keys: Record<string, any>, options?: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.createIndex(keys, options);
  }

  /**
   * Drops an index from the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param indexName - The index name
   * @returns The result of the dropIndex operation
   */
  async dropIndex(dbName: string, collectionName: string, indexName: string) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.dropIndex(indexName);
  }

  /**
   * Lists all indexes on the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @returns An array of index info objects
   */
  async listIndexes(dbName: string, collectionName: string) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.listIndexes().toArray();
  }
}
