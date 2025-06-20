import {Schema, model} from "mongoose";

const TokenModel = new Schema({
    username: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true}
})