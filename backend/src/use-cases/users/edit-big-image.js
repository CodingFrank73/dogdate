const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editBigImage( {userId, bigImage} ) {
   
    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user", user.dogName, userId)
   
    const insertResult = await UserDAO.updateBigImage({userId, bigImage});
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount === 1
    if(!wasSuccessful) {
        throw new Error("Updating BigImage failed, please try again.")
    }
      
    return user
}


module.exports = {
    editBigImage
}