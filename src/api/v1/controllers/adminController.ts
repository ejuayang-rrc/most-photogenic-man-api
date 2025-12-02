import { Request, Response, NextFunction } from "express";

import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Assigns a custom claim (role) to a user
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid, claims } = req.body;

        await auth.setCustomUserClaims(uid, claims);
        res.status(HTTP_STATUS.OK).json(
            successResponse({}, `Custom claims set for user: ${uid}`)
        );
    } catch (error: unknown) {
        next(error);
    }
};
