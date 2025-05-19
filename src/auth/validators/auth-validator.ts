import Joi from "joi";

export const createAccountValidator = Joi.object(
    {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(63).min(8).required(),
    },
).required().unknown(false);

export const signInAccountValidator = Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().max(63).min(8).required(),
    },
).required().unknown(false);