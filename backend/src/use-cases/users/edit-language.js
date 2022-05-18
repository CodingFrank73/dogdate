const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editLanguage( userId, language ) {
    console.log("UserId from usecase", userId, language)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user:", user.dogName)
   
    const insertResult = await UserDAO.updateLanguage({userId, language}); 
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
    if(!wasSuccessful) {
        throw new Error("Updating language failed, please try again.")
    }
    console.log("insertResult aus usecase", insertResult);
   
    return user
}


module.exports = {
    editLanguage
}