/**
 * Provides document management operations for MongoDB collections.
 */
import { MongoConnection } from "./mongoClient.js";

export class MongoDocumentOps {
  /**
   * Constructs a new MongoDocumentOps instance.
   * @param connection - The MongoDB connection instance
   */
  constructor(private connection: MongoConnection) {}

  /**
   * Inserts a single document into the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param document - The document to insert
   * @returns The result of the insert operation
   */
  async insertDocument(dbName: string, collectionName: string, document: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.insertOne(document);
  }

  /**
   * Finds a single document in the specified collection matching the filter.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match
   * @returns The found document or null
   */
  async findOne(dbName: string, collectionName: string, filter: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.findOne(filter);
  }

  /**
   * Finds all documents in the specified collection matching the filter.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match (optional)
   * @returns An array of found documents
   */
  async find(dbName: string, collectionName: string, filter: Record<string, any> = {}) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.find(filter).toArray();
  }

  /**
   * Updates a single document in the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match
   * @param newValue - The new values to set
   * @returns The result of the update operation
   */
  async updateOne(dbName: string, collectionName: string, filter: Record<string, any>, newValue: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.updateOne(filter, { $set: newValue });
  }

  /**
   * Deletes a single document from the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match
   * @returns The result of the delete operation
   */
  async deleteDocument(dbName: string, collectionName: string, filter: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.deleteOne(filter);
  }

  /**
   * Inserts multiple documents into the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param documents - The documents to insert
   * @returns The result of the insertMany operation
   */
  async insertMany(dbName: string, collectionName: string, documents: Record<string, any>[]) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.insertMany(documents);
  }

  /**
   * Updates multiple documents in the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match
   * @param update - The update object
   * @returns The result of the updateMany operation
   */
  async updateMany(dbName: string, collectionName: string, filter: Record<string, any>, update: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.updateMany(filter, update);
  }

  /**
   * Deletes multiple documents from the specified collection.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match
   * @returns The result of the deleteMany operation
   */
  async deleteMany(dbName: string, collectionName: string, filter: Record<string, any>) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.deleteMany(filter);
  }

  /**
   * Counts the number of documents in the specified collection matching the filter.
   * @param dbName - The database name
   * @param collectionName - The collection name
   * @param filter - The filter to match (optional)
   * @returns The number of matching documents
   */
  async countDocuments(dbName: string, collectionName: string, filter: Record<string, any> = {}) {
    const client = this.connection.getClient();
    const collection = client.db(dbName).collection(collectionName);
    return await collection.countDocuments(filter);
  }
}
