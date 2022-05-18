const { SuggestionDAO } = require("../../db-access")

const listByFilter = async ({ maxDistance, gender, minAge, maxAge }) => {

    const minAgeAsDate = subtractYears(minAge)
    const maxAgeAsDate = subtractYears(maxAge)

    const users = await SuggestionDAO.findAllByFilter({ maxDistance, gender, minAgeAsDate, maxAgeAsDate })

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        gender: u.gender,
        // bigImage: u.bigImage,
        age: getAgeByYear(u.dateOfBirth),
        dateOfBirth: u.dateOfBirth,
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