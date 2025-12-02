import Joi from "joi";
import { CommentDetails } from "src/api/v1/models/commentModel";

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
});
