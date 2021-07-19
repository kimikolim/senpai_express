const mongoose = require("mongoose");
const { EnumMainCategories, EnumSubCategories } = require('./choices')


//Sub categories

const skillSchema = new mongoose.Schema({
	mainCategory: { type: String, enum: EnumMainCategories },
	subCategory: { type: String, enum: EnumSubCategories },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
	tags: {type: [String], required: true},
	comments: String
});

const SkillsModel = mongoose.model("SkillsModel", skillSchema);

module.exports = { SkillsModel: SkillsModel };
