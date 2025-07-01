import {Router} from "express";
import {body, param} from "express-validator";

import {ApiError} from "../exceptions/api-error.js";

import {authMiddleware} from "../middlewares/auth-middleware.js";

import {userController} from "../controllers/user-controller.js";
import {marketController} from "../controllers/components-controller.js";
import {storageController} from "../controllers/userComponents-controller.js";
import {coinsController} from "../controllers/coins-controller.js";
import {productionController} from "../controllers/production-controller.js";


export const router = new Router();

router.get('/user/auth', userController.authUser);

router.get('/user', authMiddleware, userController.getUser);

router.get('/components', authMiddleware, marketController.getComponents);

router.patch('/user/coins',
    body('coins').isInt({min: 0, max: 100}),
    authMiddleware,
    coinsController.changeCoinsCount);

router.post('/user/components/:componentId',
    param('componentId').isMongoId(),
    authMiddleware,
    storageController.buyUserComponent);

router.delete('/user/components/:componentId',
    param('componentId').isMongoId(),
    authMiddleware,
    storageController.sellUserComponent);

router.put('/user/production/robot',
    body('type').isString(),
    body('stabilizer').isString(),
    authMiddleware,
    productionController.changeSelectedRobot)

router.post('/user/production/robot',
    authMiddleware,
    productionController.createProductionRobot)

router.post('/user/production/components/:componentId',
    param('componentId').isMongoId(),
    authMiddleware,
    productionController.addProductionComponent)

router.delete('/user/production/components/:componentId',
    param('componentId').isMongoId(),
    authMiddleware,
    productionController.removeProductionComponent)

router.all('/{*any}', (req, res, next) => {
    const err = ApiError.NotFound();
    next(err)
})

//Получение файлов
