import {Schema, model} from "mongoose";

const ComponentSchema = new Schema({
    name: {type: String, required: true},
    images: {
        mainImg: {type: String, required: true},
        selectedImg: {type: String, required: true},
        inStockImg: {type: String, required: true},
        outStockImg: {type: String, required: true}
    },
    buyPrice: {type: Number, required: true},
    sellPrice: {type: Number, required: true}
})

export const componentModel = model("Component", ComponentSchema)