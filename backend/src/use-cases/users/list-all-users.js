
const { UserDAO } = require("../../db-access")

const listAllUsers = async () => {
    const users = await UserDAO.findAll();
    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        gender: u.gender
        email: u.email,
        // phone: u.phone,
        // size: u.size,
        // pwHash: u.pwHash,
        // salt: u.salt,
        // plan: u.plan,
        // location: u.location,
        // language: u.language,
        // filterGender: u.filterGender,
        // filterSize: u.filterSize,
        // postalCode: u.postalCode,
        // dateOfBirth: u.dateOfBirth,
        // ageRange: u.ageRange,
        // maxDistance: u.maxDistance

    }))

    return listOfUsers
}


module.exports = {
    listAllUsers
}