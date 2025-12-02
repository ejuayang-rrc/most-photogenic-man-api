export interface CommentDetails {
    /** The comment ID */
    id: string,

    /** The commenter's username */
    username: string;

    /** The contents of the comments */
    comment: string;

    /** The image ID for where the comment was posted */
    imageId: string;
}