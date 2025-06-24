import {Router} from "express";

import {authMiddleware} from "../middlewares/auth-middleware.js";

import {userController} from "../controllers/user-controller.js";
import {componentsController} from "../controllers/components-controller.js";

export const router = new Router();

router.get('/user/auth', userController.authUser);
router.get('/user', authMiddleware, userController.getUser);
router.get('/components', authMiddleware, componentsController.getAllComponents)


router.all('/{*any}', (req, res) => {
    res.status(404).json('Page Not Found');
})