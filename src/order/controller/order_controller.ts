import {handler} from "../../core/utils/utils/handler";
import {mongo} from "../../db";
import {LineModel} from "../../lines/model/line-model";
import {ErrorInput, NotFoundError} from "../../core/models/app-error";
import {sendSuccess} from "../../core/utils/utils/sendResponse";
import {OrderModel} from "../model/order_model";
import {LinkModel} from "../../link/model/link_model";
import {getUserFromReq} from "../../core/middleware/auth-middleware";
import {UserModel} from "../../user/model/user_model";
import {BaseApiGet} from "../../core/models/base-api-get";

export const createOrder = handler(async (req, res, next) => {
    const session = await mongo.startSession();

    try {
        session.startTransaction();
        const authUser = await getUserFromReq(req);
        const link = await LinkModel.findOne({user: authUser.id});

        if (!link?.line) {
            throw new ErrorInput('No linked line');
        }





        const [user, line] = await Promise.all([
            UserModel.findById(req.body.userId).session(session),
            LineModel.findById(link.line).session(session)
        ]);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        if (!line) {
            throw new NotFoundError('Line not found');
        }

        if (user.balance < line.price) {
            throw new ErrorInput('Insufficient balance');
        }

        user.balance -= line.price;
        await user.save({session});

        await OrderModel.create(
            [
                {
                    user: user._id,
                    line: line._id,
                    bus: link.bus,
                    price: line.price
                }
            ],
            {session}
        );


        await session.commitTransaction();
        sendSuccess(res);
    } catch (e) {
        await session.abortTransaction();
        next(e);
    } finally {
        await session.endSession();
    }
});


export const getOrder = handler(async (req, res, next) => {
    let user = await getUserFromReq(req);
    let model = new BaseApiGet(OrderModel.find({user: user.id}), req).paginate();
    let count = await (new BaseApiGet(OrderModel.find({user: user.id}), req)).query.countDocuments();
    let data = await model.query.clone().find();
    sendSuccess(res, {data: data, total: count});

});

export const getAllOrders = handler(async (req, res, next) => {
    let model = new BaseApiGet(OrderModel.find(), req).paginate();
    let count = await (new BaseApiGet(OrderModel.find(), req)).query.countDocuments();
    let data = await model.query.clone().find();
    sendSuccess(res, {data: data, total: count});
});