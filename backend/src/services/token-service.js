import crypto from 'crypto';

import {tokenModel} from "../models/token-model.js";

class TokenService {

    async generateToken(){
        return crypto.randomBytes(16).toString('hex');
    }

    async createToken(userId){
        const generatedToken = await this.generateToken();
        const user = await tokenModel.create({userId: userId, token: generatedToken});
        return {token: user.token};
    }
}

export const tokenService = new TokenService();