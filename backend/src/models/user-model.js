import {Schema, model} from "mongoose";

const userComponentSchema = new Schema({
    componentId: {type: Schema.Types.ObjectId, required: true, ref: "Component"},
    count: {type: Number, default: 0, min: 0},
}, {_id: false})

// В моделе User указано timestamps true для того чтобы в будущем во избежании засорения базы можно было удалять пользователей которые не активны в течении длительного времени
const UserSchema = new Schema({
    coins: {type: String, default: 0, max: 100},
    storage: [userComponentSchema],
    production: {
        progress: [userComponentSchema],
        selectedRobot: {
            type: {type: String, default: 'frontend'},
            stabilizer: {type: String, default: 'male'},
        }

    },
}, {timestamps: true});

export const userModel = model('User', UserSchema);