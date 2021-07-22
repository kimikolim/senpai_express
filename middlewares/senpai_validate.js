const joi = require('joi')
const { EnumMainCategories, EnumSubCategories } = require('../models/choices')

module.exports = {

    senpaiListValidate: joi.object({
        mainCategory: joi.string().valid(...EnumMainCategories).allow("", null),
        page: joi.number().min(0).allow("", null),
        per_page: joi.number().min(0).allow("", null)
 })

}