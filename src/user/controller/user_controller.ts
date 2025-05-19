import {handler} from "../../core/utils/utils/handler";
import {getUserFromReq} from "../../core/middleware/auth-middleware";
import {sendSuccess} from "../../core/utils/utils/sendResponse";

export const getMine = handler(async (req, res, next) => {
    let user = await getUserFromReq(req );
    sendSuccess(res, {data: user});
});

export const changePhone = handler(async (req, res, next) => {

});

export const getUsers = handler(async (req, res, next) => {

});