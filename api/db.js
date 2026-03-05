
import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let cachedDb = null;

export async function getDB() {
  if (cachedDb) return cachedDb;

  // DB bundled with your repo (read-only on Vercel)
  const bundledDbPath = path.join(process.cwd(), "data", "clinic.db");

  // Writable location on Vercel serverless
  const runtimeDbPath = path.join("/tmp", "clinic.db");

  // Safety checks + copy on cold start
  if (!fs.existsSync(bundledDbPath)) {
    throw new Error(`Bundled DB missing at: ${bundledDbPath}`);
  }

  if (!fs.existsSync(runtimeDbPath)) {
    fs.copyFileSync(bundledDbPath, runtimeDbPath);
  }

  cachedDb = await open({
    filename: runtimeDbPath,
    driver: sqlite3.Database,
  });

  return cachedDb;
}