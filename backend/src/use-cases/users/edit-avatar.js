const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editAvatar( {userId, profileImage} ) {
    console.log("UserId from usecase", userId)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user", user.dogName)
   
    const insertResult = await UserDAO.updateAvatar({userId, profileImage}); ///#####////
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
    if(!wasSuccessful) {
        throw new Error("Updating Avatar failed, please try again.")
    }
    console.log("insertResult aus usecase", insertResult);
   
    console.log("User aus useCase: ", user.dogName);
    return user
}


module.exports = {
    editAvatar
}