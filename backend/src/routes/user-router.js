
const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const { UserService } = require("../use-cases");

const userRouter = express.Router();

userRouter.get("/all",
    async (req, res) => {

        try {

        } catch (error) {

        }
    })

userRouter.get("/singe/:id",
    async (req, res) => {
        try {

        } catch (error) {

        }
    })

userRouter.post("/login",

    async (req, res) => {
        try {
            const result = await UserService.loginUser({
                email: req.body.email,
                password: req.body.password
            })

            if (result.refreshToken) {
                req.session.refreshToken = result.refreshToken;
            }

            res.status(200).json(result);

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Unknown error while login user." })
        }
    })

userRouter.post("/register",

    async (req, res) => {
        try {
            const user = await UserService.registerUser({
                email: req.body.email,
                dogName: req.body.dogName,
                password: req.body.password,
                gender: req.body.gender,
                size: req.body.size,
                bigImage: req.body.bigImage,
                dateOfBirth: req.body.dateOfBirth
            })

            res.status(200).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Unknown error while registering new user." })
        }
    })

userRouter.post("/refreshToken",

    async (req, res) => {
        try {
            const result = await UserService.refreshUserToken({
                refreshToken: req.session.refreshToken || req.body.refreshToken
            })

            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ err: { message: error.message } })
        }
    })

module.exports = {
    userRouter
}

    // userRouter.was auch immer für einen like/match funktion