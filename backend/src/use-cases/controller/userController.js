const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");
const jwt = require("jsonwebtoken");
const Sercurity = require("../../utils/security");
const hash = require("../../utils/security");
const { createToken } = require("../../utils/security");



const getUsers = async (req, res) => {
    try {
        const users = await UserDAO.findAll();
        const listOfUsers = users.map(u => ({
            _id: u._id,
            dogName: u.dogName,
            gender: u.gender,
            email: u.email
        }))

        res.status(200).json(listOfUsers);

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
}

const getCurrentUserByID = async (req, res) => {
    const userId = req.userClaims.sub;

    try {
        const result = await UserDAO.findById(userId);

        if (!result) {
            throw new Error("Not profile exists...")
        }

        const user = makeUser(result);

        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

const updateMainImage = async (req, res) => {
    const bigImage = req.file.location;
    const userId = req.userClaims.sub;

    try {
        const insertResult = await UserDAO.updateMainImage(userId, bigImage);

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount === 1

        if (!wasSuccessful) {
            throw new Error("Updating BigImage failed, please try again.")
        }

        res.status(201).json({})

    } catch (error) {
        res.status(500).json({ err: error.message || "Error during updating MainImage" })
    }
}

const updateProfileImage = async (req, res) => {
    const profileImage = req.file.location;
    const userId = req.userClaims.sub;

    try {
        const insertResult = await UserDAO.updateProfileImage(userId, profileImage)

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount

        if (!wasSuccessful) {
            throw new Error("Updating Avatar failed, please try again.")
        }

        res.status(201).json({})

    } catch (error) {
        res.status(500).json({ err: error.message || "Error during updating ProfileImage" })
    }
}

const updateUserSettings = async (req, res) => {
    const { userId, dateOfBirth, ...updatedInfo } = req.body

    updatedInfo.dateOfBirth = new Date(dateOfBirth)

    try {
        const insertResult = await UserDAO.update(userId, updatedInfo);

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
        if (!wasSuccessful) {
            throw new Error("Editing profile failed, please try again.")
        }

        res.status(200).json({})  //<- Prüfen was hier zurück zugeben ist....

    } catch (error) {
        res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
    }
}

const deleteAccount = async (req, res) => {
    const userId = req.userClaims.sub;

    try {
        const insertResult = await UserDAO.deleteUser(userId)

        const wasSuccessful = await insertResult.acknowledged === true
        if (!wasSuccessful) {
            throw new Error("Deleteing user failed, please try again.")
        }
        console.log("insertResult aus usecase", insertResult);

        res.status(200).json() //<- Prüfen was hier zurück zugeben ist....


    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error deleting user account." })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const invalidLoginMessage = "Login failed";

    try {
        const result = await UserDAO.findByEmail(email);

        if (!result) { throw new Error(invalidLoginMessage) }

        const user = makeUser(result);
        const passwordHash = hash.createHashedPasswort(password, user.salt);
        const isValidPasswort = user.pwHash === passwordHash;

        if (!isValidPasswort) {
            throw new Error(invalidLoginMessage);
        }

        const token = hash.createToken(user, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))
        const refreshToken = hash.createToken(user, "refresh", Number(process.env.LIFETIME_TOKEN_REFRESH))

        if (result.refreshToken) {
            req.session.refreshToken = result.refreshToken;
        }

        res.status(200).json({ token, refreshToken, currentUser: user, profileImage: user.profileImage, });

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error in login, try again." })
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.session.refreshToken || req.body.refreshToken

    try {

        const tokenPayload = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const isRefreshToken = tokenPayload.type === "refresh";
        if (!isRefreshToken) { throw new Error("not found") };

        const userId = tokenPayload.sub;

        const foundUser = await UserDAO.findById(userId);
        if (!foundUser) { throw new Error("Not found") };

        const user = makeUser(foundUser);

        const token = createToken(user, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))

        console.log('TOKEN: ', token);
        res.status(200).json(token);

        // return { token }
        // const result = await UserService.refreshUserToken({
        //     refreshToken: req.session.refreshToken || req.body.refreshToken
        // })



    } catch (error) {
        res.status(500).json({ err: { message: error.message } })
    }
}

const register = async (req, res) => {
    const s3FilePath = req.file.location;
    const { dogName, location, postalCode, password, email, gender, size, dateOfBirth } = req.body

    // console.log('DATE OF BIRTH:', dateOfBirth);

    try {
        const foundUser = await UserDAO.findByEmail(email)

        if (foundUser) {
            const errorMessage = "Account with this email already exists"
            throw new Error(errorMessage)
        }

        const salt = Sercurity.createRandomSalt();
        const pwHash = Sercurity.createHashedPasswort(password, salt);
        const verifyCode = Sercurity.generateRandomSixDigitCode();

        const user = await makeUser({
            dogName,
            location,
            postalCode,
            email,
            pwHash,
            salt,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            size,
            profileImage: s3FilePath,
            sixDigitVerificationCode: verifyCode
        });

        // console.log('USER: ', user);

        const insertResult = await UserDAO.insert(user);

        const isRegSuccessfully =
            insertResult.acknowledged === true &&
            insertResult.insertedId;

        if (!isRegSuccessfully) {
            throw new Error("Registration failed")
        }

        res.status(201).json({})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

}

module.exports = {
    deleteAccount,
    getCurrentUserByID,
    getUsers,
    login,
    updateMainImage,
    updateProfileImage,
    updateUserSettings,
    refreshToken,
    register
}