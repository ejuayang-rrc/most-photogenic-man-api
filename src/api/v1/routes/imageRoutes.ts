import express, { Router } from "express";

import { uploadImage } from "../middleware/multerMiddleware";
import * as imageController from "../controllers/imageController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /image:
 *   post:
 *     summary: Uploads an image and creates attributes
 *     tags: [ImageDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - eventId
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: The image's title
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 250
 *                 description: A string describing the image
 *               eventId:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 250
 *                 description: ID of the event the image is related to
 *     responses:
 *       '201':
 *         description: Image created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageDetails'
 *       '400':
 *         description: Invalid body input
 */
router.post(
    "/", 
    uploadImage, 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.uploadImageFile 
);

/**
 * @openapi
 * /image:
 *   get:
 *     summary: Get all images
 *     tags: [ImageDetails]
 *     responses:
 *       '200':
 *         description: List of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageDetails'
 */
router.get(
    "/", 
    authenticate,
    imageController.getImages
);

/**
 * @openapi
 * /image:
 *   get:
 *     summary: Get all images
 *     tags: [ImageDetails]
*     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The image ID
 *     responses:
 *       '200':
 *         description: List of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageDetails'
 */
router.get(
    "/:id", 
    authenticate,
    imageController.getImageById
);

/**
 * @openapi
 * /image/{id}:
 *   put:
 *     summary: Update a image's title or description
 *     tags: [images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: The image's title
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 250
 *                 description: A string describing the image
 *     responses:
 *       '200':
 *         description: Image details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageDetails'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Image not found
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.updateImageDetails
);

/**
 * @openapi
 * /image/{id}:
 *   delete:
 *     summary: Delete an image by ID
 *     tags: [ImageDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The image ID
 *     responses:
 *       '200':
 *         description: Image deleted successfully
 *       '404':
 *         description: Image not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.deleteImage
);

export default router;
