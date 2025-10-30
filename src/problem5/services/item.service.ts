import { connectDB } from "../db/db";
import { CreateItemInput, UpdateItemInput } from "../schemas/item.schema";
import {NotFoundError} from "../utils/serviceErrorHandler";

export class ItemService {
    static async create(data: CreateItemInput) {
        const db = await connectDB();
        try {
            const result = await db.run(
                "INSERT INTO items (name, description, created_at) VALUES (?, ?, datetime('now'))",
                [data.name, data.description]
            );

            const item = await db.get("SELECT * FROM items WHERE id = ?", [result.lastID]);
            return item;
        } catch (err: any) {
            console.error("DB Error [create]:", err.message);
            throw new Error("Database error while creating item");
        }
    }

    static async findAll(name?: string) {
        const db = await connectDB();
        try {
            let query = "SELECT * FROM items";
            const params: string[] = [];

            if (name) {
                query += " WHERE name LIKE ?";
                params.push(`%${name}%`);
            }

            const items = await db.all(query, params);
            return items;
        } catch (err: any) {
            console.error("DB Error [findAll]:", err.message);
            throw new Error("Database error while fetching items");
        }
    }

    static async findById(id: string) {
        const db = await connectDB();
        try {
            const item = await db.get("SELECT * FROM items WHERE id = ?", [id]);
            if (!item) throw new NotFoundError("Item not found");
            return item;
        } catch (err: any) {
            if (err instanceof NotFoundError) throw err;

            console.error("DB Error [findById]:", err.message);
            throw new Error(err.message || "Database error while fetching item");
        }
    }

    static async update(id: string, data: UpdateItemInput) {
        const db = await connectDB();
        try {
            const existing = await db.get("SELECT * FROM items WHERE id = ?", [id]);
            if (!existing) throw new NotFoundError("Item not found");

            await db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", [
                data.name ?? existing.name,
                data.description ?? existing.description,
                id,
            ]);

            const updated = await db.get("SELECT * FROM items WHERE id = ?", [id]);
            return updated;
        } catch (err: any) {
            if (err instanceof NotFoundError) throw err;

            console.error("DB Error [update]:", err.message);
            throw new Error(err.message || "Database error while updating item");
        }
    }

    static async delete(id: string) {
        const db = await connectDB();
        try {
            const existing = await db.get("SELECT * FROM items WHERE id = ?", [id]);
            if (!existing) throw new NotFoundError("Item not found");

            const result = await db.run("DELETE FROM items WHERE id = ?", [id]);
            if (result.changes === 0) throw new Error("Failed to delete item");

            return { message: "Deleted successfully" };
        } catch (err: any) {
            if (err instanceof NotFoundError) throw err;

            console.error("DB Error [delete]:", err.message);
            throw new Error(err.message || "Database error while deleting item");
        }
    }
}