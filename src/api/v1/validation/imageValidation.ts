import Joi from "joi";
import { ImageDetails } from "src/api/v1/models/imageModel";

export const imageSchema: Joi.ObjectSchema<ImageDetails> = Joi.object<ImageDetails>({
    title: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Title'),

    description: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Description'),

    eventId: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Event ID')
});

export const imageUpdateSchema: Joi.ObjectSchema<ImageDetails> = Joi.object<ImageDetails>({
    title: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Title'),

    description: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Description')
});
