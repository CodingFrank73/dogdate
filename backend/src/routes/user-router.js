

// +++ for AWS-Bucket +++
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");
// const dotenv = require('dotenv')

// dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// +++ general +++
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



const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region,
    accessKeyId,
    secretAccessKey
});
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'cf73-test-upload',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    }),
});

// userRouter.use(express.static('public'))

userRouter.post('/upload',
    upload.single('avatar'),
    doAuthMiddleware,
    async (req, res) => {

        try {
            const uploadedFile = req.file.location;
            const userId = req.userClaims.sub;

            const user = await UserService.editAvatar({
                userId: userId,
                profileImage: uploadedFile
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Updating Avatar." })
        }

    });


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
            // console.log("USER-ID:", userId);
            const user = await UserService.showMyProfile({ userId })

            res.status(200).json(user);

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
        }
    })

// TODO: Änderung möglicherweise bei Umstellung auf AWS notwendig
userRouter.post("/myProfile/editAvatar",
    avatarUploadMiddleware,
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const bigPicBas64 = imageBufferToBase64(req.file.buffer, req.file.mimetype)

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

userRouter.post("/myProfile/editBigImage",
    pictureUploadMiddleware,
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const bigPicBas64 = imageBufferToBase64(req.file.buffer, req.file.mimetype)

            const user = await UserService.editBigImage({
                userId: userId,
                bigImage: bigPicBas64
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Updating Big Image." })
        }
    })

userRouter.post("/login",
    // body("email").isEmail(),
    // body("password").isStrongPassword(),
    // doValidation,
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
            res.status(500).json({ err: error.message || "Unknown error in login, try again." })
        }
    })


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
                dateOfBirth: new Date(req.body.dateOfBirth),
                bigImage: bigPicBas64
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message || "Unknown error while registering new user." })
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



userRouter.put("/myProfile/profileEditSettings",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const user = await UserService.editProfileSettings(req.body)

            res.status(200).json({ user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
        }
    })

userRouter.put("/myProfile/editLanguage",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            // console.log("userId aus router userClaims: " + userId, "req.body aus router:", req.body.language)

            const user = await UserService.editLanguage(userId, req.body.language)

            res.status(200).json({ user })
            // console.log("res.json aus route: ", { user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error editing language." })
        }
    })

userRouter.put("/myProfile/editMaxDistance",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            // console.log("userId aus router userClaims: " + userId, "req.body aus router:", req.body.maxDistance)

            const user = await UserService.editMaxDistance(userId, req.body.maxDistance) //##

            res.status(200).json({ user })
            // console.log("res.json aus route: ", { user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error editing max distance." })
        }
    })

userRouter.put("/myProfile/ageRange",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const ageRangeArr = req.body;
            // console.log("TEST AgeRangeArr in Route ", ageRangeArr);
            const user = await UserService.editAgeRange(userId, ageRangeArr)

            res.status(200).json({ user })
            //console.log("res.json aus route: ", { user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error editing age range." })
        }
    })

userRouter.delete("/myProfile/deleteAccount",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const user = await UserService.deleteAccountUser(userId)

            res.status(200).json({ user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error deleting user account." })
        }
    })


// ++++++++++++++++++++ Likes ++++++++++++++++++++++++++

userRouter.get("/showLikes",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const result = await UserService.listAllLikes(userId)

            res.status(200).json(result)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during finding likes." })
        }
    })


userRouter.post("/likeone",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const response = await UserService.likeOne(
                {
                    idUserA: req.userClaims.sub,
                    idUserB: req.body.likedId
                })

            res.status(201).json(response)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during inserting likes." })
        }
    })

userRouter.put("/likeToMatch",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const idUserB = req.userClaims.sub;
            const idUserA = req.body.idUserA;

            const response = await UserService.editLikeToMatch(idUserB, idUserA)

            res.status(200).json(response)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during updating likes and users." })
        }

    })


// ++++++++++++++++++++ Matches ++++++++++++++++++++++++++

userRouter.get("/showMatches",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const result = await UserService.listAllMatches(userId)

            res.status(200).json(result)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during finding likes." })
        }
    })



userRouter.post("/match",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const response = await UserService.likeOneToo(
                {
                    myId: req.userClaims.sub,
                    likedId: req.body.likedId
                })

            res.status(201).json(response)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during inserting likes." })
        }
    })



// ++++++++++++++++++++ Upload-TO-S3-Bucket ++++++++++++++++++++++++++




module.exports = {
    userRouter
}

