const mongoose = require("mongoose");
const { EnumMainCategories, EnumSubCategories } = require('./choices')


//Senpai update skills schema

const skillSchema = new mongoose.Schema({
	mainCategory: { type: String, enum: EnumMainCategories },
	subCategory: { type: String, enum: EnumSubCategories },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
	tags: {type: [String], required: true},
	rate: {type: Number, required: true},
	experience: {type: Number, required: true},
	comments: String,
});

const SkillsModel = mongoose.model("SkillsModel", skillSchema);

module.exports = { SkillsModel: SkillsModel };
