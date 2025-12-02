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
export interface CommentDetails {
    /** The comment ID */
    id: string,

    /** The commenter's username */
    username: string;

    /** The contents of the comment */
    comment: string;

    /** The image ID identifying where the comment was posted */
    imageId: string;
}