import { Request, Response, NextFunction } from "express";

import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Manages requests and responses to uploading an image file
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const uploadImageFile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Check if file exists
        if (!req.file) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("No file uploaded")
            );
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {filePath: `/uploads/${req.file.filename}`},
                "File uploaded successfully!"
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};
