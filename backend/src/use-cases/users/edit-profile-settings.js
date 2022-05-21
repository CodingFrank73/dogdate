const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editProfileSettings({ userId, ...updatedInfo }) {
    console.log("UpdatedInfo from usecase", updatedInfo, "userId: ", userId)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({ message: "user with id " + userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("usecase, user", user.dogName)

    const insertResult = await UserDAO.update(user._id, updatedInfo); ///#####////
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
    if (!wasSuccessful) {
        throw new Error("Editing profile failed, please try again.")
    }
    console.log("insertResult aus usecase", insertResult);

    console.log("User aus useCase: ", user.dogName);
    return user
}


module.exports = {
    editProfileSettings
}