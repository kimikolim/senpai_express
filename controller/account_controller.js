const mongoose = require('mongoose')
const _ = require('lodash')
const { UserModel } = require('../models/user')
const { SkillsModel } = require('../models/senpaiSkills')
const { registerValidate, senpaiSkillValidate } = require('../middlewares/user_validate')

module.exports = {
    userAccount: (req, res) => {
        //JWT auth token
        //validate valid mongo objectID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }
        //Return User account
        UserModel.findOne({ _id: req.params.userID})
        .then(response => {
            if(!response){
                return res.status(404).json({ message: "User not found." })
            }
            return res.json(response)
        })
        .catch (error => {
            console.log(error);
            return res.status(500).json(error)
        })
    },

    userUpdate: async (req, res) => {
        //validate valid mongo objectID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }
        //validate user update details - AGE EMAIL PHONE NUMBER ETC?
        //How to append more fields into existing data
        // const validatedResult = registerValidate.validate(req.body)
        // if (validatedResult.error) {
        //     return res.status(400).json(validatedResult.error)
        // }

        // const validatedValue = validatedResult.value

        let user = null
        //Check User account exists
        try {
            user = await UserModel.find({ _id: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!user) {
            return res.status(404).json({ message: "Account does not exist." })
        }
        console.log(req.body);
        //Update user profile eg. gender and age
        let { name, email, mobile, gender, age } = req.body
        try {
            await UserModel.updateOne(
                {
                    _id: req.params.userID
                },
                {
                    $set: {
                        name: name,
                        email: email,
                        mobile: mobile,
                        gender: gender,
                        age: age,
                    }
                }, { new: true, omitUndefined: true })
        } catch (error) {
            console.log(error);
            return res.status(500).json()
        }

        return res.json()

    },

    deleteAccount: async (req, res) => {
        let user = null
        //Check User account exists
        try {
            user = await UserModel.find({ _id: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!user) {
            return res.status(404).json({ message: "Account does not exist." })
        }
        //Delete account
        try {
            await UserModel.deleteOne({ _id: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        return res.json()
    },

    showSkill: (req, res) => {
         //validate valid mongo user objectID
         if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }
        //validate
        SkillsModel.find({ user: req.params.userID })
        .then(response => {
            if(!response){
                return res.status(404).json()
            }
            return res.json(response)
        })
        .catch (error => {
            console.log(error);
            return res.status(500).json()
        })
    },

    addSkill: (req, res) => {
        //validation senpai skills
        const validatedResult = senpaiSkillValidate.validate(req.body)
        if(validatedResult.error) {
            return res.status(400).json({ message: validatedResult.error })
        }

        const validatedValue = validatedResult.value

        let { tags } = req.body
        let arrTags = _.split(tags, ',')

        let createSkill = {
            mainCategory: validatedValue.mainCategory,
            subCategory: validatedValue.subCategory,
            user: req.params.userID,
            tags: arrTags,
            comments: ""
        }

        SkillsModel.create(createSkill)
         .then (response => {
             return res.json(response)
         })
         .catch (err => {
             console.log(err);
             return res.status(500).json(err)
         })


    },

    editSkill: async (req, res) => {
           //validate valid mongo objectID
           if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }
        //validate user update details - AGE EMAIL PHONE NUMBER ETC?
        //How to append more fields into existing data
        const validatedResult = senpaiSkillValidate.validate(req.body)
        if (validatedResult.error) {
            return res.status(400).json(validatedResult.error)
        }

        const validatedValue = validatedResult.value

        let user = null
        //Check User account exists
        try {
            user = await SkillsModel.find({ user: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!user) {
            return res.status(404).json({ message: "Account does not exist." })
        }

        //Update user profile eg. gender and age
        try {
            await user.updateOne(validatedValue)
        } catch (error) {
            return res.status(500).json()
        }

        return res.json()
    },

    deleteSkill: async (req, res) => {
        let user = null
        //Check User account exists
        try {
            user = await SkillsModel.find({ user: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!user) {
            return res.status(404).json({ message: "Account does not exist." })
        }
        //Delete account
        try {
            await SkillsModel.deleteOne({ user: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        return res.json()
    },

}