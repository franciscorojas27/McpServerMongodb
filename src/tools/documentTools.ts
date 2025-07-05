/**
 * Registers document management tools for MongoDB in the MCP server.
 * Provides tools for inserting, finding, updating, and deleting documents.
 *
 * @param server - The MCP server instance
 * @param documentOps - The MongoDocumentOps instance for document operations
 */
import { z } from "zod";
import { MongoDocumentOps } from "../mongo/mongoDocumentOps.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerDocumentTools(server: McpServer, documentOps: MongoDocumentOps) {
  server.registerTool(
    "create_document",
    {
      title: "Create document",
      description: "Insert a new document into a specified collection in a database.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        document: z.record(z.any()).describe("Document to insert"),
      },
    },
    /**
     * Inserts a new document into the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param document - The document to insert
     */
    async ({ dbName, collectionName, document }: { dbName: string; collectionName: string; document: Record<string, any> }) => {
      const result = await documentOps.insertDocument(dbName, collectionName, document);
      return {
        content: [
          {
            type: "text",
            text: `Document inserted into \"${collectionName}\" in database \"${dbName}\". Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "delete_document",
    {
      title: "Delete document",
      description: "Delete a document from a collection in a database.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).describe("Filter to match document(s)"),
      },
    },
    /**
     * Deletes a document from the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param filter - The filter to match documents
     */
    async ({ dbName, collectionName, filter }: { dbName: string; collectionName: string; filter: Record<string, any> }) => {
      const result = await documentOps.deleteDocument(dbName, collectionName, filter);
      return {
        content: [
          {
            type: "text",
            text: `Document(s) deleted from \"${collectionName}\" in database \"${dbName}\". Result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "find_document",
    {
      title: "Find documents",
      description: "Find documents in a collection with an optional filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).optional().describe("Filter to match documents"),
      },
    },
    /**
     * Finds documents in the specified collection.
     * @param dbName - The database name
     * @param collectionName - The collection name
     * @param filter - The filter to match documents (optional)
     */
    async ({ dbName, collectionName, filter = {} }: { dbName: string; collectionName: string; filter?: Record<string, any> }) => {
      const result = await documentOps.find(dbName, collectionName, filter);
      return {
        content: [
          {
            type: "text",
            text: `Documents found: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "find_one_document",
    {
      title: "Find one document",
      description: "Find a single document in a collection by filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).describe("Filter to match document"),
      },
    },
    async ({ dbName, collectionName, filter }: { dbName: string; collectionName: string; filter: Record<string, any> }) => {
      const result = await documentOps.findOne(dbName, collectionName, filter);
      return {
        content: [
          {
            type: "text",
            text: `Document found: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "update_one_document",
    {
      title: "Update one document",
      description: "Update a single document in a collection by filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).describe("Filter to match document"),
        newValue: z.record(z.any()).describe("New values to set"),
      },
    },
    async ({ dbName, collectionName, filter, newValue }: { dbName: string; collectionName: string; filter: Record<string, any>; newValue: Record<string, any> }) => {
      const result = await documentOps.updateOne(dbName, collectionName, filter, newValue);
      return {
        content: [
          {
            type: "text",
            text: `Update result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "insert_many_documents",
    {
      title: "Insert many documents",
      description: "Insert multiple documents into a collection.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        documents: z.array(z.record(z.any())).describe("Documents to insert"),
      },
    },
    async ({ dbName, collectionName, documents }: { dbName: string; collectionName: string; documents: Record<string, any>[] }) => {
      const result = await documentOps.insertMany(dbName, collectionName, documents);
      return {
        content: [
          {
            type: "text",
            text: `Insert many result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "update_many_documents",
    {
      title: "Update many documents",
      description: "Update multiple documents in a collection by filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).describe("Filter to match documents"),
        update: z.record(z.any()).describe("Update object"),
      },
    },
    async ({ dbName, collectionName, filter, update }: { dbName: string; collectionName: string; filter: Record<string, any>; update: Record<string, any> }) => {
      const result = await documentOps.updateMany(dbName, collectionName, filter, update);
      return {
        content: [
          {
            type: "text",
            text: `Update many result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "delete_many_documents",
    {
      title: "Delete many documents",
      description: "Delete multiple documents from a collection by filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).describe("Filter to match documents"),
      },
    },
    async ({ dbName, collectionName, filter }: { dbName: string; collectionName: string; filter: Record<string, any> }) => {
      const result = await documentOps.deleteMany(dbName, collectionName, filter);
      return {
        content: [
          {
            type: "text",
            text: `Delete many result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "count_documents",
    {
      title: "Count documents",
      description: "Count documents in a collection with an optional filter.",
      inputSchema: {
        dbName: z.string().describe("Database name"),
        collectionName: z.string().describe("Collection name"),
        filter: z.record(z.any()).optional().describe("Filter to match documents"),
      },
    },
    async ({ dbName, collectionName, filter = {} }: { dbName: string; collectionName: string; filter?: Record<string, any> }) => {
      const result = await documentOps.countDocuments(dbName, collectionName, filter);
      return {
        content: [
          {
            type: "text",
            text: `Count result: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    }
  );
}
