
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const AgeCalc = require("../../utils/ageCalc");
const SurroundingPostalCode = require('../../utils/surroundingPostalCodes');

const listSuggestionByDefaultFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)

    const { postalCode, maxDistance, filterGender, ageRange, filterSize, _id, match } = user

    // Ermitteln von Daten in Hilfsfunktionen => siehe utils
    const minAgeAsDate = AgeCalc.subtractYears(ageRange[0])
    const maxAgeAsDate = AgeCalc.subtractYears(ageRange[1])
    const postalCodeArr = await SurroundingPostalCode.getPostalCodes(postalCode, maxDistance);

    // Suche nach Vorschlägen bei denen die Werte der Parameter stimmen.
    const users = await SuggestionDAO.findAllByFilter({ _id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match })

    // Erstellen einer Liste der gefundnen Usern
    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        bigImage: u.bigImage,
        profileImage: u.profileImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        location: u.location,
        distance: Number(postalCodeArr.find(o => o.postalCode == u.postalCode).distance).toFixed(1)
    }))

    return ({ listOfUsers, foundUser })
}

module.exports = {
    listSuggestionByDefaultFilter
}