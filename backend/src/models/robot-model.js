import {Schema, model} from "mongoose";

const robotComponentSchema = new Schema({
    componentId: {type: Schema.Types.ObjectId, ref: 'Component', required: true},
    componentCount: {type: Number, required: true}
})

const RobotSchema = new Schema({
    type: {type: String, required: true},
    stable: {type: String, required: true},
    components: [robotComponentSchema],
    images: {
        createdtImg: {type: String, required: true},
        canCreateImg: {type: String, required: true},
        forbiddenCreateImg: {type: String, required: true}
    },
    createPrice: {type: Number, required: true}
})

export const robotSchema = model("Robot", RobotSchema)