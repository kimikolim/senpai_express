const joi = require('joi')
const joiPhone = joi.extend(require('joi-phone-number'))

module.exports = {

    loginValidate: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }),

    registerValidate: joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        mobile: joiPhone.string().phoneNumber().required(),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string().required(),
        //checkbox validation? user agreement
    })
}