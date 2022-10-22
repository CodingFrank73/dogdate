

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

// Route für den AWS Upload und das Speichern des Bildpfads in MongoDB. --- PROFILE IMAGE --- 
userRouter.post('/myProfile/editImageProfile',
    upload.single('image'),
    doAuthMiddleware,
    async (req, res) => {

        try {
            const s3FilePath = req.file.location;
            const userId = req.userClaims.sub;

            const user = await UserService.editAvatar({
                userId: userId,
                profileImage: s3FilePath
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during updating ProfileImage" })
        }
    });

// Route für den AWS Upload und das Speichern des Bildpfads in MongoDB. --- MAIN IMAGE --- 
userRouter.post('/myProfile/editImageMain',
    upload.single('image'),
    doAuthMiddleware,
    async (req, res) => {

        try {
            const s3FilePath = req.file.location;
            const userId = req.userClaims.sub;

            const user = await UserService.editImageMain({
                userId: userId,
                bigImage: s3FilePath
            })

            res.status(201).json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during updating MainImage" })
        }
    });

userRouter.put("/myProfile/profileEditSettings",
    doAuthMiddleware,
    async (req, res) => {

        try {
            // const userId = req.userClaims.sub;
            const user = await UserService.editProfileSettings(req.body)

            res.status(200).json({ user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
        }
    })

userRouter.put("/myProfile/editSettingsDiscovery",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const user = await UserService.editSettingsDiscovery(req.body)

            res.status(200).json({ user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
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



// ----------------------------------------------------------------------------------------------


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
            res.status(500).json({ err: error.message || "Unknown error in login, try again." })
        }
    })

userRouter.post("/register",
    upload.single('image'),
    body("dogName").isString().isLength({ min: 2, max: 20 }),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    doValidation,
    async (req, res) => {

        try {
            const s3FilePath = req.file.location;
            const user = await UserService.registerUser({
                dogName: req.body.dogName,
                location: req.body.location,
                postalCode: req.body.postalCode,
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender,
                size: req.body.size,
                dateOfBirth: new Date(req.body.dateOfBirth),
                profileImage: s3FilePath
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

// kann gelöscht werden
// userRouter.put("/myProfile/editLanguage",
//     doAuthMiddleware,
//     async (req, res) => {

//         try {
//             const userId = req.userClaims.sub;
//             const user = await UserService.editLanguage(userId, req.body.language)

//             res.status(200).json({ user })

//         } catch (error) {
//             console.log(error)
//             res.status(500).json({ err: error.message || "Error editing language." })
//         }
//     })

// kann gelöscht werden
// userRouter.put("/myProfile/editMaxDistance",
//     doAuthMiddleware,
//     async (req, res) => {

//         try {
//             const userId = req.userClaims.sub;
//             const user = await UserService.editMaxDistance(userId, req.body.maxDistance) //##

//             res.status(200).json({ user })
//             // console.log("res.json aus route: ", { user })

//         } catch (error) {
//             console.log(error)
//             res.status(500).json({ err: error.message || "Error editing max distance." })
//         }
//     })

// kann gelöscht werden
// userRouter.put("/myProfile/ageRange",
//     doAuthMiddleware,
//     async (req, res) => {

//         try {
//             const userId = req.userClaims.sub;
//             const ageRangeArr = req.body;
//             const user = await UserService.editAgeRange(userId, ageRangeArr)

//             res.status(200).json({ user })

//         } catch (error) {
//             console.log(error)
//             res.status(500).json({ err: error.message || "Error editing age range." })
//         }
//     })




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


userRouter.get("/showChats",
    doAuthMiddleware,
    async (req, res) => {

        try {
            const userId = req.userClaims.sub;
            const result = await UserService.listAllChats(userId)

            res.status(200).json(result)

        } catch (error) {
            console.log(error)
            res.status(500).json({ err: error.message || "Error during finding likes." })
        }
    })

module.exports = {
    userRouter
}

