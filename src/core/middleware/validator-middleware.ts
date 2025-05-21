import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ErrorInput} from "../models/app-error";

export const validatorMiddleware = (schema: Joi.Schema , query: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            let {error} = query ? schema.validate(req.query) : schema.validate(req.body,);

            if (!error?.message) {
                next()
            } else {
                next(new ErrorInput(error.message, error.details,))
            }
        }catch (e){
            next(e)
        }
    }
};