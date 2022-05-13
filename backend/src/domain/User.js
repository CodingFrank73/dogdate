
function makeUser({
    _id,
    dogName,
    gender,
    dateOfBirth,
    email,
    pwHash,
    salt,
    sixDigitVerificationCode,
    phone,
    plan,
    language,
    location,
    profileImage,
    bigImage,
    showMe,
    ageRangeMin,
    ageRangeMax,
    size,
    maxDistance,
    likes = []
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
        dogName,
        gender,
        dateOfBirth,
        email,
        pwHash,
        salt,
        sixDigitVerificationCode,
        phone,
        plan,
        language,
        location,
        profileImage,
        bigImage,
        showMe,
        ageRangeMin,
        ageRangeMax,
        size,
        maxDistance,
        likes
    }
}

module.exports = {
    makeUser
}