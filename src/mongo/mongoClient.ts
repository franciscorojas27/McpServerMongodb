/**
 * Handles the MongoDB client connection lifecycle.
 */
import { MongoClient } from "mongodb";

export class MongoConnection {
  private client: MongoClient;
  private connected = false;

  /**
   * Constructs a new MongoConnection instance.
   * @param uri - The MongoDB connection URI
   */
  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  /**
   * Connects to the MongoDB server.
   * Throws an error if the connection fails.
   */
  async connect() {
    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      throw new Error("Error connecting to MongoDB: " + (error as Error).message);
    }
  }

  /**
   * Disconnects from the MongoDB server.
   * Throws an error if the disconnection fails.
   */
  async disconnect() {
    if (!this.connected) return;
    try {
      await this.client.close();
      this.connected = false;
    } catch (error) {
      throw new Error("Error disconnecting from MongoDB: " + (error as Error).message);
    }
  }

  /**
   * Returns the connected MongoDB client instance.
   * Throws an error if not connected.
   */
  getClient() {
    if (!this.connected) {
      throw new Error("MongoDB client is not connected. Call connect() first.");
    }
    return this.client;
  }
}
