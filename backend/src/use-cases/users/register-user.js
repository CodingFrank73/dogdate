const { UsersDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

const Sercurity = require("../../utils/security");

async function registerUser({ email, password, dogName, gender, dateOfBirth, size, bigImage }) {


    console.log("email", email);

    console.log(UsersDAO);
    const foundUser = await UsersDAO.findByEmail()


    if (foundUser) {
        throw new Error("Account with this Email already exists")
    }

    const salt = Sercurity.createRandomSalt();
    const pwHash = Sercurity.createHashedPasswort(password, salt);
    const verifyCode = Sercurity.generateRandomSixDigitCode();

    const user = await makeUser({ dogName, email, pwHash, salt, gender, dateOfBirth, size, bigImage, sixDigitVerificationCode: verifyCode });

    const insertResult = await UsersDAO.insert(user);

    const isRegSuccessfully =
        insertResult.acknowledged === true &&
        insertResult.insertedId;

    if (!isRegSuccessfully) {
        throw new Error("Registration failed")
    }
}

module.exports = {
    registerUser
}