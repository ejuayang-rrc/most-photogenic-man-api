import express, { Router } from "express";

import * as eventController from "../controllers/eventController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.storeEventDetails
);

router.get(
    "/", 
    authenticate,
    eventController.getAllEventDetails
);

router.get(
    "/:id", 
    authenticate,
    eventController.getEventDetailsById
);

router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.updateEventDetails
);

router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    eventController.deleteEventDetails
);

export default router;
