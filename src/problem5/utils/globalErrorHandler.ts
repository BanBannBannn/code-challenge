import { Request, Response, NextFunction } from "express";
import { sendInternalFail } from "./responseHandler";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    return sendInternalFail(res, message, statusCode);
};
