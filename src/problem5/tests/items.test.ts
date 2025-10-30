import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import itemRouter from "../routes/items";
import { connectDB } from "../db/db";
import fs from "fs";
import path from "path";
import {globalErrorHandler} from "../utils/globalErrorHandler";

const app = express();
app.use(bodyParser.json());
app.use("/api/items", itemRouter);
app.use(globalErrorHandler);

const TEST_DB = path.join(__dirname, "test.db");

// Trước hết, setup test DB riêng
beforeAll(async () => {
    // Xóa db cũ
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
    process.env.DB_PATH = TEST_DB;

    const db = await connectDB();
    await db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT
    )
  `);
});

// Sau cùng, cleanup
afterAll(async () => {
    if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB);
});

describe("Items API", () => {
    let createdId: number;

    it("POST /api/items -> create item", async () => {
        const res = await request(app)
            .post("/api/items")
            .send({ name: "Book", description: "A good read" });
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe("Book");
        createdId = res.body.data.id;
    });

    it("GET /api/items -> list items", async () => {
        const res = await request(app).get("/api/items");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("GET /api/items/:id -> get item details", async () => {
        const res = await request(app).get(`/api/items/${createdId}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(createdId);
    });

    it("PUT /api/items/:id -> update item", async () => {
        const res = await request(app)
            .put(`/api/items/${createdId}`)
            .send({ name: "Updated Book" });
        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("Updated Book");
    });

    it("DELETE /api/items/:id -> delete item", async () => {
        const res = await request(app).delete(`/api/items/${createdId}`);
        expect(res.status).toBe(200);
        expect(res.body.data.message).toBe("Deleted successfully");
    });

    it("GET /api/items/:id -> 404 after delete", async () => {
        const res = await request(app).get(`/api/items/${createdId}`);
        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });
});
