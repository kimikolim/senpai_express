const express = require('express')
const router = express.Router()
const accountController = require('../controller/account_controller')

//Individual user dashboard
router.get('/:userID/profile', accountController.userAccount)
//User update details
router.patch('/:userID/profile', accountController.userUpdate)
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