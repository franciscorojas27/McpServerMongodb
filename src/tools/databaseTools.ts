/**
 * Registers database management tools for MongoDB in the MCP server.
 * Provides tools for getting info, listing, creating, and dropping databases.
 *
 * @param server - The MCP server instance
 * @param dbOps - The MongoDatabaseOps instance for database operations
 */
import { z } from "zod";
import { MongoDatabaseOps } from "../mongo/mongoDatabaseOps.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerDatabaseTools(server: McpServer, dbOps: MongoDatabaseOps) {
  server.registerTool(
    "get_database_info",
    {
      title: "Get database info",
      description: "Get information about a specific database by name.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
      },
    },
    /**
     * Gets information about a specific database.
     * @param dbName - The database name
     */
    async ({ dbName }: { dbName: string }) => {
      const databaseInfo = await dbOps.getDatabaseInfo(dbName);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(databaseInfo, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_database_list",
    {
      title: "Get list database",
      description: "Get a list of all databases.",
    },
    /**
     * Lists all databases in the MongoDB server.
     */
    async () => {
      const databases = await dbOps.listDatabases();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(databases, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "create_database",
    {
      title: "Create database",
      description: "Create a new database by name.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
      },
    },
    /**
     * Creates a new database with the specified name.
     * @param dbName - The database name
     */
    async ({ dbName }: { dbName: string }) => {
      const result = await dbOps.createDatabase(dbName);
      return {
        content: [
          {
            type: "text",
            text: `Database "${dbName}" created. Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "drop_database",
    {
      title: "Drop database",
      description: "Drop a database by name.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
      },
    },
    /**
     * Drops the specified database.
     * @param dbName - The database name
     */
    async ({ dbName }: { dbName: string }) => {
      const result = await dbOps.dropDatabase(dbName);
      return {
        content: [
          {
            type: "text",
            text: `Database "${dbName}" dropped. Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );
}
