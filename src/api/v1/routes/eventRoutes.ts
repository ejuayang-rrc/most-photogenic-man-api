import express, { Router } from "express";

import * as eventController from "../controllers/eventController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /event:
 *   post:
 *     summary: Create a new event
 *     tags: [EventDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - date
 *             properties:
 *               id:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: The event's ID
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: The name of the event
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 description: A string describing the event
 *               date:
 *                 type: string
 *                 description: The date the event took place
 *                 example: "January 27, 2002"  
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDetails'
 *       '400':
 *         description: Invalid body input
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.storeEventDetails
);

/**
 * @openapi
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [EventDetails]
 *     responses:
 *       '200':
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventDetails'
 */
router.get(
    "/", 
    authenticate,
    eventController.getAllEventDetails
);

/**
 * @openapi
 * /event/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [EventDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       '200':
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDetails'
 *       '404':
 *         description: Event not found
 */
router.get(
    "/:id", 
    authenticate,
    eventController.getEventDetailsById
);

/**
 * @openapi
 * /event/{id}:
 *   put:
 *     summary: Update an event's name or description by ID
 *     tags: [EventDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: The name of the event
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 description: A string describing the event
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDetails'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Event not found
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.updateEventDetails
);

/**
 * @openapi
 * /event/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [EventDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.deleteEventDetails
);

export default router;
