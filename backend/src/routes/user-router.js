
const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const { UserService } = require("../use-cases");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const { doValidation } = require("../facade/doValidation");

const userRouter = express.Router();

userRouter.get("/all",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const users = await UserService.listAllUsers();


            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ err: error.message || "Unknown error while reading users" })
        }
    })

userRouter.get("/singe/:id",
    async (req, res) => {
        try {

        } catch (error) {

        }
    })

userRouter.get("myProfile",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const user = await UserService.showMyProfile({ userId })

            res.status(200).json(user);

        } catch (error) {
            console.log(err)
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading your profile." } })
        }
    })

userRouter.post("/login",
    body("email").isEmail(),
    doValidation,
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
    body("email").isEmail(),
    body("dogName").isString().isLength({ min: 2, max: 20 }),
    body("password").isStrongPassword(),
    doValidation,
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