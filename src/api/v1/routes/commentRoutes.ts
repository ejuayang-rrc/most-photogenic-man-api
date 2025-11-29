import express, { Router } from "express";
import * as commentController from "../controllers/commentController";

const router: Router = express.Router();

router.post("/", commentController.addComment);
router.get("/:id", commentController.getImageComments);
router.delete("/:id", commentController.deleteComment);

export default router;
