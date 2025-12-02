/**
 * @openapi
 * components:
 *   schemas:
 *     ImageDetails:
 *       type: object
 *       required:
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
export interface ImageDetails {
    /** The Image's ID */
    id: string;

    /** The URL route to the image's location */
    route: string;

    /** The image's local filename */
    fileName: string;

    /** The image's title */
    title: string;

    /** A string describing the image */
    description: string;

    /** ID of the event the image is related to */
    eventId: string;
}