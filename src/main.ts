import {
  McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { registerDatabaseTools } from "./tools/databaseTools.js";
import { registerCollectionsTools } from "./tools/collectionsTools.js";
import { registerDocumentTools } from "./tools/documentTools.js";
import { registerIndexTools } from "./tools/indexTools.js";
import { registerBulkTools } from "./tools/bulkTools.js";
import { MongoConnection } from "./mongo/mongoClient.js";
import { MongoDatabaseOps } from "./mongo/mongoDatabaseOps.js";
import { MongoCollectionOps } from "./mongo/mongoCollectionOps.js";
import { MongoDocumentOps } from "./mongo/mongoDocumentOps.js";
import { MongoIndexOps } from "./mongo/mongoIndexOps.js";
import { MongoBulkOps } from "./mongo/mongoBulkOps.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "config.json");
const uri = JSON.parse(fs.readFileSync(configPath, "utf8")).mongo_uri;

const mongoConnection = new MongoConnection(uri);
await mongoConnection.connect();

const dbOps = new MongoDatabaseOps(mongoConnection);
const collectionOps = new MongoCollectionOps(mongoConnection);
const documentOps = new MongoDocumentOps(mongoConnection);
const indexOps = new MongoIndexOps(mongoConnection);
const bulkOps = new MongoBulkOps(mongoConnection);

const server = new McpServer({
  name: "Mongodb connection demo",
  version: "1.0.0",
});

registerDatabaseTools(server, dbOps);
registerCollectionsTools(server, collectionOps);
registerDocumentTools(server, documentOps);
registerIndexTools(server, indexOps);
registerBulkTools(server, bulkOps);

const transport = new StdioServerTransport();
await server.connect(transport);
