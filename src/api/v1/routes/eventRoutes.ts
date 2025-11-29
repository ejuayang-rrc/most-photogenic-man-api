import express, { Router } from "express";
import * as eventController from "../controllers/eventController";

const router: Router = express.Router();

router.post("/", eventController.storeEventDetails);
router.get("/", eventController.getAllEventDetails);
router.get("/:id", eventController.getEventDetailsById);
router.put("/:id", eventController.updateEventDetails);
router.delete("/:id", eventController.deleteEventDetails);

export default router;
