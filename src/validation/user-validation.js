import Joi from "joi"

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const getUserValidaion = Joi.string().max(100).required()

const updatUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidaion,
    updatUserValidation
}