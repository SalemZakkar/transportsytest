import {mongo} from "../../db";
import {extractPhone} from "../../core/utils/utils/string/string-utils";
import {RoleEnum} from "../../core/abilities/role-enum";
let OrderSchema = new mongo.Schema(
    {
        line: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Line',
            required: true,
        },
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
)


export const OrderModel = mongo.model('Order', OrderSchema);