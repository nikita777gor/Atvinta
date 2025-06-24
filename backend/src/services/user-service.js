import {ApiError} from "../exceptions/api-error.js";

import {userModel} from "../models/user-model.js";
import {tokenService} from "./token-service.js";
import {API_MESSAGES} from "../messages/api-messages.js";

class UserService {

    async getUser(id){
        const user = await userModel.findById(id);
        if(!user){
            throw ApiError.BadRequest(API_MESSAGES.error.user.getUser);
        }
        return user;
    }

    async createUser(){
        const user = await userModel.create({});
        if(!user){
            throw ApiError.BadRequest(API_MESSAGES.error.user.authUser);
        }
        const userToken = await tokenService.createToken(user);
        if(!userToken){
            throw new ApiError(API_MESSAGES.error.user.authUser);
        }
        return userToken;
    }

}

export const userService = new UserService();