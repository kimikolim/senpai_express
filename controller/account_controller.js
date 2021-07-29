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
        // console.log(req.body);
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
        //validate valid mongo user objectID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }


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
        UserModel.find({ _id: req.params.userID }).populate('skills').select('-hash')
        // SkillsModel.find({ user: req.params.userID }).populate('user', 'email name mobile gender age')
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

        const errors = []

        const validatedSkills = req.body.skillsData.map(element => {
            const validatedResult = senpaiSkillValidate.validate(element)

            if(validatedResult.error) {
                // console.log(validatedResult);
                errors.push(validatedResult.error)
                return {}
            }

            const validatedValue = validatedResult.value

            let { tags } = element
            let arrTags = _.split(tags, ',')

            let createSkill = {
                mainCategory: validatedValue.mainCategory,
                subCategory: validatedValue.subCategory,
                user: req.params.userID,
                tags: arrTags,
                rate: validatedValue.rate,
                experience: validatedValue.experience,
                comments: validatedValue.comments,
            }
            return createSkill
        })

        if(errors.length > 0) {
            return res.status(400).json({ success: false, message: "Field validation failed.", errors: errors })
        }

        SkillsModel.create(validatedSkills)
         .then (async (response) => {
            //  console.log(response);

            const responseArr = response.map(element => {
                return element._id
            })
            // console.log(responseArr);
             //validate if user exists
             const updateResult = await UserModel.findOneAndUpdate (
                { _id: req.params.userID },
                { $push : { skills : {$each: responseArr} }},
                { returnDocument: true }
            )
            // console.log("mcspicy");
            // console.log(updateResult);
             return res.json(response)
         })
         .catch (err => {
             console.log(err);
             return res.status(500).json(err)
         })


    },

    editSkill: async (req, res) => {
            //    validate valid mongo userID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
                return res.status(400).json({ message: "Invalid userID." })
        }

        let userAccount = null
        //Check User with skills exists
        try {
            userAccount = await SkillsModel.find({ user: req.params.userID })
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!userAccount) {
            return res.status(404).json({ message: "No skills found." })
        }
        //validation senpai skills
        const validatedResult = senpaiSkillValidate.validate(req.body)
        if (validatedResult.error) {
                return res.status(400).json(validatedResult.error)
        }
        // console.log(req.params);
        console.log(req.body);
        // return
        let { mainCategory, subCategory, tags, rate, experience, comments } = req.body
        let arrTags = _.split(tags, ',')
        try {
            await SkillsModel.updateOne(
                {
                    _id: req.params.skillID
                },
                {
                    $set: {
                        mainCategory: mainCategory,
                        subCategory: subCategory,
                        tags: arrTags,
                        rate: Number(rate),
                        experience: Number(experience),
                        comments: comments,
                    }
            }, { new: true, omitUndefined: true })

        }
        catch (error) {
            console.log(error)
            return res.status(500).json();
        }
        return res.json({ success: true })

    },

    deleteSkill: async (req, res) => {
        //frontend sends back req.params.skillID & userID


        //validate userID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json({ message: "Invalid userID." })
        }
        //validate skillID
        if (!mongoose.Types.ObjectId.isValid(req.params.skillID)) {
            return res.status(400).json({ message: "Invalid skillID." })
        }

        console.log(req.params);

        //Check if skill exists
        let skillUser = null
        try {
            skillUser = await SkillsModel.find({ _id: req.params.skillID })
            // console.log(user);
        } catch (error) {
            return res.status(500).json(error)
        }
        if (!skillUser) {
            return res.status(404).json({ message: "Error - no skill found." })
        }


        // //Delete skill and update changes in UserModel skills array
        try {
        //     await SkillsModel.deleteOne({ _id: req.params.skillID })

        //    await SkillsModel.find({ user: req.params.userID }).forEach( skillID => {
        //         var findUser = UserModel.find({ _id : req.params.userID});
                // console.log(skillID);
                // if(!cursor.hasNext() === false) {
                    //     UserModel.remove({skills : skillID._id});
                    // }
                // });
                // console.log(user);
                // console.log(skillUser);

            //
            // const userSkillIDArray = user[0].skills
            // console.log(userSkillIDArray); //skillsID in the userModel array

            // const skillIDArray =  skillUser.map(skillID => {
            //     return skillID._id
            // })
            // console.log(skillIDArray);//skillsID in the skillModel

            // userSkillIDArray = userSkillIDArray.filter(id => {
            //     return !skillIDArray.includes(id)
            // })
            // console.log(userSkillIDArray);

            // skillIDArray = skillIDArray.filter(id => {
            //     return !userSkillIDArray.includes(id)
            // })
            // console.log(skillIDArray);
            await SkillsModel.deleteOne({ _id: req.params.skillID })

            // await UserModel.findOneAndupdate(
            //     { _id: req.params.userID },
            //     { $pull: { skills: req.params.skillID }},
            //     { returnDocument: true }
            // )

        } catch (error) {
            return res.status(500).json(error)
        }
        return res.json({ success: true })


    },


}