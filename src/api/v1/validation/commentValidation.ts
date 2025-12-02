import Joi from "joi";
import { CommentDetails } from "src/api/v1/models/commentModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     CommentDetails:
 *       type: object
 *       required:
 *         - username
 *         - comment
 *         - imageId
 *       properties:
 *         id:
 *           type: string
 *           description: The comment ID
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: The commenter's username
 *         comment:
 *           type: string
 *           minLength: 3
 *           maxLength: 250
 *           description: The contents of the comment
 *         imageId:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: The image ID identifying where the comment was posted
 */
export const commentSchema: Joi.ObjectSchema<CommentDetails> = Joi.object<CommentDetails>({
    username: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Username'),

    comment: Joi.string()
    .trim()
    .min(3).max(250)
    .required()
    .label('Name'),

    imageId: Joi.string()
    .trim()
    .min(3).max(50)
    .required()
    .label('Image ID')
});
