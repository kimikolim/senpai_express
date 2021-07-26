const joi = require('joi')
const { EnumUserGender, EnumSubCategories, EnumMainCategories } = require('../models/choices')
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
        gender: joi.string().valid(...EnumUserGender).allow("", null),
        age: joi.number().min(0).max(100).allow("", null),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string().required(),
        // checkbox validation? user agreement
    }),

    senpaiSkillValidate: joi.object({
        mainCategory: joi.string().valid(...EnumMainCategories).required(),
        subCategory: joi.string().valid(...EnumSubCategories).required(),
        rate: joi.number().min(0).required(),
        experience: joi.number().min(0).required(),
        tags: joi.string().max(80).required(),
        comments: joi.string().max(200).allow("", null)
    })

    //update validator

}