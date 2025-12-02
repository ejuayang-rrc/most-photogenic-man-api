import express, { Router } from "express";

import { uploadImage } from "../middleware/multerMiddleware";
import * as imageController from "../controllers/imageController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.post(
    "/", 
    uploadImage, 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.uploadImageFile 
);

router.get(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    imageController.getImages
);

router.get(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    imageController.getImageById
);

router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.updateImageDetails
);

router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    imageController.deleteImage
);

export default router;
