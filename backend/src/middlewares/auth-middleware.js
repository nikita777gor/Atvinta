import {ApiError} from "../exceptions/api-error.js";
import {tokenModel} from "../models/token-model.js";

export const authMiddleware = async (req, res, next) => {
    try{
        const tokenHeader = req.headers.authorization;

        if(!tokenHeader){
            throw ApiError.Unauthorized()
        }

        const parseToken = tokenHeader.split(' ')[1];
        if(!parseToken){
            throw ApiError.Unauthorized()
        }

        const tokenFromDb = await tokenModel.findOne({token: parseToken});
        if(!tokenFromDb){
            throw ApiError.Unauthorized()
        }

        req.body = req.body || {};
        req.body.user = req.body.user || {};
        req.body.user.id = tokenFromDb.userId;

        next()
    }catch(err){
        next(err)
    }
}