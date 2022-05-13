const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");
const { loginUser } = require("./users/login-user");


const UserService = {
    listAllUsers,
    registerUser,
    loginUser
}

module.exports = {
    UserService
}