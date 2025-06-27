import {responseHelper} from "../helpers/response-helper.js";
import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {body, validationResult} from "express-validator";

import {coinsService} from "../services/coins-service.js";



class CoinsController {

    async changeCoinsCount(req, res, next){
        try{
            const validationErrors = validationResult(req).errors;
            if(validationErrors[0]){
                throw ApiError.BadRequest(API_MESSAGES.error.coins.changeCount);
            }

            const coins = await coinsService.changeCoinsCount(req.body.user.id, req.body.coins);
            if(!coins){
                throw ApiError.BadRequest(API_MESSAGES.error.coins.changeCount);
            }

            responseHelper(res, coins, API_MESSAGES.success.coins.changeCount);
        }catch(err){
            next(err);
        }
    }

}

export const coinsController = new CoinsController();