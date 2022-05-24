
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const AgeCalc = require("../../utils/ageCalc");

const listSuggestionByDefaultFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)

    const { maxDistance, filterGender, ageRange, filterSize, _id, match } = user

    const minAgeAsDate = AgeCalc.subtractYears(ageRange[0])
    const maxAgeAsDate = AgeCalc.subtractYears(ageRange[1])

    const users = await SuggestionDAO.findAllByFilter({ _id, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match })

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        // bigImage: u.bigImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        maxDistance: u.maxDistance,
    }))

    return ({ listOfUsers, foundUser })
}

module.exports = {
    listSuggestionByDefaultFilter
}