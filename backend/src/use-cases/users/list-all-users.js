
const { UserDAO } = require("../../db-access")

const listAllUsers = async () => {
    const users = await UserDAO.findAll();
    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        gender: u.gender,
        // isAdmin: u.isAdmin,
        // userEmail: u.userEmail,
        // passwordHash: u.passwordHash,
        // passwordSalt: u.passwordSalt,
        // status: u.status,
        // addDate: u.addDate,
        // modifiedDate: u.modifiedDate
    }))

    return listOfUsers
}


module.exports = {
    listAllUsers
}