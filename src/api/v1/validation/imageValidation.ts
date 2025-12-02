import Joi from "joi";
import { ImageDetails } from "src/api/v1/models/imageModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     ImageDetails:
 *       type: object
 *       required:
 *         - id
 *         - route
 *         - fileName
 *         - title
 *         - description
 *         - eventId
 *       properties:
 *         id:
 *           type: string
 *           description: The image's ID
 *         route:
 *           type: string
 *           description: The URL route to the image's location
 *         fileName:
 *           type: string
 *           description: The image's local filename
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: The image's title
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 250
 *           description: A string describing the image
 *         eventId:
 *           type: string
 *           minLength: 3
 *           maxLength: 250
 *           description: ID of the event the image is related to
 */
export const imageSchema: Joi.ObjectSchema<ImageDetails> = Joi.object<ImageDetails>({
    title: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Title'),

    description: Joi.string()
    .trim()
    .min(3).max(250)
    .required()
    .label('Description'),

    eventId: Joi.string()
    .trim()
    .min(3).max(30)
    .required()
    .label('Event ID')
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ImageDetails:
 *       type: object
 *       required:
 *         - id
 *         - route
 *         - fileName
 *         - title
 *         - description
 *         - eventId
 *       properties:
 *         id:
 *           type: string
 *           description: The image's ID
 *         route:
 *           type: string
 *           description: The URL route to the image's location
 *         fileName:
 *           type: string
 *           description: The image's local filename
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: The image's title
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 250
 *           description: A string describing the image
 *         eventId:
 *           type: string
 *           minLength: 3
 *           maxLength: 250
 *           description: ID of the event the image is related to
 */
export const imageUpdateSchema: Joi.ObjectSchema<ImageDetails> = Joi.object<ImageDetails>({
    title: Joi.string()
    .trim()
    .min(3).max(100)
    .required()
    .label('Title'),

    description: Joi.string()
    .trim()
    .min(3).max(250)
    .required()
    .label('Description')
});
