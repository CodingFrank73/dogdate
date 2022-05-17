const { SuggestionDAO } = require("../../db-access")

const listByFilter = async () => {


    const minAge = subtractYears(2)
    const maxAge = subtractYears(10)

    const users = await SuggestionDAO.findAllByFilter(2, minAge, maxAge, "m")
    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        // bigImage: u.bigImage,
        age: getAge(u.dateOfBirth),
        km: u.km
    }))

    return listOfUsers
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);

    console.log(date);
    return date;
}

// return ({ minAge, maxAge })





//     const users = await SuggestionDAO.findAllExcept(id)
//     const listOfUsers = users.map(u => ({
//         _id: u._id,
//         dogName: u.dogName,
//         // bigImage: u.bigImage,
//         age: getAge(u.dateOfBirth),
//         km: u.km
//     }))

//     return listOfUsers
// }

function getAge(dateOfBirth) {
    const ageDiffinMS = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(ageDiffinMS);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


module.exports = {
    listByFilter
}