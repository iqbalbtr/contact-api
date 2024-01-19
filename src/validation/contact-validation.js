import Joi from "joi"


const createContactValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().max(200).email().optional()
})

const getContactValidation = Joi.string().length(24).required()

const updateContactValidation = Joi.object({
    id: Joi.string().length(24).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().max(200).email().optional()
})

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation
}