const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");
const { loginUser } = require("./users/login-user");
const { refreshUserToken } = require("./users/refresh-user-token");
const { showMyProfile } = require("./users/show-profile");
const { editAvatar } = require("./users/edit-avatar")
const { likeOne } = require("./users/like-one");
const { editProfileSettings } = require("./users/edit-profile-settings");


const { listAllSuggestion } = require("./suggestions/list-all-suggestion");
const { listByFilter } = require("./suggestions/list-by-filter");

const UserService = {
    listAllUsers,
    registerUser,
    loginUser,
    refreshUserToken,
    showMyProfile,
    editAvatar,
    likeOne,
    editProfileSettings
}

const SuggestionService = {
    listAllSuggestion,
    listByFilter
}

module.exports = {
    UserService,
    SuggestionService
}