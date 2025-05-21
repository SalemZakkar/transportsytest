import Joi from "joi";
import {mongoNumberSchema} from "../../core/validators/number-query-schema";

export const createBusValidator = Joi.object(
    {
        plate: Joi.string().required(),
        manufacturer: Joi.string().required(),
        model: Joi.string().required(),
        seats: Joi.number().required(),
    },
).required().unknown(false);

export const updateBusValidator = Joi.object(
    {
        plate: Joi.string().optional(),
        manufacturer: Joi.string().optional(),
        model: Joi.string().optional(),
        seats: Joi.number().optional(),
    },
).required().unknown(false);

export const getBusValidator = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
        seats: mongoNumberSchema(),
        plate: Joi.string().optional(),
        manufacturer: Joi.string().optional(),
        model: Joi.string().optional(),
    }
).unknown(false)