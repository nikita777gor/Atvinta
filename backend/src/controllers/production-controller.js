import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {responseHelper} from "../helpers/response-helper.js";

import {productionService} from "../services/production-service.js";

class ProductionController {

    async changeSelectedRobot(req, res, next) {
        try{

            const validationErrors = validationResult(req).errors;
            if(validationErrors.length){
                throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobotValidation);
            }

            const {type, stabilizer} = req.body;

            const typeValues = ['frontend', 'design'];
            const stabilizerValues = ['male', 'famale'];
            if(!typeValues.includes(type) || !stabilizerValues.includes(stabilizer)){
                throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobotValidation);
            }

            const selectedRobot = await productionService.changeProductionRobot(req.body.user.id, type, stabilizer);
            responseHelper(res, selectedRobot, API_MESSAGES.success.production.changeRobot)

        }catch(err){
            next(err);
        }
    }


    async addProductionComponent(req, res, next){
        try{

            const validationErrors = validationResult(req).errors;
            if(validationErrors.length){
                throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobotValidation);
            }

            const productionComponents = await productionService.addProductionComponent(req.body.user.id, req.params.componentId);
            responseHelper(res, productionComponents, API_MESSAGES.success.production.addComponent)

        }catch(err){
            next(err);
        }
    }


    async removeProductionComponent(req, res, next){
        try{
            const validationErrors = validationResult(req).errors;
            if(validationErrors.length){
                throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobotValidation);
            }

            const productionComponents = await productionService.removeProductionComponent(req.body.user.id, req.params.componentId)
            responseHelper(res, productionComponents, API_MESSAGES.success.production.removeComponent)

        }catch(err){
            next(err);
        }
    }

    async createProductionRobot(req, res, next){
        try{
            const productionRobot = await productionService.createProductionRobot(req.body.user.id);
            responseHelper(res, productionRobot, API_MESSAGES.success.production.createRobot)

        }catch(err){
            next(err);
        }
    }


}

export const productionController = new ProductionController();