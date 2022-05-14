const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function showMyProfile({ userId }) {
    const result = await UserDAO.findById(userId);
    if (!result) {
        throw new Error("Not profile exists...")
    }

    const user = makeUser(result);

    return user
}

module.exports = {
    showMyProfile
}