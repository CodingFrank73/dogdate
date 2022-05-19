const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editAgeRange( userId, ageRange ) {
    console.log("UserId from usecase", userId, ageRange)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user:", user.dogName)
   
    const insertResult = await UserDAO.updateAgeRange({userId, ageRange}); //##
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount === 1
    if(!wasSuccessful) {
        throw new Error("Updating ageRange failed, please try again.")
    }
    console.log("insertResult aus usecase", insertResult);
   
    return user
}


module.exports = {
    editAgeRange
}