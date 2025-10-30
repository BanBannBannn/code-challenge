import { Response } from "express";

export const sendOk = (
    res: Response,
    data: any,
    message = "Success",
    success = true,
    status = 200
) => {
    return res.status(status).json({ success, message, data });
};

export const sendCreated = (
    res: Response,
    data: any,
    message = "Created",
    success = true,
    status = 201
) => {
    return res.status(status).json({ success, message, data });
};

export const sendFail = (
    res: Response,
    message = "Error",
    status = 400
) => {
    return res.status(status).json({ success: false, message, data: null });
};

export const sendInternalFail = (
    res: Response,
    message = "Internal Server Error",
    status = 500
) => {
    return res.status(status).json({ success: false, message, data: null });
};
