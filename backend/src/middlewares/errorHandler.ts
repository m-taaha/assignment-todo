import type { Request, Response, NextFunction } from "express";
import LogModel from "../models/LogModel.ts";

export const errorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    try{
        await LogModel.create({
            method: req.method,
            url: req.originalUrl, //full path capture
            ip: req.ip,
            status: statusCode,
            message: err.message,
            stack: err.stack,
        })
    }catch(dbError) {
        console.log("Failed to save error log to DB:", dbError);
    }

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null: err.stack,
    });
}