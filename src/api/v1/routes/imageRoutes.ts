import express, { Router } from "express";

import { uploadImage } from "../middleware/multerMiddleware";
import { uploadImageFile } from "../controllers/imageController";

const router: Router = express.Router();

router.post("/", uploadImage, uploadImageFile);

export default router;
