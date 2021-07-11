const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    hash: {type:String, required: true},
}, {timestamp:true})

const UserModel = mongoose.model('User', schema)

module.exports = { UserModel: UserModel }
