const express = require("express");
const { SuggestionService } = require("../use-cases");
const { doAuthMiddleware } = require("../auth/auth-middleware");

const suggestionRouter = express.Router();

suggestionRouter.get("/all",
    // doAuthMiddleware,
    async (req, res) => {

        try {
            const users = await SuggestionService.listAllSuggestion({
                id: req.userClaims.sub
            })

            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading users" })
        }
    })

suggestionRouter.get("/allwithfilter",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const result = await SuggestionService.listSuggestionByDefaultFilter({
                userId: req.userClaims.sub
            })

            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading suggestions" })
        }
    })

suggestionRouter.post("/withTempFilter",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const suggestions = await SuggestionService.listSuggestionByTempFilter({
                _id: req.userClaims.sub,
                match: req.body.match,
                ageRange: req.body.ageRange,
                postalCode: req.body.postalCode,
                maxDistance: req.body.maxDistance,
                filterGender: req.body.gender,
                filterSize: req.body.size
            })

            res.status(200).json(suggestions);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading suggestions" })
        }
    })



module.exports = {
    suggestionRouter
}
