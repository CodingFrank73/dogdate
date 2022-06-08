const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {
    // find Data based on UserId and create an User
    // const foundUser = await UserDAO.findByIdForProfileImage(userId)
    const foundUser = await UserDAO.findById(userId)

    const foundLikes = await UserDAO.findLikesById(userId);

    const userWhoLikesMe = foundLikes.map(like => like.myId)

    const usersList = await UserDAO.findByIdList(userWhoLikesMe)

    const listOfUsersWhoLikesMe = usersList.map(u => ({
        _id: u._id,
        bigImage: u.bigImage,
        profileImage: u.profileImage,
        dogName: u.dogName,
        gender: u.gender,
        myImage: foundUser.profileImage
    }))
    console.log(listOfUsersWhoLikesMe);

    return listOfUsersWhoLikesMe
}

module.exports = {
    listAllLikes
}