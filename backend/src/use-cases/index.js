const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");


const UserService = {
    listAllUsers,
    registerUser
}

module.exports = {
    UserService
}