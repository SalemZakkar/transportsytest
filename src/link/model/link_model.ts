import {mongo} from "../../db";

let LinkSchema = new mongo.Schema(
    {
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        line: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Line',
        },
        bus: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Bus',
            // required: true,
        },
    }
)

export const LinkModel = mongo.model('Link', LinkSchema);