import Joi from "joi";

export const mongoNumberSchema = () => {
    let allowedKeys: string[] = ['gt', 'gte', 'lt', 'lte', 'eq', 'ne', 'in', 'nin']
    return Joi.alternatives().try(
        Joi.number(),
        Joi.object()
            .keys(
                allowedKeys.reduce((acc, key) => {
                    if (['in', 'nin'].includes(key)) {
                        acc[key] = Joi.array().items(Joi.number());
                    } else {
                        acc[key] = Joi.number();
                    }
                    return acc;
                }, {} as Record<string, Joi.Schema>)
            )
            .or(...allowedKeys)
            .unknown(false) // forbid unknown keys!
    );
};