const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function deleteAccountUser(userId) {
    console.log("UserId from usecase", userId)

     const foundUser = await UserDAO.findById(userId)
     if (!foundUser) {
         throw ({message: "user with id "+  userId + " not found" })
     }
     const user = makeUser(foundUser)
     console.log("use case, user:", user.dogName)
   
     const insertResult = await UserDAO.deleteUser(userId); //##
     const wasSuccessful = await insertResult.acknowledged === true
     if(!wasSuccessful) {
         throw new Error("Deleteing user failed, please try again.")
     }
     console.log("insertResult aus usecase", insertResult);
   
     return user
}


module.exports = {
    deleteAccountUser
}