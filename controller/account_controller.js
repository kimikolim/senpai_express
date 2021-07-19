const { UserModel } = require('../models/user')
const { SkillsModel } = require('../models/senpaiSkills')
const { registerValidate } = require('../middlewares/user_validate')

module.exports = {
    userAccount: (req, res) => {
        //JWT auth token
        //validate valid mongo objectID
        if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
            return res.status(400).json()
        }
        //Return User account
        UserModel.find({ _id: req.params.userID})
        .then(response => {
            return res.json(response)
        })
        .catch (error => {
            console.log(error);
        })
    },
    userUpdate: async (req, res) => {
        //validate user update details
        const validatedResult = registerValidate.validate(req.body)
        if (validatedResult.error) {
            return res.status(400).json(validatedResult.error)
        }

        const validatedValue = validatedResult.value

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

        //Update user profile
        try {
            await user.updateOne(validatedValue)
        } catch (error) {
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
    showSkill: (req, res) => {},
    addSkill: (req, res) => {},
    editSkill: (req, res) => {},
    deleteSkill: (req, res) => {},

}