import { z } from "zod";

export const createItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});

export const updateItemSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
