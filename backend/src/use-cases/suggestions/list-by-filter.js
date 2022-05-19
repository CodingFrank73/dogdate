const { SuggestionDAO } = require("../../db-access")

const listByFilter = async ({ maxDistance, filterGender, filterSize, age }) => {

    const minAgeAsDate = subtractYears(age[0])
    const maxAgeAsDate = subtractYears(age[1])

    const users = await SuggestionDAO.findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate })

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        gender: u.gender,
        size: u.size,
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