import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    coins: {type: String, default: 0, max: 100},
    storage: {
        bioarmCount: {type: Number, default: 0},
        microchipCount: {type: Number, default: 0},
        soulCount: {type: Number, default: 0}
    },
    production: {
        progress: {
            bioarmCount: {type: Number, default: 0, max: 4},
            microchipCount: {type: Number, default: 0, max: 4},
            soulCount: {type: Number, default: 0, max: 1}
        },
        selectedRobot: {
            type: {type: Number, default: 0, max: 1},
            stabilizer: {type: Number, default: 0, max: 1},
        }

    }

})