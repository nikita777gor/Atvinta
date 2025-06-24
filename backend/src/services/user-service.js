import {userModel} from "../models/user-model.js";
import {tokenService} from "./token-service.js";

class UserService {

    async getUser(id){
        const user = await userModel.findById(id);
        return user;
    }

    async createUser(){
        const user = await userModel.create({});
        const userToken = await tokenService.createToken(user);
        return userToken;
    }

}

export const userService = new UserService();