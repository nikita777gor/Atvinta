import {Schema, model} from "mongoose";

const userComponentSchema = new Schema({
    componentId: {type: Schema.Types.ObjectId, required: true},
    count: {type: Number, default: 0, min: 0},
}, {_id: false})

const UserSchema = new Schema({
    coins: {type: String, default: 0, max: 100},
    storage: [userComponentSchema],
    production: {
        progress: [userComponentSchema],
        selectedRobot: {
            type: {type: String, default: 'frontend'},
            stabilizer: {type: Number, default: 'male'},
        }

    }
})

export const userModel = model('User', UserSchema);