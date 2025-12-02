import express, { Router } from "express";

import * as commentController from "../controllers/commentController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    commentController.addComment
);

router.get(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    commentController.getImageComments
);

router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["mod"] }),
    commentController.deleteComment
);

export default router;
