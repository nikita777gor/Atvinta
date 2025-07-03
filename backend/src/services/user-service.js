import {ApiError} from "../exceptions/api-error.js";

import {userModel} from "../models/user-model.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {productionComponentDto} from "../dtos/productionComponent-dto.js";

import {tokenService} from "./token-service.js";
import {componentsService} from "./components-service.js";
import {userComponentsService} from "./userComponents-service.js";


class UserService {

    async getUser(id){
        const user = await userModel.findById(id).lean()
            .populate([
                {
                path: 'production.robot',
                select: '-components'

                },
                {
                    path: 'production.components.component',
                    select: '_id icons count maxCount name'
                }
            ])

        if(!user){
            throw ApiError.Unauthorized();
        }


        const newProductionComponents = user.production.components.map((item) => productionComponentDto(item.component, item.count, item.maxCount));
        const userComponents = await userComponentsService.fillEmptyUserComponents(id, user.storage);
        user.storage = userComponents;
        user.production.components = newProductionComponents;
        return user;

    }

    async authUser(){
        const user = await userModel.create({});
        if(!user){
            throw ApiError.BadRequest(API_MESSAGES.error.user.auth);
        }
        const userToken = await tokenService.createToken(user);
        if(!userToken){
            throw new ApiError.BadRequest(API_MESSAGES.error.user.auth);
        }


        return userToken;
    }

}

export const userService = new UserService();