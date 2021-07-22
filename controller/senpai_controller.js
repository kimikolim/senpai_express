const mongoose = require('mongoose')
const { senpaiListValidate } = require('../middlewares/senpai_validate')
const { UserModel } = require('../models/user')

module.exports = {
    //Senpai list page
    senpaiList: async (req, res) => {
        //validate req.query
        const validatedResult = senpaiListValidate.validate(req.query)
        if(validatedResult.error) {
            return res.status(400).json(validatedResult.error)
        }
        //Pagination
        const validatedValue = validatedResult.value

        let page = 0
        let per_page = 10

        if (validatedValue.page && validatedValue.per_page) {
            let page = validatedValue.page
            let perPage = validatedValue.per_page
        }
        //filter database
        //keywords? tags?
        let filter = {}
        if (validatedValue.mainCategory) {
            filter.mainCategory = validatedValue.mainCategory
        }
        if (validatedValue.subCategory) {
            filter.subCategory = validatedValue.subCategory
        }

        //total count of filtered result
        let totalSenpai = 0
        try {
            totalSenpai = await UserModel.countDocuments(filter)
        } catch (error) {
            return res.status(500).json()
        }

        //retreive paginated filtered data (send to frontend)
        UserModel.find(filter).skip(perPage * page).limit(perPage)
        .then (response => {
            return res.json({ senpai : response, totalSenpai: totalSenpai })
        })
        .catch (error => {
            console.log(error);
            return res.json(error)
        })


    },
    //Senpai Profile page
    senpaiProfile: (req, res) => {
        //validate valid mongo objectID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json()
        }

        //return senpai individual profile
        UserModel.findOne({ _id: req.params.userID })
        .then (response => {
            if(!response) {
                return res.status(404).json({ message: "Senpai not found." })
            }
            return res.json(response)
        })
        .catch (error => {
            return res.status(500).json(error)
        })
    },

}