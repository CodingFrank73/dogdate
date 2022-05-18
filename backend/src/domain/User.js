
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
    language = "Deutsch",
    filterGender = "",
    filterSize = "",
    ageMin = 1,
    ageMax = 4,
    maxDistance = 5,
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
        dateOfBirth,
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
        ageMin,
        ageMax,
        maxDistance,
    }
}

module.exports = {
    makeUser
}