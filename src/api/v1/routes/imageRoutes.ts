import express, { Router } from "express";

import { uploadImage } from "../middleware/multerMiddleware";
import * as imageController from "../controllers/imageController";

const router: Router = express.Router();

router.post("/", uploadImage, imageController.uploadImageFile);
router.get("/", imageController.getImages);
router.get("/:id", imageController.getImageById);
router.put("/:id", imageController.updateImageDetails);
router.delete("/:id", imageController.deleteImage);

export default router;
