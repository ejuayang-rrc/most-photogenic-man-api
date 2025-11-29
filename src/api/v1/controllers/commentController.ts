import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as commentService from "../services/commentService";
import { CommentDetails } from "../models/commentModel";
import { errorResponse, successResponse } from "../models/responseModel";

export const addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body.username) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Username is missing")
            );
        } else if (!req.body.comment) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Comment has no content")
            );
        } else if (!req.body.imageId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Image isn't specified for comment")
            );
        } else {
            const { 
                username,
                comment,
                imageId
            } = req.body;

            const newComment: CommentDetails = 
            await commentService.saveComment({
                username,
                comment,
                imageId
            });

            res.status(HTTP_STATUS.CREATED).json(
                successResponse(
                    newComment,
                    `Comment ${newComment.id} posted successfully`
                )
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const getImageComments = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const comments: CommentDetails[] =
        await commentService.getImageComments(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                comments,
                `Comments for Image ${id} retrieved successfully`
            )
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;
        await commentService.deleteComment(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(`Comment ${id} deleted successfully`)
        );
    } catch (error: unknown) {
        next(error);
    }
};
