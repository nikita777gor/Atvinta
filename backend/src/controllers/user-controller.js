import {responseHelper} from "../helpers/response-helper.js";
import {userService} from "../services/user-service.js";
import {API_MESSAGES} from "../messages/api-messages.js";


class UserController {

    async authUser(req, res, next){
        try{
            const userToken = await userService.authUser();
            responseHelper(res, userToken, API_MESSAGES.success.user.auth);
        }catch(err){
            next(err);
        }
    }
    async getUser(req, res, next){
        try{
            const user = await userService.getUser(req.body.user.id);
            responseHelper(res, user, API_MESSAGES.success.user.get);
        }catch(err){
            next(err);
        }
    }

}

export const userController = new UserController();