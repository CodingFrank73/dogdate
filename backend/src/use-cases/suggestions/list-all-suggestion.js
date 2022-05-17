const { SuggestionDAO } = require("../../db-access")

const listAllSuggestion = async (id) => {
    const users = await SuggestionDAO.findAllExcept(id)
    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        // bigImage: u.bigImage,
        age: getAge(u.dateOfBirth),
        km: u.km
    }))

    return listOfUsers
}

function getAge(dateOfBirth) {
    const ageDiffinMS = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(ageDiffinMS);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


module.exports = {
    listAllSuggestion
}