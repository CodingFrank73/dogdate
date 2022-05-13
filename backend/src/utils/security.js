const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function createRandomSalt() {
    return crypto.randomBytes(64).toString('hex');
}

function createHashedPasswort(password, salt) {
    return hash(password + salt);
}

function createToken(user, type = "access", lifetimeInSeconds = Number(process.env.LIFETIME_TOKEN_ACCESS)) {
    const initiatedAt = Math.floor(Date.now() / 1000);
    const expiresAt = initiatedAt + lifetimeInSeconds;

    const tokenPayload = {
        sub: user._id,
        type: type,
        iat: initiatedAt,
        exp: expiresAt
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    return token
}

function generateRandomSixDigitCode() {
    return Math.random().toString().slice(2, 8)
}


module.exports = {
    hash,
    createRandomSalt,
    createHashedPasswort,
    createToken,
    generateRandomSixDigitCode
}