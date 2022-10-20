const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");
const hash = require("../../utils/security");

async function loginUser({ email, password }) {

    const invalidLoginMessage = "Login failed";

    const result = await UserDAO.findByEmail(email);

    if (!result) {
        throw new Error(invalidLoginMessage);
    }

    const user = makeUser(result);
    const passwordHash = hash.createHashedPasswort(password, user.salt);
    const isValidPasswort = user.pwHash === passwordHash;

    if (!isValidPasswort) {
        throw new Error(invalidLoginMessage);
    }

    const token = hash.createToken(user, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))
    const refreshToken = hash.createToken(user, "refresh", Number(process.env.LIFETIME_TOKEN_REFRESH))

    return { token, refreshToken, currentUser: user, profileImage: user.profileImage, }
}

module.exports = {
    loginUser
}