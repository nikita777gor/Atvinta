import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    icons: {
        selectedIcon: {type: String, required: true},
        inStockIcon: {type: String, required: true},
        outStockIcon: {type: String, required: true},
    },
    buyPrice: {type: Number, required: true},
    sellPrice: {type: Number, required: true},
});

export const componentModel = model('Component', UserSchema);