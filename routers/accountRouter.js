const express = require('express')
const router = express.Router()
const accountController = require('../controller/account_controller')

//Individual user dashboard
router.get('/:userID', accountController.userAccount)
//User update details
router.patch('/:userID', accountController.userUpdate)
//User delete account
router.delete('/:userID', accountController.deleteAccount)
//Show exisiting Senpai skills
router.get('/:userID', accountController.showSkill)
//Senpai add skill
router.post('/:userID', accountController.addSkill)
//Senpai edit skill
router.patch('/:userID', accountController.editSkill)
//Senpai delete skill
router.delete('/:userID', accountController.deleteSkill)

module.exports = router