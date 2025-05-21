import Joi from "joi";
import {RoleEnum} from "../../core/abilities/role-enum";

export const createUserValidator = Joi.object(
    {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(63).min(8).required(),
        role: Joi.string().valid(...Object.values(RoleEnum)).required()
    },
).required().unknown(false);

export const updateUserValidator = Joi.object(
    {
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        role: Joi.string().valid(...Object.values(RoleEnum)).required()
    },
).required().unknown(false);

export const getUsersValidator = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
    }
).unknown(false)