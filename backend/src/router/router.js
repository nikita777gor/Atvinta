import {Router} from "express";

import {authMiddleware} from "../middlewares/auth-middleware.js";

import {userController} from "../controllers/user-controller.js";

export const router = new Router();

router.get('/user/auth', userController.authUser);
router.get('/user', authMiddleware, userController.getUser);


router.all('/{*any}', (req, res) => {
    res.status(404).json('Page Not Found');
})