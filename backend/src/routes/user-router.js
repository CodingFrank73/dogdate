
const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const { doValidation } = require("../facade/doValidation");
const { upload } = require("../utils/awsS3")

const {
    getCurrentUserByID,
    getUsers,
    deleteAccount,
    login,
    updateMainImage,
    updateProfileImage,
    updateUserSettings,
    refreshToken,
    register
} = require("../use-cases/controller/userController")

const userRouter = express.Router();


userRouter.get("/myProfile", doAuthMiddleware, getCurrentUserByID)

userRouter.get("/all", doAuthMiddleware, getUsers)

// Route für den AWS Upload und das Speichern des Bildpfads in MongoDB. --- MAIN IMAGE --- 
userRouter.put('/myProfile/editImageMain', upload.single('image'), doAuthMiddleware, updateMainImage)

// Route für den AWS Upload und das Speichern des Bildpfads in MongoDB. --- PROFILE IMAGE --- 
userRouter.put('/myProfile/editImageProfile', upload.single('image'), doAuthMiddleware, updateProfileImage)

userRouter.put('/updateUserSettings', doAuthMiddleware, updateUserSettings)

userRouter.delete('/deleteAccount', doAuthMiddleware, deleteAccount)

userRouter.post("/login", body("email").isEmail(), doValidation, login)

userRouter.post("/refreshtoken", refreshToken)

userRouter.post("/register",
    upload.single('image'),
    body("dogName").isString().isLength({ min: 2, max: 20 }),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    doValidation, register)


module.exports = {
    userRouter
}