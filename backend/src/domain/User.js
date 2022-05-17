
function makeUser({
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
    ageRangeMin,
    ageRangeMax,
    maxDistance,
    km
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
        ageRangeMin,
        ageRangeMax,
        maxDistance,
        km
    }
}

module.exports = {
    makeUser
}