const express = require('express')
const router = express.Router()
const senpaiController = require('../controller/senpai_controller')

//Find senpais in the 4 main categories
router.get('/catalog/:category', senpaiController.senpaiList) //req.params.category
//Individial Senpai profiles
router.get('/profile/:userID', senpaiController.senpaiProfile)




module.exports = router