const { ObjectId } = require("mongodb");
const { UserDAO } = require("../../db-access")

const listAllMatches = async (userId) => {
    console.log("USERID IN ShowMatch:", userId);
    const foundUser = await UserDAO.findById(userId);


    // Finde alle ID im Array Match in der UserCollection
    // const exIDs = [...match, _id].map(id => ObjectId(id.toString()))
    const exIDs = foundUser.match.map(id => new ObjectId(id.match))

    console.log("FoundMatchesID: ", exIDs);

    // const userWhoLikesMe = foundLikes.map(like => like.myId)
    // console.log("userWhoLikesMe: ", userWhoLikesMe);

    // const usersList = await UserDAO.findByIdList(userWhoLikesMe)

    // const listOfUsersWhoLikesMe = usersList.map(u => ({
    //     _id: u._id,
    //     bigImage: u.bigImage,
    //     dogName: u.dogName,
    //     gender: u.gender
    // }))
    // console.log(listOfUsersWhoLikesMe);

    return foundUser
}

module.exports = {
    listAllMatches
}