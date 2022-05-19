
function makeUser({
    _id,
    profileImage,
    bigImage,
    dogName,
    gender = "",
    dateOfBirth,
    size = "",
    email,
    phone,
    pwHash,
    salt,
    sixDigitVerificationCode,
    plan = "free",
    location,
    postalCode,
    language = "English",
    filterGender = ["f", "m"],
    filterSize = ["s", "m", "l"],
    ageRange = [0, 20],
    maxDistance = 200,
}) {

    if (typeof dogName !== "string" || dogName.trim().length === 0) {
        throw new Error("dogname is required")
    }

    if (!email) {
        throw new Error("Email address is required")
    }

    if (!pwHash) {
        throw new Error("Password is required")
    }

    return {
        _id,
        profileImage,
        bigImage,
        dogName,
        gender,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        size,
        email,
        phone,
        pwHash,
        salt,
        sixDigitVerificationCode,
        plan,
        location,
        postalCode,
        language,
        filterGender,
        filterSize,
        ageRange,
        maxDistance,
    }
}

module.exports = {
    makeUser
}