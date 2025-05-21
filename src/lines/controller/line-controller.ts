import {handler} from "../../core/utils/utils/handler";
import {BaseApiGet} from "../../core/models/base-api-get";
import {LineModel} from "../model/line-model";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {NotFoundError} from "../../core/models/app-error";

export const getLineByCriteria = handler(async (req, res, next) => {
    let model = new BaseApiGet(LineModel.find(), req).paginate().filter();
    let count = await (new BaseApiGet(LineModel.find(), req).filter()).query.countDocuments();
    let data = await model.query.clone().find();
    sendSuccess(res, {data: data, total: count});
});

export const createLine = handler(async (req, res, next) => {
    let model = await (new LineModel(req.body)).save();
    sendSuccess(res, {data: model});
});

export const updateLine = handler(async (req, res, next) => {
    let model = await LineModel.findByIdAndUpdate(req.params.id, req.body);
    if (!model) {
        throw new NotFoundError();
    }
    model = await LineModel.findById(req.params.id);
    sendSuccess(res, {data: model});
});

export const deleteLine = handler(async (req, res, next) => {
    let model = await LineModel.findByIdAndDelete(req.params.id,);
    if (!model) {
        throw new NotFoundError();
    }
    sendSuccess(res);
});