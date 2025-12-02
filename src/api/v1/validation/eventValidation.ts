import Joi from "joi";
import { EventDetails } from "src/api/v1/models/eventModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     EventDetails:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           description: The event's ID
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: The name of the event
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *           description: A string describing the event
 *         date:
 *           type: string
 *           description: The date the event took place. Format: <Full Month Name> <Day>, <Year>
 *           example: "January 27, 2002"
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     EventDetails:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           description: The event's ID
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: The name of the event
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *           description: A string describing the event
 *         date:
 *           type: string
 *           description: The date the event took place. Format: <Full Month Name> <Day>, <Year>
 *           example: "January 27, 2002"
 */
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
