/**
 * Registers bulk operation tools for MongoDB collections in the MCP server.
 * Provides a tool for performing bulk write operations.
 *
 * @param server - The MCP server instance
 * @param bulkOps - The MongoBulkOps instance for bulk operations
 */
import { z } from "zod";
import { MongoBulkOps } from "../mongo/mongoBulkOps.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerBulkTools(server: McpServer, bulkOps: MongoBulkOps) {
  server.registerTool(
    "bulk_write",
    {
      title: "Bulk write",
      description: "Perform bulk write operations on a collection.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        operations: z.array(z.record(z.any())).describe("Bulk operations array"),
      },
    },
    /**
     * Executes a bulk write operation on the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param operations - Array of bulk operations
     */
    async ({ dbName, collectionName, operations }: { dbName: string; collectionName: string; operations: any[] }) => {
      const result = await bulkOps.bulkWrite(dbName, collectionName, operations);
      return {
        content: [
          {
            type: "text",
            text: `Bulk write result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );
}
