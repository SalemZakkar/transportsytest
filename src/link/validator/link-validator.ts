import Joi from "joi";

export const linkUserToLineValidator = Joi.object(
    {
        userId: Joi.string().required(),
        lineId: Joi.string().allow(null).optional(),
    }
).required().unknown(false);

export const linkUserToBusValidator = Joi.object(
    {
        userId: Joi.string().required(),
        busId: Joi.string().allow(null).optional(),
    }
).required().unknown(false);


export const getLinksValidator = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
    }
).unknown(false);

