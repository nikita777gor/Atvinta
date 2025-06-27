import {Schema, model} from "mongoose";

const TokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true}
})

export const tokenModel = model('Token', TokenSchema);