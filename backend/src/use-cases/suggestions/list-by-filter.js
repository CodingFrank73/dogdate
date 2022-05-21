
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const AgeCalc = require("../../utils/ageCalc");

const listByFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)

    const { maxDistance, filterGender, ageRange, filterSize } = user

    const minAgeAsDate = subtractYears(ageRange[0])
    const maxAgeAsDate = subtractYears(ageRange[1])

    console.log("minAgeAsDate in listByFilter:", minAgeAsDate);
    console.log("maxAgeAsDate in listByFilter:", maxAgeAsDate);

    const users = await SuggestionDAO.findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate })

    // console.log("users:", users);

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        // bigImage: u.bigImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        maxDistance: u.maxDistance,
    }))
    // console.log("listOfUsers", listOfUsers);
    return ({ listOfUsers, foundUser })
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

module.exports = {
    listByFilter
}