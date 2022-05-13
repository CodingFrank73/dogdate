const jwt = require("jsonwebtoken");
const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");
const { createToken } = require("../../utils/security");

async function refreshUserToken({ refreshToken }) {
    try {
        const tokenPayload = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const isRefreshToken = tokenPayload.type === "refresh";
        if (!isRefreshToken) { throw new Error("not found") };

        const userId = tokenPayload.sub;

        const foundUser = await UserDAO.findById(userId);
        if (!foundUser) { throw new Error("Not found") };

        const user = makeUser(foundUser);

        const token = createToken(user, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))
        return { token }

    } catch (error) {
        console.log(error);
        throw new Error("Not found")
    }
}

module.exports = {
    refreshUserToken
}