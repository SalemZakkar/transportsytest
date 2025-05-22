import {handler} from "../../core/utils/utils/handler";
import {UserModel} from "../../user/model/user_model";
import {LineModel} from "../../lines/model/line-model";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {BusModel} from "../../buses/model/bus_model";
import {BaseApiGet} from "../../core/models/base-api-get";
import {LinkModel} from "../model/link_model";

export const linkUserToLine = handler(async (req, res, next) => {
    let user = await UserModel.findById(req.body.userId);
    if (!user) {
        throw new Error('User not found');
    }
    let line = await LineModel.findById(req.body.lineId);
    if (!line && req.body.lineId) {
        throw new Error('Line not found');
    }
    let old = await LinkModel.findOne({user: req.body.userId,});
    if (old) {
        await LinkModel.findOneAndUpdate({user: req.body.userId}, {line: req.body.lineId});
    } else {
        await LinkModel.create({user: req.body.userId, line: req.body.lineId});
    }
    sendSuccess(res,);
});

export const linkUserToBus = handler(async (req, res, next) => {
    let user = await UserModel.findById(req.body.userId);
    if (!user) {
        throw new Error('User not found');
    }
    let bus = await BusModel.findById(req.body.busId);
    if (!bus && req.body.busId) {
        throw new Error('Bus not found');
    }
    let old = await LinkModel.findOne({user: req.body.userId,});
    if (old) {
        await LinkModel.findOneAndUpdate({user: req.body.userId}, {$set: {bus: req.body.busId}});
    } else {
        await LinkModel.create({user: req.body.userId, bus: req.body.busId});
    }
    sendSuccess(res,);
});

export const getLinks = handler(async (req, res, next) => {
    let model = new BaseApiGet(LinkModel.find(), req).paginate().filter();
    let count = await (new BaseApiGet(LinkModel.find(), req).filter()).query.countDocuments();
    let data = await model.query.clone().populate('line').populate('user').populate('bus').find();
    sendSuccess(res, {data: data, total: count});
});