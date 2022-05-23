const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {

    const foundLikes = await UserDAO.findLikesById(userId);

    const userWhoLikesMe = foundLikes.map(like => like.myId)

    const usersList = await UserDAO.findByIdList(userWhoLikesMe)

    const listOfUsersWhoLikesMe = usersList.map(u => ({
        _id: u._id,
        bigImage: u.bigImage,
        dogName: u.dogName,
        gender: u.gender
    }))

    return listOfUsersWhoLikesMe
}

module.exports = {
    listAllLikes
}