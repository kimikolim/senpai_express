const mongoose = require('mongoose')
const { EnumUserGender } = require('./choices')


const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    hash: {type:String, required: true},
    mobile: {type:String, required: true},
    gender: {type:String, required: true, enum: EnumUserGender},
    age: {type: Number, required: true, min: 0},
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillsModel' }],
    selectedFile: String, //convert image into string using base64
}, {timestamp:true})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = {
    UserModel: UserModel,
    GenderMale,
    GenderFemale,
    EnumUserGender,
}
