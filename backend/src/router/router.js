import {Router} from "express";

import {userController} from "../controllers/user-controller.js";

export const router = new Router();

router.get('/auth', userController.checkUserAuth)