import {Schema, model} from "mongoose";

const TokenModel = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true}
})

export const tokenModel = model('Token', TokenModel);