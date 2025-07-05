# 🚀 MongoDB MCP Server

A modular, well-documented server for managing MongoDB databases, collections, documents, indexes, and bulk operations using the Model Context Protocol (MCP). Built for extensibility, clarity, and ease of use. Fully compatible with ESM, TypeScript, and modern testing workflows.

---

## ✨ Features

- 📦 Register and manage MongoDB databases, collections, documents, indexes, and bulk operations via MCP tools
- ⚡ Bulk operations support
- 📝 Fully documented codebase (English, JSDoc)
- ⚙️ Easy configuration via `config.json`
- 🧩 Clean, modular architecture
- 🧪 Automated tests with Jest, ts-jest, and in-memory MongoDB
- 🔗 Modern ESM + TypeScript + path aliases
- 🧾 Test files use `.mjs` extension for full ESM compatibility with Jest

---

## 📁 Project Structure

```text
├── src/
│   ├── main.ts                # Main entry point, server initialization
│   ├── config.json            # MongoDB connection config
│   ├── mongo/                 # MongoDB operation classes
│   └── tools/                 # MCP tool registration modules
├── tests/                     # Jest test suites (in-memory MongoDB, .mjs)
├── package.json
├── tsconfig.json
├── jest.config.cjs
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- TypeScript
- MongoDB instance (local or remote)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <your-repo>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure your MongoDB URI in `src/config.json`:**

   ```json
   {
     "mongo_uri": "mongodb://localhost:27017"
   }
   ```

---

## 🏃 Running the Server

You can run the server using tsx:

```sh
npx tsx src/main.ts
```

Or use the provided VS Code launch configuration.

---

## ⚙️ VS Code MCP Integration Example

To use this server as an MCP backend in VS Code, add the following to your `settings.json`:

```jsonc
"mcp": {
  "inputs": [],
  "servers": {
    "mongo-local": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "C:/Users/<your-username>/Desktop/McpServerMongodb/src/main.ts"
      ]
    }
  }
},
```

- Replace `<your-username>` with your actual Windows username or adjust the path to where your project is located.
- This will allow VS Code to launch your MCP MongoDB server as a local backend.

---

## 🧪 Running Tests

All core logic is covered by automated tests using Jest, ts-jest, and `mongodb-memory-server` for a real MongoDB environment in-memory (no external DB required).

```sh
npm test
```

- Tests are located in the `tests/` directory and use the `.mjs` extension for ESM compatibility.
- ESM, TypeScript, and path aliases are fully supported in tests.
- Example test import (in a `.mjs` test file):

  ```js
  import { MongoDatabaseOps } from "@mongo/mongoDatabaseOps.js";
  ```

---

## 🛠️ Usage & Development

- The server exposes MCP tools for database, collection, document, index, and bulk operations.
- You can extend or customize tools in the `src/tools/` directory.
- All business logic for MongoDB operations is in `src/mongo/`.
- Use path aliases (`@mongo/`, `@tools/`) for clean imports.
- All code and tests use ESM imports with explicit `.js` extensions for internal modules.
- **All Jest test files must use the `.mjs` extension** for full ESM compatibility.

---

## 🧑‍💻 Code Quality

- All files are documented in English using JSDoc.
- Modular and maintainable structure.
- Follows best practices for clarity and extensibility.
- Robust error handling and configuration management.

---

## 🧩 ESM, TypeScript & Jest Notes

- Project uses ESM (`type: "module"`), `moduleResolution: "nodenext"`, and path aliases in `tsconfig.json`.
- Jest is configured to transform ESM dependencies (e.g., `mongodb-memory-server`) and support TypeScript/ESM via `ts-jest`.
- All internal imports must use `.js` extensions for ESM compatibility.
- **All Jest test files must use the `.mjs` extension** for ESM compatibility.
- See `jest.config.cjs` and `tsconfig.json` for details.

---

## 👤 Author

Francisco Antonio Rojas Fariña

---

## 📄 License

MIT
