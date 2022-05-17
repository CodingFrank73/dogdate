
const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const { UserService } = require("../use-cases");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const { doValidation } = require("../facade/doValidation");
const { imageBufferToBase64 } = require("../utils/converter");

const userRouter = express.Router();
const pictureUploadMiddleware = multer().single("bigImage")
const avatarUploadMiddleware = multer().single("profileImage")

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

userRouter.get("/single/:id",
    async (req, res) => {
        try {

        } catch (error) {

        }
    })

userRouter.get("/myProfile",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            console.log("USER-ID:", userId);
            const user = await UserService.showMyProfile({ userId })

            res.status(200).json(user);

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
        }
    })

userRouter.post("/myProfile/editAvatar",
    avatarUploadMiddleware,
    doAuthMiddleware,
    async (req, res) => {
        console.log("Hier ist ein Test:", req.file);

        try {
            const userId = req.userClaims.sub;
            const bigPicBas64 = imageBufferToBase64(req.file.buffer, req.file.mimetype)
            console.log("userId aus route", userId) //klappt

            const user = await UserService.editAvatar({
                userId: userId,
                profileImage: bigPicBas64
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Updating Avatar." })
        }
    })
///#####////
userRouter.post("/login",
    body("email").isEmail(),
    doValidation,
    async (req, res) => {

        console.log(req.headers);
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

///####////

userRouter.post("/register",
    pictureUploadMiddleware,
    body("dogName").isString().isLength({ min: 2, max: 20 }),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    doValidation,
    async (req, res) => {

        try {
            const bigPicBas64 = imageBufferToBase64(req.file.buffer, req.file.mimetype)
            const user = await UserService.registerUser({
                dogName: req.body.dogName,
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender,
                size: req.body.size,
                dateOfBirth: req.body.dateOfBirth,
                bigImage: bigPicBas64
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Unknown error while registering new user." })
        }
    })

userRouter.post("/refreshtoken",
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



























// ++++++++++++++++++++ Frank ++++++++++++++++++++++++++

userRouter.post("/like",
    async (req, res) => {

        try {
            const response = await UserService.likeOne(
                {
                    // myId: req.userClaims.sub,
                    myId: req.body.myId,
                    likedId: req.body.likedId
                })

            res.status(201).json(response)

        } catch (error) {

        }
    })

module.exports = {
    userRouter
}

