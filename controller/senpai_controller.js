const mongoose = require('mongoose')
const { senpaiListValidate } = require('../middlewares/senpai_validate')
const { UserModel } = require('../models/user')

module.exports = {
    //Senpai list page
    senpaiList: (req, res) => {
        //validate req.query
        const validatedResult = senpaiListValidate.validate(req.query)
        if(validatedResult.error) {
            return res.status(400).json(validatedResult.error)
        }
        //filter database

        //total count of filtered result

        //retreive paginated filtered data (send to frontend)
        UserModel.find({ mainCategory: req.params.category})
        .then (response => {
            return res.json(response)
        })
        .catch (error => {
            console.log(error);
        })


    },
    //Senpai Profile page
    senpaiProfile: (req, res) => {
        //validate if it is mongodb valid ObjectID

        //return senpai individual profile
        UserModel.find({ _id: req.params.userID })
        .then (response => {
            return res.json(response)
        })
        .catch (error => {
            console.log(error);
        })
    },

}