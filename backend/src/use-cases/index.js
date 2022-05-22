const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");
const { loginUser } = require("./users/login-user");
const { refreshUserToken } = require("./users/refresh-user-token");
const { showMyProfile } = require("./users/show-profile");
const { editAvatar } = require("./users/edit-avatar")
const { likeOne } = require("./users/like-one");
const { editProfileSettings } = require("./users/edit-profile-settings");
const { editLanguage } = require("./users/edit-language")
const { editMaxDistance } = require("./users/edit-max-distance")
const { editAgeRange } = require("./users/edit-age-range")
const { deleteAccountUser } = require("./users/delete-account");
const { editBigImage } = require("./users/edit-big-image")


const { listAllSuggestion } = require("./suggestions/list-all-suggestion");
const { listSuggestionByDefaultFilter } = require("./suggestions/list-suggestion-by-default-filter");
const { listSuggestionByTempFilter } = require("./suggestions/list-suggestion-by-temp-filter");

const UserService = {
    listAllUsers,
    registerUser,
    loginUser,
    refreshUserToken,
    showMyProfile,
    editAvatar,
    likeOne,
    editProfileSettings,
    editLanguage,
    editMaxDistance,
    editAgeRange,
    deleteAccountUser,
    editBigImage
}

const SuggestionService = {
    listAllSuggestion,
    listSuggestionByDefaultFilter,
    listSuggestionByTempFilter
}

module.exports = {
    UserService,
    SuggestionService
}