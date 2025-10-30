import express from "express";
import bodyParser from "body-parser";
import itemsRouter from "./routes/items";
import { connectDB } from "./db/db";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/items", itemsRouter);

(async () => {
    const db = await connectDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            created_at TEXT
        );
    `);

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})();
