const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {

    // find all likes where I was liked => My Id is in field: idILiked
    const foundLikes = await UserDAO.findLikes(userId);

    // generate an list of id's from the users who likes me
    const userWhoLikesMe = foundLikes.map(like => like.myId)

    // generate an UsersList with all fields
    const listOfUsersWithEntireDataset = await UserDAO.findByIdList(userWhoLikesMe)

    // seperate the specific fields
    const listOfUsersWhoLikesMe = listOfUsersWithEntireDataset.map(u => ({
        _id: u._id,
        bigImage: u.bigImage,
        dogName: u.dogName,
        gender: u.gender,
    }))

    return listOfUsersWhoLikesMe
}

module.exports = {
    listAllLikes
}