
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")

const listByFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)

    const { maxDistance, filterGender, ageRange, filterSize } = user



    const minAgeAsDate = subtractYears(ageRange[0])
    const maxAgeAsDate = subtractYears(ageRange[1])

    const users = await SuggestionDAO.findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate })

    const listOfUsers = users.map(u => ({
        _id: u._id,
        bigImage: u.bigImage,
        age: getAgeByYear(u.dateOfBirth),
        maxDistance: u.maxDistance
    }))

    return listOfUsers
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

const getAgeByYear = (dateOfBirth) => {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();
    return (currentYear - birthYear)
}

module.exports = {
    listByFilter
}