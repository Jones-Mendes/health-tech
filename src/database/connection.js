const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3");

const dataDir = path.join(__dirname, "..", "..", "data");
const dbPath = path.join(dataDir, "health-tech.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;");
});

module.exports = db;
