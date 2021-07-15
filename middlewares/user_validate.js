const joi = require('joi')

module.exports = {

    loginValidate: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }),

    registerValidate: joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string().required()
    })
}