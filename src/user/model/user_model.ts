import {mongo} from "../../db";
import {extractPhone} from "../../core/utils/utils/string/string-utils";
import {RoleEnum} from "../../core/abilities/role-enum";
let UserSchema = new mongo.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(RoleEnum),
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        }

    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password;
            }
        }
    }
)


export const UserModel = mongo.model('User', UserSchema)