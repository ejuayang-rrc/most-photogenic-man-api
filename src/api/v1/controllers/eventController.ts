import { Request, Response, NextFunction } from "express";

import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { EventDetails } from "../models/eventModel";
import * as eventService from "../services/eventService";

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Event Name is required")
            );
            return; 
        } else if (!req.body.description) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Event Description is required")
            );
            return; 
        } else if (!req.body.date) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Event Date is required")
            );
            return; 
        } else {
            const {
                name,
                description,
                date
            } = req.body;

            // Convert string to date
            const dateNumber: number = Date.parse(date);
            const convertedDate: Date = new Date(dateNumber);

            const newEvent: EventDetails = 
            await eventService.storeEventDetails({
                name,
                description,
                date: convertedDate
            });

            res.status(HTTP_STATUS.CREATED).json(
                successResponse(
                    newEvent,
                    `Event "${newEvent.name}" created successfully`
                )
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const getEventDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: EventDetails[] = 
        await eventService.getAllEventDetails();

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                events,
                "Event details retrieved successfully"
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const getEventDetailsById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
                const { id } = req.params;

        const event: EventDetails = 
        await eventService.getEventDetailsById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                event,
                `Event ${id} retrieved successfully`
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const updateEventDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedEvent: EventDetails = 
        await eventService.updateEventDetails(
            id,
            { name, description }
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                updatedEvent,
                `Event ${id} updated successfully`
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteEventDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
        try {
        const id: string = req.params.id;

        await eventService.deleteEventDetails(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(`Event ${id} deleted successfully`)
        );
    } catch (error: unknown) {
        next(error);
    }
};
