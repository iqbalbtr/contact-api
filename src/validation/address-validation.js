import Joi from "joi";

const createAddresValidation = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postal_code: Joi.string().max(10).required(),
    province: Joi.string().max(100).optional()
})

export {
    createAddresValidation
}