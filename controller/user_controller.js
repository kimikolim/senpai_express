const mongoose = require('mongoose')
const { loginValidate, registerValidate } = require('../middlewares/user_validate')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {

        //validation user_validate
        const validatedResult = registerValidate.validate(req.body)
        if(validatedResult.error) {
            return res.status(400).json({ message: validatedResult.error })
        }

        //password match validation
        const validatedValue = validatedResult.value
        if(validatedValue.password !== validatedValue.confirmPassword) {
            return res.status(406).json({ message: 'Password did not match!' })
        }

        //generate hash
        let hash = ''

        try {
            hash = await bcrypt.hash(validatedValue.password, 10)
        } catch (error) {
            return res.status(500).json()
        }

        //verify duplicate user

        //create user account
    },
    login: (req, res) => {

        //validation email & pw

        //verify user email exists

        //verify correct password

        //JWT expiry
    },
}