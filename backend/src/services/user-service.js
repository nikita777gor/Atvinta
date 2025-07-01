import {ApiError} from "../exceptions/api-error.js";

import {userModel} from "../models/user-model.js";
import {tokenService} from "./token-service.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {componentsService} from "./components-service.js";
import {userComponentsService} from "./userComponents-service.js";

class UserService {

    async getUser(id){
        const user = await userModel.findById(id).lean()
            .populate({
                path: 'production.robot',
                select: '-components'
            })

        if(!user){
            throw ApiError.BadRequest(API_MESSAGES.error.user.auth);
        }

        const userComponents = await userComponentsService.fillEmptyUserComponents(id, user.storage);
        user.storage = userComponents;
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