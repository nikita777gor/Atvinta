import {userModel} from "../models/user-model.js";
import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";

class CoinsService {

    async changeCoinsCount(userId, coinsCount) {
        const coins = await userModel.findOneAndUpdate(
            {
                _id: userId,
                coins: coinsCount >= 0 ? {$lte: 100 - coinsCount} : {$gte: 0 - coinsCount},
                },
            {$inc: {coins: coinsCount}},
            {new: true}
        ).select('coins -_id');

        return coins;
    }

}

export const coinsService = new CoinsService();