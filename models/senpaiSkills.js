const mongoose = require("mongoose");
const { EnumMainCategories, EnumSubCategories } = require('./choices')


//Senpai update skills schema

const skillSchema = new mongoose.Schema({
	mainCategory: { type: String, enum: EnumMainCategories },
	subCategory: { type: String, enum: EnumSubCategories },
	tags: {type: [String]},
	rate: {type: Number},
	experience: {type: Number},
	comments: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "UserModel"
	},
});

const SkillsModel = mongoose.model("SkillsModel", skillSchema);

module.exports = { SkillsModel: SkillsModel };
