const mongoose = require('mongoose')

const GenderMale = 'm'
const GenderFemale = 'f'
const EnumUserGender = [GenderMale, GenderFemale]

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    hash: {type:String, required: true},
    mobile: {type:String, required: true},
    gender: {type:String, required: true, enum: EnumUserGender},
    age: {type: Number, required: true, min: 0},
    selectedFile: String,
}, {timestamp:true})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = {
    UserModel: UserModel,
    GenderMale,
    GenderFemale,
    EnumUserGender,
}
