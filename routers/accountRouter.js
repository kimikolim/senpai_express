const express = require('express')
const router = express.Router()
const accountController = require('../controller/account_controller')

const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const upload = multer({ dest: 'uploads/' })

const cloudinaryStorageStrategy = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'senpai-profilePic',
    //   format: async (req, file) => 'png', // supports promises as well
    //   public_id: (req, file) => 'computed-filename-using-request',
    },
})

const uploadParser = multer({ storage: cloudinaryStorageStrategy })

//Individual user dashboard
router.get('/:userID/profile', accountController.userAccount)
//User update details
router.patch('/:userID/profile',uploadParser.single('img'), accountController.userUpdate)
//User delete account
router.delete('/:userID/profile', accountController.deleteAccount)
//Show exisiting Senpai dashboard including skills
router.get('/:userID/skill', accountController.showSkill)
//Senpai add skill
router.post('/:userID/skill', accountController.addSkill)
//Senpai edit skill
router.patch('/:userID/skill/:skillID', accountController.editSkill)
//Senpai delete skill
router.delete('/:userID/skill/:skillID', accountController.deleteSkill)

module.exports = router