const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {

    const foundLikes = await UserDAO.findLikesById(userId);
    console.log("FoundLikes: ", foundLikes);

    const userWhoLikesMe = foundLikes.map(like => like.myId)
    console.log("userWhoLikesMe: ", userWhoLikesMe);

    const usersList = await UserDAO.findByIdList(userWhoLikesMe)

    const listOfUsersWhoLikesMe = usersList.map(u => ({
        _id: u._id,
        bigImage: u.bigImage,
        dogName: u.dogName,
        gender: u.gender
    }))
    console.log(listOfUsersWhoLikesMe);

    return listOfUsersWhoLikesMe
}

module.exports = {
    listAllLikes
}