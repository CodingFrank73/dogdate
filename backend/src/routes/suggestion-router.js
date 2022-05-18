const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const { SuggestionService } = require("../use-cases");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const { doValidation } = require("../facade/doValidation");
const { imageBufferToBase64 } = require("../utils/converter");

const suggestionRouter = express.Router();

suggestionRouter.get("/all",
    // doAuthMiddleware,
    async (req, res) => {
        console.log("ID in router:", req.body.id);

        try {
            const users = await SuggestionService.listAllSuggestion({
                id: req.body.id
            })

            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading users" })
        }
    })

suggestionRouter.get("/allwithfilter",
    // doAuthMiddleware,
    async (req, res) => {



        try {
            const users = await SuggestionService.listByFilter({
                maxDistance: req.body.maxDistance,
                gender: req.body.gender,
                minAge: req.body.minAge,
                maxAge: req.body.maxAge
            })

            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading users" })
        }
    })



module.exports = {
    suggestionRouter
}
