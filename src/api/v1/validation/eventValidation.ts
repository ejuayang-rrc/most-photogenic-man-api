import Joi from "joi";
import { EventDetails } from "src/api/v1/models/eventModel";

export const eventSchema: Joi.ObjectSchema<EventDetails> = Joi.object<EventDetails>({
    id: Joi.string()
    .trim()
    .min(3).max(30)
    .required()
    .label('ID'),

    name: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Name'),

    description: Joi.string()
    .trim()
    .min(3).max(200)
    .required()
    .label('Description'),

    date: Joi.string()
    .pattern(/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})\s+(\d{4})/)
    .required()
    .messages({
        'string.pattern.base': 'Date is an invalid format'
    })
    .label('Date')
});

export const eventUpdateSchema: Joi.ObjectSchema<EventDetails> = Joi.object<EventDetails>({
    name: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Name'),

    description: Joi.string()
    .trim()
    .min(3).max(200)
    .required()
    .label('Description')
});
