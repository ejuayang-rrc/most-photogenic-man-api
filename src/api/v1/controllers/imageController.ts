import { Request, Response, NextFunction } from "express";

import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { ImageDetails } from "../models/imageModel";
import * as imageService from "../services/imageService"

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

        // Check if required body parameters exist
        if (!req.body.title) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Image title is required")
            );
            return; 
        } else if (!req.body.description) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Image description is required")
            );
            return; 
        } else if (!req.body.eventId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Event ID for image is required")
            );
            return; 
        }

        // NOTE: Change "req.host" to "req.hostname" when under a domain
        const route: string = `${req.protocol}://${req.host}/uploads/${req.file.filename}`;
        const fileName: string = req.file.filename;
        const { 
            title,
            description,
            eventId
        } = req.body;

        const newImage: ImageDetails = await imageService.storeImageDetails({
            route: route,
            fileName: fileName,
            title,
            description,
            eventId
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                newImage,
                "File uploaded successfully!"
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const updateImageDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedDetails: ImageDetails = 
        await imageService.updateImageDetails(id,{ title, description });

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                updatedDetails, 
                `Image ${id} updated successfully`
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteImage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;
        await imageService.deleteImageDetails(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(`Image ${id} deleted successfully`)
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllImages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { eventId } = req.query;

        if (typeof eventId === "string") {
            if (eventId.length === 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(
                    errorResponse(`Event ID cannot be left blank`)
                );
                return;
            }

            const eventImages: ImageDetails[] = await
            imageService.getEventImages(eventId);
            
            if (eventImages.length <= 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json(
                    errorResponse(`Event with ID: (${eventId}) has no images`)
                );
                return;
            } 

            res.status(HTTP_STATUS.OK).json(
                successResponse(
                    eventImages, 
                    `Images from Event (ID: ${eventId}) retrieved successfully`
                )
            );
            return;
        } else {
            const images: ImageDetails[] = 
            await imageService.getAllImageDetails();

            res.status(HTTP_STATUS.OK).json(
                successResponse(
                    images, 
                    "Images retrieved successfully"
                )
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const getImageById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const image: ImageDetails = await imageService.getImageDetailsById(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(
                image, 
                "Image retrieved successfully"
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};
