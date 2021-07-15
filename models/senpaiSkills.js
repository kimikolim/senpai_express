const mongoose = require("mongoose");

//4 main categories
const FitnessCategory = "Fitness";
const AcademicCategory = "Academia";
const ArtsCategory = "Arts & crafts";
const CookCategory = "Cooking & Baking";
const EnumMainCategories = [
	FitnessCategory,
	AcademicCategory,
	ArtsCategory,
	CookCategory,
];

//Sub categories

const skillSchema = new mongoose.Schema({
	mainCategory: { type: String, unique: true, enum: EnumMainCategories },
	subCategory: { type: String, enum: EnumSubCategories },
	tags: [String],
});

const SkillsModel = mongoose.model("SkillsModel", skillSchema);

module.exports = { SkillsModel: SkillsModel };
