
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
    language = "German",
    filterGender = "",
    filterSize = "",
    ageRange = [1, 4],
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
        ageMin,
        ageMax,
        maxDistance,
    }
}

module.exports = {
    makeUser
}