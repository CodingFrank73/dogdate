const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");
const { loginUser } = require("./users/login-user");
const { refreshUserToken } = require("./users/refresh-user-token");
const { showMyProfile } = require("./users/show-profile");
const { likeOne } = require("./users/like-one");

const UserService = {
    listAllUsers,
    registerUser,
    loginUser,
    refreshUserToken,
    showMyProfile,
    likeOne
}

module.exports = {
    UserService
}