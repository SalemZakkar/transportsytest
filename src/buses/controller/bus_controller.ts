import {handler} from "../../core/utils/utils/handler";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {BusModel} from "../model/bus_model";
import {NotFoundError} from "../../core/models/app-error";
import {BaseApiGet} from "../../core/models/base-api-get";
import {BusLinkModel} from "../model/bus_link_model";
import {LineModel} from "../../lines/model/line-model";

export const createBus = handler(async (req, res, next) => {
    let model = new BusModel(req.body);
    let result = await model.save();
    sendSuccess(res, {data: result});
});

export const updateBus = handler(async (req, res, next) => {
    let result = await BusModel.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
        throw new NotFoundError();
    }
    result = await BusModel.findById(req.params.id);
    sendSuccess(res, {data: result});

});

export const deleteBus = handler(async (req, res, next) => {
    let result = await BusModel.findByIdAndDelete(req.params.id,);
    if (!result) {
        throw new NotFoundError();
    }
    sendSuccess(res);

});

export const getBuses = handler(async (req, res, next) => {
    let model = new BaseApiGet(BusModel.find(), req).paginate().filter();
    let count = await (new BaseApiGet(BusModel.find(), req).filter()).query.countDocuments();
    let users = await model.query.clone().find();
    sendSuccess(res, {total: count, data: users});
});