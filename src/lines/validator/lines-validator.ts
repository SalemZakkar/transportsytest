import Joi from "joi";
import {mongoNumberSchema} from "../../core/validators/number-query-schema";

export const createLineValidator = Joi.object({
    from: Joi.object({
        name: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    }).required(),
    to: Joi.object({
        name: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    }).required(),
    price: Joi.number().required().min(0)
}).unknown(false).required();

export const updateLineValidator = Joi.object({
    from: Joi.object({
        name: Joi.string().optional(),
        lat: Joi.number().optional(),
        lng: Joi.number().optional(),
    }).required(),
    to: Joi.object({
        name: Joi.string().optional(),
        lat: Joi.number().optional(),
        lng: Joi.number().optional(),
    }).required(),
    price: Joi.number().min(0).optional(),
}).unknown(false).required();


export const getLineValidator = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
        price: mongoNumberSchema(),
    }
).unknown(false)