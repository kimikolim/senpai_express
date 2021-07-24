const mongoose = require('mongoose')
const { senpaiListValidate } = require('../middlewares/senpai_validate')
const { UserModel } = require('../models/user')

module.exports = {
    //Senpai list page
    senpaiList: async (req, res) => {
        //validate req.params => mainCategory
        //validate req.query => subCategory, experience, rates, tags
        let validatedSub = req.query.subCategory.split(',')
        let validatedExperience = Number(req.query.experience)
        let validatedRates = Number(req.query.rates)
        let validatedTags = req.query.tags.split(',')
        const query = {...req.query, ...req.params, subCategory: { $in: validatedSub}, experience: validatedExperience, rates: validatedRates, tags: { $in: validatedTags }}
        console.log(query);
        
        // const validatedResult = senpaiListValidate.validate(query)
        // if(validatedResult.error) {
        //     return res.status(400).json(validatedResult.error)
        // }
        // //Pagination
        // const validatedValue = validatedResult.value

        // let page = 0
        // let per_page = 10

        // if (validatedValue.page && validatedValue.per_page) {
        //     let page = validatedValue.page
        //     let perPage = validatedValue.per_page
        // }
        //filter database
        //keywords? tags?
        //mongo search by array

        // let filter = {}
        // if (validatedValue.mainCategory) {
        //     filter.mainCategory = validatedValue.mainCategory
        // }
        // if (validatedValue.subCategory) {
        //     filter.subCategory = validatedValue.subCategory
        // }
        // for (const property in validatedValue) {
        //     if (validatedValue[property]) {
        //             filter[property] = validatedValue[property]
        //         }
        //   }

        //   console.log(filter);


        SkillsModel.aggregate(
            {
                $match: query

            },
            {
                $group:
                    {
                        _id:'$user',
                        numOfSkillMatches: {$sum:1},

                    }
            },
            function(err, orders) {
              res.json(orders);
          });


        //total count of filtered result
        // let totalSenpai = 0
        // try {
        //     totalSenpai = await UserModel.countDocuments(filter)
        // } catch (error) {
        //     return res.status(500).json()
        // }

        //retreive paginated filtered data (send to frontend)
        // UserModel.find(filter).skip(perPage * page).limit(perPage)
        // .then (response => {
        //     return res.json({ senpai : response, totalSenpai: totalSenpai })
        // })
        // .catch (error => {
        //     console.log(error);
        //     return res.json(error)
        // })


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