const joi = require('joi')
const { EnumMainCategories, EnumSubCategories } = require('../models/choices')

module.exports = {

    senpaiListValidate: joi.object({
        category: joi.string().valid(...EnumMainCategories).allow("", null),
        page: joi.number().min(0).allow("", null),
        per_page: joi.number().min(0).allow("", null)
 }),
    senpaiSkillValidate: joi.object({
        mainCategory: joi.string().valid(...EnumMainCategories).required(),
        subCategory: joi.string().valid(...EnumSubCategories).required(),
        tags: joi.string().max(30).required(),
        description: joi.string().max(200)
    })
}