
const { SuggestionDAO } = require("../../db-access")
const AgeCalc = require("../../utils/ageCalc");
const SurroundingPostalCode = require('../../utils/surroundingPostalCodes');

const listSuggestionByTempFilter = async ({ _id, postalCode, maxDistance, filterGender, ageRange, filterSize, match }) => {

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

    return listOfUsers
}

module.exports = {
    listSuggestionByTempFilter
}