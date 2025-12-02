import express, { Router } from "express";

import * as commentController from "../controllers/commentController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /comment:
 *   post:
 *     summary: Post a new comment
 *     tags: [CommentDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - comment
 *               - imageId
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: The commenter's username
 *               comment:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 250
 *                 description: The contents of the comment
 *               imageId:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: The image ID identifying where the comment was posted
 *     responses:
 *       '201':
 *         description: Comment posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDetails'
 *       '400':
 *         description: Invalid body input
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["user", "admin"] }),
    commentController.addComment
);

/**
 * @openapi
 * /comment/{id}:
 *   get:
 *     summary: Get all of an image's comments by image ID
 *     tags: [CommentDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The image ID
 *     responses:
 *       '200':
 *         description: Comments found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDetails'
 *       '404':
 *         description: Comments not found
 */
router.get(
    "/:id", 
    authenticate,
    commentController.getImageComments
);

/**
 * @openapi
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [CommentDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *       '404':
 *         description: Comment not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod", "admin"] }),
    commentController.deleteComment
);

export default router;
