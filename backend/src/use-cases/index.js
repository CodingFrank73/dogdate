const { listAllUsers } = require("./users/list-all-users");
const { registerUser } = require("./users/register-user");
const { loginUser } = require("./users/login-user");
const { refreshUserToken } = require("./users/refresh-user-token");
const { showMyProfile } = require("./users/show-profile");
const { editAvatar } = require("./users/edit-avatar")
const { listAllLikes } = require("./users/list-all-likes");
const { listAllChats } = require("./users/list-all-chats");
const { editLikeToMatch } = require("./users/edit-like-to-match");
const { likeOne } = require("./users/like-one");
const { editProfileSettings } = require("./users/edit-profile-settings");
const { editSettingsDiscovery } = require("./users/edit-settings-discovery");
const { editLanguage } = require("./users/edit-language")
const { editMaxDistance } = require("./users/edit-max-distance")
const { editAgeRange } = require("./users/edit-age-range")
const { deleteAccountUser } = require("./users/delete-account");
const { editImageMain } = require("./users/edit-image-main")


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
    editLikeToMatch,
    listAllLikes,
    listAllChats,
    likeOne,
    editProfileSettings,
    editSettingsDiscovery,
    editLanguage,
    editMaxDistance,
    editAgeRange,
    deleteAccountUser,
    editImageMain
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