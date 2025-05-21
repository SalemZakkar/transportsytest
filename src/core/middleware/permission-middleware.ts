import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ErrorInput, NoPermissionsError} from "../models/app-error";
import {Actions} from "../abilities/actions";
import {Subjects} from "../abilities/subjects";
import {getUserFromReq} from "./auth-middleware";
import {abilities} from "../abilities/abilities";

export const permissionMiddleware = (actions: Actions, subject: Subjects) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let user = await getUserFromReq(req);
        let perm = abilities(user);
        if (perm.can(actions, subject)) {
            next();
        } else {
            next(new NoPermissionsError());
        }
    }
}