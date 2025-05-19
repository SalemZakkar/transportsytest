import {handler} from "../../core/utils/utils/handler";

import jwt from "jsonwebtoken";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {UserModel} from "../../user/model/user_model";
import {compare, hash} from "bcrypt";
import {RoleEnum} from "../../core/models/role-enum";
import {ErrorInput} from "../../core/models/app-error";

async function tokenSign(id: string, role: string): Promise<string> {
    return jwt.sign({id: id, role: role,}, process.env.JWT_SECRET!, {expiresIn: "90d"});
}


export const login = handler(async (req, res, next) => {
    let model = await UserModel.findOne({email: req.body.email,})
    if (!model) {
        throw new ErrorInput("Email or password is invalid")
    }
    if (!(await compare(req.body.password, model.password))) {
        throw new ErrorInput("Email or password is invalid")
    }
    let token = await tokenSign(model.id, model.role);
    sendSuccess(res, {data: model, token: token})
});

export const createAccount = handler(async (req, res, next) => {
    req.body.password = await hash(req.body.password, 10);
    let model = new UserModel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: RoleEnum.user
    });
    let result = await model.save();
    result.password = undefined as any;
    let token = await tokenSign(result.id, result.role);

    sendSuccess(res, {data: result , token: token});
});