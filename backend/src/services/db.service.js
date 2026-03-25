import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

try {
  db = new Database(join(__dirname, "../../data/dashboard.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
CREATE TABLE IF NOT EXISTS bookmarks (
id         INTEGER PRIMARY KEY AUTOINCREMENT,
url        TEXT NOT NULL,
title      TEXT,
tags       TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
  console.log("Database initialized successfully");
} catch (err) {
  console.error("Database initialization failed:", err.message);
  process.exit(1);
}

export default db;
