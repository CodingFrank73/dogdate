
const { SuggestionDAO } = require("../../db-access")
const AgeCalc = require("../../utils/ageCalc");

const listSuggestionByTempFilter = async ({ _id, maxDistance, filterGender, ageRange, filterSize, match }) => {

    const minAgeAsDate = AgeCalc.subtractYears(ageRange[0])
    const maxAgeAsDate = AgeCalc.subtractYears(ageRange[1])

    const users = await SuggestionDAO.findAllByFilter({ _id, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match })

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        bigImage: u.bigImage,
        profileImage: u.profileImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        location: u.location
    }))

    return listOfUsers
}

module.exports = {
    listSuggestionByTempFilter
}