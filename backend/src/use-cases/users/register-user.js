const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

const Sercurity = require("../../utils/security");

async function registerUser({ email, password, dogName, gender, dateOfBirth, size, bigImage }) {

    const foundUser = await UserDAO.findByEmail(email)

    if (foundUser) {
        throw new Error("Account with this Email already exists")
    }

    const salt = Sercurity.createRandomSalt();
    const pwHash = Sercurity.createHashedPasswort(password, salt);
    const verifyCode = Sercurity.generateRandomSixDigitCode();

    const user = await makeUser({ dogName, email, pwHash, salt, gender, dateOfBirth, size, bigImage, sixDigitVerificationCode: verifyCode });

    const insertResult = await UserDAO.insert(user);

    const isRegSuccessfully =
        insertResult.acknowledged === true &&
        insertResult.insertedId;

    if (!isRegSuccessfully) {
        throw new Error("Registration failed")
    }

    const registeredUser = await UserDAO.findById(insertResult.insertedId);
    return registeredUser

}

module.exports = {
    registerUser
}