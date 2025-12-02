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
    .pattern(/^(January|February|March|April|May|June|July|August|September|October|November|December) (0?[1-9]|[12][0-9]|3[01]), (19|20)\d{2}$/)
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
