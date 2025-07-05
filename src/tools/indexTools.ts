/**
 * Registers index management tools for MongoDB in the MCP server.
 * Provides tools for creating, dropping, and listing indexes on collections.
 *
 * @param server - The MCP server instance
 * @param indexOps - The MongoIndexOps instance for index operations
 */
import { z } from "zod";
import { MongoIndexOps } from "../mongo/mongoIndexOps.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerIndexTools(server: McpServer, indexOps: MongoIndexOps) {
  server.registerTool(
    "create_index",
    {
      title: "Create index",
      description: "Create an index on a collection.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        keys: z.record(z.any()).describe("Index keys"),
        options: z.record(z.any()).optional().describe("Index options"),
      },
    },
    /**
     * Creates an index on the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param keys - The index keys
     * @param options - Optional index options
     */
    async ({ dbName, collectionName, keys, options }: { dbName: string; collectionName: string; keys: Record<string, any>; options?: Record<string, any> }) => {
      const result = await indexOps.createIndex(dbName, collectionName, keys, options);
      return {
        content: [
          {
            type: "text",
            text: `Index created: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "drop_index",
    {
      title: "Drop index",
      description: "Drop an index from a collection.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        indexName: z.string().describe("Index name"),
      },
    },
    /**
     * Drops an index from the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param indexName - The index name
     */
    async ({ dbName, collectionName, indexName }: { dbName: string; collectionName: string; indexName: string }) => {
      const result = await indexOps.dropIndex(dbName, collectionName, indexName);
      return {
        content: [
          {
            type: "text",
            text: `Index dropped: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "list_indexes",
    {
      title: "List indexes",
      description: "List all indexes on a collection.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
      },
    },
    /**
     * Lists all indexes on the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     */
    async ({ dbName, collectionName }: { dbName: string; collectionName: string }) => {
      const result = await indexOps.listIndexes(dbName, collectionName);
      return {
        content: [
          {
            type: "text",
            text: `Indexes: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );
}
