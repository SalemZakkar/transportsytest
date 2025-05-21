import {handler} from "../../core/utils/utils/handler";
import {getUserFromReq} from "../../core/middleware/auth-middleware";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {hash} from "bcrypt";
import {UserModel} from "../model/user_model";
import {NotFoundError} from "../../core/models/app-error";
import {BaseApiGet} from "../../core/models/base-api-get";


export const getMine = handler(async (req, res, next) => {
    let user = await getUserFromReq(req);
    sendSuccess(res, {data: user});
});

export const createUser = handler(async (req, res, next) => {
    req.body.password = await hash(req.body.password, 10);
    let model = new UserModel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
    });
    let result = await model.save();
    result.password = undefined as any;
    sendSuccess(res, {data: result});
});

export const updateUser = handler(async (req, res, next) => {
    let result = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
        throw new NotFoundError();
    }
    result = await UserModel.findById(req.params.id);
    sendSuccess(res, {data: result});

});

export const deleteUser = handler(async (req, res, next) => {
    let result = await UserModel.findByIdAndDelete(req.params.id,);
    if (!result) {
        throw new NotFoundError();
    }
    sendSuccess(res);

});


export const getUsers = handler(async (req, res, next) => {
    let model = new BaseApiGet(UserModel.find(), req).paginate().filter();
    let count = await (new BaseApiGet(UserModel.find(), req).filter()).query.countDocuments();
    let users = await model.query.clone().find();
    sendSuccess(res, {total: count, data: users});
});