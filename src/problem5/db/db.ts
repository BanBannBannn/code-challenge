import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import * as fs from "node:fs";

export async function connectDB() {
    const dbDir = path.join(__dirname);
    const dbPath = path.join(dbDir, "database.sqlite");

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    return await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}
