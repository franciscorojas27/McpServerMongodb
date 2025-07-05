/**
 * Registers collection management tools for MongoDB in the MCP server.
 * Provides tools for listing, creating, and dropping collections.
 *
 * @param server - The MCP server instance
 * @param collectionOps - The MongoCollectionOps instance for collection operations
 */
import { z } from "zod";
import { MongoCollectionOps } from "../mongo/mongoCollectionOps.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerCollectionsTools(server: McpServer, collectionOps: MongoCollectionOps) {
  server.registerTool(
    "list_collections",
    {
      title: "List collections",
      description: "List collections in a database.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
      },
    },
    /**
     * Lists all collections in the specified database.
     * @param dbName - The database name
     */
    async ({ dbName }: { dbName: string }) => {
      const collections = await collectionOps.listCollections(dbName);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(collections, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "create_collection",
    {
      title: "Create collection",
      description: "Create a new collection in a specified database.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
      },
    },
    /**
     * Creates a new collection in the specified database.
     * @param dbName - The database name
     * @param collectionName - The collection name
     */
    async ({ dbName, collectionName }: { dbName: string; collectionName: string }) => {
      const result = await collectionOps.createCollection(dbName, collectionName);
      return {
        content: [
          {
            type: "text",
            text: `Collection \"${collectionName}\" created in database \"${dbName}\". Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "drop_collection",
    {
      title: "Drop collection",
      description: "Drop a collection from a specified database.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
      },
    },
    /**
     * Drops a collection from the specified database.
     * @param dbName - The database name
     * @param collectionName - The collection name
     */
    async ({ dbName, collectionName }: { dbName: string; collectionName: string }) => {
      const result = await collectionOps.dropCollection(dbName, collectionName);
      return {
        content: [
          {
            type: "text",
            text: `Collection \"${collectionName}\" dropped from database \"${dbName}\". Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );
}
