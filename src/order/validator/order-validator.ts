import Joi from "joi";

export const createOrderValidator = Joi.object(
    {
        userId: Joi.string().required(),
    },
).required().unknown(false);

export const getOrdersValidator = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
    }
).unknown(false);