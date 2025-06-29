import {Schema, model} from "mongoose";

const robotComponentSchema = new Schema({
    component: {type: Schema.Types.ObjectId, ref: 'Component', required: true},
    count: {type: Number, default: 1, min: 1},
}, {_id: false})

const RobotSchema = new Schema({
    type: {type: String, default: 'frontend'},
    stabilizer: {type: String, default: 'male'},
    components: [robotComponentSchema],
    images: {
        createdImg: {type: String, required: true},
        canCreateImg: {type: String, required: true},
        forbiddenCreateImg: {type: String, required: true}
    },
    createPrice: {type: Number, required: true}
})

export const robotModel = model("Robot", RobotSchema)