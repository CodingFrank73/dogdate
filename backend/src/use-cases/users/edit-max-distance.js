const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editMaxDistance( userId, maxDistance ) {
    console.log("UserId from usecase", userId, maxDistance)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user:", user.dogName)
   
    const insertResult = await UserDAO.updateMaxDistance({userId, maxDistance}); //##
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
    if(!wasSuccessful) {
        throw new Error("Updating maxDistance failed, please try again.")
    }
    console.log("insertResult aus usecase", insertResult);
   
    return user
}


module.exports = {
    editMaxDistance
}