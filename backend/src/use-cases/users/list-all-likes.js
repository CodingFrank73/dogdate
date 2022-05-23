const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {

    const foundLikes = await UserDAO.findLikesById(userId);

    console.log("FoundUser: ", foundLikes);

    // const listOfUsers = users.map(u => ({
    //     _id: u._id,
    //     dogName: u.dogName,
    //     gender: u.gender,
    //     email: u.email,


    // }))

    return foundLikes
}

module.exports = {
    listAllLikes
}