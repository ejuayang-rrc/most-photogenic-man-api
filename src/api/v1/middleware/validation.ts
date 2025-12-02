import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { CommentDetails } from "../models/commentModel";
import { EventDetails } from "../models/eventModel";
import { ImageDetails } from "../models/imageModel";
import { commentSchema } from "../validation/commentValidation"
import { eventSchema, eventUpdateSchema } from "../validation/eventValidation";
import { imageSchema, imageUpdateSchema } from "../validation/imageValidation";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Validates request data against the Joi schemas
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const validationMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        /**
         * Validates the request data against a Joi schema
         * @param joiSchema - Joi schema to validate against
         * @returns The stripped/validated data
         */
        const validateData = (
            joiSchema: Joi.ObjectSchema,
            requestData: CommentDetails | EventDetails | ImageDetails
        ): CommentDetails | EventDetails | ImageDetails => {
            const { error, value } = joiSchema.validate(requestData);
            if (error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: error.message
                });
                next(error);
            }
            return value;
        };

        // Comment route validation
        if (req.path.startsWith("/api/v1/comment")) {
            req.body = validateData(commentSchema, req.body);
        }

        // Event route validation
        if (req.path.startsWith("/api/v1/event")) {
            if (req.method === "PUT") {
                req.body = validateData(eventUpdateSchema, req.body);
                next();
                return;
            }
            req.body = validateData(eventSchema, req.body);
        }

        // Image route validation
        if (req.path.startsWith("/api/v1/image")) {
            if (req.method === "PUT") {
                req.body = validateData(imageUpdateSchema, req.body);
                next();
                return;
            }
            req.body = validateData(imageSchema, req.body);
        }

        next();
    } catch {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Error occurred during validation"
        });
        next();
    }
};
