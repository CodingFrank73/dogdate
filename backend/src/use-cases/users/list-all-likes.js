const { ObjectId } = require("mongodb");
const { UserDAO } = require("../../db-access")

const listAllLikes = async (userId) => {

    // find all likes where I was liked => My Id is in field: idILiked
    const tempUserIdsArr = await UserDAO.findUserIDsWholikeMe(userId);

    // generate an Array with all needed fields
    const likes = await UserDAO.findByIdList(tempUserIdsArr)

    return likes

}

module.exports = {
    listAllLikes
}