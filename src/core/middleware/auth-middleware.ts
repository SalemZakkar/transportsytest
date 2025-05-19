import * as expressJwt from "express-jwt"
import {UserModel} from "../../user/model/user_model";
import {handler} from "../utils/utils/handler";
import {UnAuthenticated} from "../models/app-error";
import jwt from "jsonwebtoken";
import {Request} from "express";

export const authMiddleware = () => {
    return expressJwt.expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ["HS256"],
        isRevoked: async (request, payload) => {

            (request as any).user = await UserModel.findById((payload!.payload as any).id);
            return payload == null;
        },
    },).unless({
        path: [
            {url: "/api/auth/signIn", methods: ["POST"]},
            {url: "/api/auth/signUp", methods: ["POST"]},
        ]
    })
}

export const getUserFromReq = async function (req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new UnAuthenticated();// Unauthorized
    }
    const result = jwt.decode(token);

    if (!result) {
        throw new UnAuthenticated();
    }
    let user = await UserModel.findById((result as any).id);
    if (!user) {
        throw new UnAuthenticated();
    }
    return user;
};