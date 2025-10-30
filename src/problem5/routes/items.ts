import express, { Request, Response } from "express";
import { connectDB } from "../db/db";

const router = express.Router();

// CREATE
router.post("/", async (req: Request, res: Response) => {
    const db = await connectDB();
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const result = await db.run(
        "INSERT INTO items (name, description, created_at) VALUES (?, ?, datetime('now'))",
        [name, description]
    );

    const item = await db.get("SELECT * FROM items WHERE id = ?", [result.lastID]);
    res.status(201).json(item);
});

// LIST + FILTER
router.get("/", async (req: Request, res: Response) => {
    const db = await connectDB();
    const { name } = req.query;
    let query = "SELECT * FROM items";
    const params: string[] = [];

    if (name) {
        query += " WHERE name LIKE ?";
        params.push(`%${name}%`);
    }

    const items = await db.all(query, params);
    res.json(items);
});

// GET DETAILS
router.get("/:id", async (req: Request, res: Response) => {
    const db = await connectDB();
    const item = await db.get("SELECT * FROM items WHERE id = ?", [req.params.id]);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
});

// UPDATE
router.put("/:id", async (req: Request, res: Response) => {
    const db = await connectDB();
    const { name, description } = req.body;
    await db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", [
        name,
        description,
        req.params.id,
    ]);
    const updated = await db.get("SELECT * FROM items WHERE id = ?", [req.params.id]);
    res.json(updated);
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
    const db = await connectDB();
    await db.run("DELETE FROM items WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted successfully" });
});

export default router;
