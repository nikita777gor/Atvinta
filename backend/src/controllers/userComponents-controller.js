import {responseHelper} from "../helpers/response-helper.js";
import {validationResult} from "express-validator";

import {API_MESSAGES} from "../messages/api-messages.js";
import {ApiError} from "../exceptions/api-error.js";

import {userComponentsService} from "../services/userComponents-service.js";


class UserComponentsController {

    async buyUserComponent(req, res, next){
        try{

            const validationErrors = validationResult(req).errors;
            if(validationErrors.length){
                throw ApiError.BadRequest(API_MESSAGES.error.userComponents.buyValidation);
            }

            const component = await userComponentsService.buyUserComponent(req.body.user.id, req.params.componentId);
            responseHelper(res, component, API_MESSAGES.success.userComponents.buy);
        }catch(err){
            next(err);
        }
    }

    async sellUserComponent(req, res, next){
        try{
            const validationErrors = validationResult(req).errors;
            if(validationErrors.length){
                throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sellValidation);
            }
            const component = await userComponentsService.sellUserComponent(req.body.user.id, req.params.componentId);
            responseHelper(res, component, API_MESSAGES.success.userComponents.sell);
        }catch(err){
            next(err);
        }
    }


}

export const storageController = new UserComponentsController();