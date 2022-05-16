const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editAvatar( {userId, profileImage} ) {
    console.log("UserId from usecase", userId)
    console.log("profileImage aus usecase", profileImage)
    const updatedUser = await UserDAO.updateAvatar({userId, profileImage}); ///#####////
    if (!updatedUser) {
        throw new Error("Not profile exists...")
    }
    console.log("Updated user aus usecase", updatedUser);
    const user = makeUser(updatedUser);

    return user
}

module.exports = {
    editAvatar
}