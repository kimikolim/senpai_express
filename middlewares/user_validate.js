const joi = require('joi')
const { EnumUserGender } = require('../models/choices')
const joiPhone = joi.extend(require('joi-phone-number'))

module.exports = {

    loginValidate: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }),

    registerValidate: joi.object({
        name: joi.string().min(3).max(40).required(),
        email: joi.string().email().required(),
        mobile: joiPhone.string().phoneNumber().required(),
        gender: joi.string().valid(...EnumUserGender),
        age: joi.number().min(0).max(100),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string().required(),
        //checkbox validation? user agreement
    })
}