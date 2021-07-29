//Gender
const GenderMale = 'M'
const GenderFemale = 'F'
const EnumUserGender = [GenderMale, GenderFemale]

//4 main categories
const EnumMainCategories = ['fitness', 'academic', 'arts&crafts', 'cooking&baking'];

//sub categories
//Fitness => gym, yoga, sports
const fitnessSub = ['gym', 'yoga', 'sports']
//Academic => language, computer science, school subjects
const academicSub = ['languages', 'computer science', 'school subjects']
//Arts => instruments, sing/dance, design & crafts
const artSub = ['instruments', 'sing/dance', 'design and crafts']
//Cook => cuisine, baking, mixology
const cookSub = ['cuisine', 'baking', 'mixology']

const EnumSubCategories = [ ...fitnessSub, ...academicSub, ...artSub, ...cookSub, 'others']

//senpai 1

//fitness => gym, sports => HIIT, basketball, circuit

//senpai 2

//fitness => gym => bodybuilding, crossfit
module.exports = {
    EnumUserGender: EnumUserGender,
    EnumMainCategories: EnumMainCategories,
	EnumSubCategories: EnumSubCategories,
    fitnessSub,
    academicSub,
    artSub,
    cookSub
}