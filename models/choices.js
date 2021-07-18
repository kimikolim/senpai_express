const GenderMale = 'm'
const GenderFemale = 'f'
const EnumUserGender = [GenderMale, GenderFemale]

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

//sub categories
//Fitness => gym, yoga, sports
//Academic => language, computer science, school subjects
//Arts => music, dance, design, diy
//Cook => cuisine, baking, barista, bartender
const EnumSubCategories = [ 'gym', 'yoga', 'sports', 'language', 'computer science', 'school subjects', 'music', 'dance', 'design', 'diy', 'cuisine',
'baking', 'barista', 'bartender', 'others']


module.exports = {
    EnumUserGender: EnumUserGender,
    EnumMainCategories: EnumMainCategories,
	EnumSubCategories: EnumSubCategories,
}