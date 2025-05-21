import {mongo} from "../../db";

let lineSchema = new mongo.Schema({
    from: {
        name: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    to: {
        name: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    price: {
        type: Number,
        required: true,
    }
});

export const LineModel = mongo.model('Line', lineSchema);