import {userService} from "../services/user-service.js";
import {tokenService} from "../services/token-service.js";
import {ApiError} from "../exceptions/api-error.js";

class UserController {

    async authUser(req, res, next){
        try{
            const userToken = await userService.createUser();
            res.status(200).json(userToken);
        }catch(err){
            next(err);
        }
    }
    async getUser(req, res, next){
        try{
            const user = await userService.getUser(req.body.user.id);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    }

}

export const userController = new UserController();