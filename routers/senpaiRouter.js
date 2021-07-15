const express = require('express')
const router = express.Router()
const senpaiController = require('../controller/senpai_controller')

//Find senpai routes
router.get('/', senpaiController.senpaiList)
router.get('/:id', senpaiController.senpaiProfile)


module.exports = router