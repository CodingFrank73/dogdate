const express = require("express");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const {
    getSuggestionsByFilter,
    getSuggestionsByTempFilter
} = require("../use-cases/controller/suggestionsController")

const suggestionRouter = express.Router();

// GET all likes for a current user
suggestionRouter.get('/getSuggestionsByFilter', doAuthMiddleware, getSuggestionsByFilter)

suggestionRouter.get('/getSuggestionsByTempFilter', doAuthMiddleware, getSuggestionsByTempFilter)


module.exports = {
    suggestionRouter
}
