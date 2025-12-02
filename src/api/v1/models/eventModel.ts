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
export interface EventDetails {
    /** The event's ID */
    id: string;

    /** The name of the event */
    name: string;

    /** A string describing the event */
    description: string;

    /** Day of the event */
    date: Date;
}