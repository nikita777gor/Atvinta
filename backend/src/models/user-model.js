import  {Schema, model} from "mongoose";

const userComponentSchema = new Schema({
    component: {type: Schema.Types.ObjectId, required: true, ref: "Component"},
    count: {type: Number, default: 1, min: 0},
}, {_id: false})

const productionComponentSchema = new Schema(userComponentSchema);
productionComponentSchema.add({maxCount: {type: Number, default: 1}});

const UserSchema = new Schema({
    coins: {type: Number, default: 0, max: 100},
    storage: [userComponentSchema],
    production: {
        components: [productionComponentSchema],
        robot: {type: Schema.Types.ObjectId, required: true, default: '685f96b8f9afaf8db9f8a80b' , ref: "Robot"},

    },
}, {timestamps: true});

export const userModel = model('User', UserSchema);