const mongoose = require('mongoose')

const schema = new mongoose.Schema({})

const SenpaiModel = mongoose.model('Senpai', schema)

module.exports = { SenpaiModel: SenpaiModel }