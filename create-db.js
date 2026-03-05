import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

async function createDB() {

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  const db = await open({
    filename: "./data/clinic.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    INSERT INTO users (username,password)
    VALUES ('Ritwick','Aarambh');
  `);

  console.log("Database created successfully");

}

createDB();