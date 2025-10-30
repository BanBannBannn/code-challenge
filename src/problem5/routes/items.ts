import express, { Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { asyncHandler } from "../utils/asyncHandler";
import { createItemSchema, updateItemSchema } from "../schemas/item.schema";
import { sendOk, sendCreated, sendFail } from "../utils/responseHandler";

const router = express.Router();

// CREATE
router.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const parse = createItemSchema.safeParse(req.body);
        if (!parse.success) {
            const errors = parse.error.issues.map(issue => `${issue.path.join('.')} - ${issue.message}`).join('; ');
            return sendFail(res, errors, 400);
        }

        const item = await ItemService.create(parse.data);
        return sendCreated(res, item, "Item created successfully", true, 201);
    })
);

// LIST + FILTER
router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const items = await ItemService.findAll(req.query.name as string);
        return sendOk(res, items, "Items fetched successfully");
    })
);

// GET DETAILS
router.get(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const item = await ItemService.findById(req.params.id);
        return sendOk(res, item, "Item fetched successfully");
    })
);

// UPDATE
router.put(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const parse = updateItemSchema.safeParse(req.body);
        if (!parse.success) {
            const errors = parse.error.issues.map(issue => `${issue.path.join('.')} - ${issue.message}`).join('; ');
            return sendFail(res, errors, 400);
        }

        const updated = await ItemService.update(req.params.id, parse.data);
        return sendOk(res, updated, "Item updated successfully");
    })
);

// DELETE
router.delete(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const result = await ItemService.delete(req.params.id);
        return sendOk(res, result, "Item deleted successfully");
    })
);

export default router;
