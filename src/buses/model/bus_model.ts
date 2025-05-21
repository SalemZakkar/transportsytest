import {mongo} from "../../db";
import {extractPhone} from "../../core/utils/utils/string/string-utils";
import {RoleEnum} from "../../core/abilities/role-enum";

let BusSchema = new mongo.Schema(
    {
        plate: {
            type: String,
            unique: true,
            sparse: true,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        },
    }
)


export const BusModel = mongo.model('Bus', BusSchema)