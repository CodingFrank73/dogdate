
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
    plan = "free",
    location,
    postalCode,
    language = "English",
    filterGender = ["female", "male"],
    filterSize = ["small", "medium", "large"],
    ageRange = [0, 20],
    maxDistance = 30,
    match = [],
    pastLikes = []
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
        // dateOfBirth: new Date(dateOfBirth).toISOString(),
        size,
        email,
        phone,
        pwHash,
        salt,
        plan,
        location,
        postalCode,
        language,
        filterGender,
        filterSize,
        ageRange,
        maxDistance,
        match,
        pastLikes
    }
}

module.exports = {
    makeUser
}