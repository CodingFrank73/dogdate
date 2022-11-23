const { SuggestionDAO, UserDAO } = require("../../db-access")
const { getAgeByYear, subtractYears } = require("../../utils/ageCalc")
const { getPostalCodes } = require('../../utils/surroundingPostalCodes');

const getUser = async (userId) => {
    const user = await UserDAO.findById(userId)

    if (!user) { throw new Error("User doas not exists") }

    return user
}

const createSuggestionsList = async (_id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match, pastLikes) => {
    try {
        // Suche nach Vorschlägen bei denen die Werte der Parameter stimmen.
        const suggestions = await SuggestionDAO.findAllByFilter({ _id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match, pastLikes })

        // Erstellen einer Liste der gefundnen Usern
        const listOfSuggestions = suggestions.map(item => ({
            _id: item._id,
            dogName: item.dogName,
            bigImage: item.bigImage,
            profileImage: item.profileImage,
            age: getAgeByYear(item.dateOfBirth),
            location: item.location,
            distance: Number(postalCodeArr.find(o => o.postalCode == item.postalCode).distance).toFixed(1)
        }))

        return listOfSuggestions

    } catch (error) {

    }
}

const getSuggestionsByFilter = async (req, res) => {
    const userId = req.userClaims.sub

    try {
        const currentUser = await getUser(userId)
        const { postalCode, maxDistance, filterGender, ageRange, filterSize, _id, match, pastLikes } = currentUser

        // Ermitteln von Daten in Hilfsfunktionen => siehe utils
        const minAgeAsDate = subtractYears(ageRange[0])
        const maxAgeAsDate = subtractYears(ageRange[1])
        const postalCodeArr = await getPostalCodes(postalCode, maxDistance);

        // Erstellen der Vorschlagsliste
        const suggestionsList = await createSuggestionsList(_id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match, pastLikes)

        res.status(200).json({ suggestionsList, currentUser });

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading suggestions" })
    }
}


const getSuggestionsByTempFilter = async (req, res) => {
    const userId = req.userClaims.sub
    const currentUser = await getUser(userId)
    const { postalCode, _id, match, pastLikes } = currentUser

    const { maxDistance, gender, ageRange, size } = req.query

    // Make Array from queryParams
    const filterGender = gender.split(',')
    const ageRangeArr = ageRange.split(',')
    const filterSize = size.split(',')

    // Ermitteln von Daten in Hilfsfunktionen => siehe utils
    const minAgeAsDate = subtractYears(ageRangeArr[0])
    const maxAgeAsDate = subtractYears(ageRangeArr[1])
    const postalCodeArr = await getPostalCodes(postalCode, maxDistance)

    // Erstellen der Vorschlagsliste
    const suggestionsList = await createSuggestionsList(_id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match, pastLikes)

    res.status(200).json(suggestionsList);
}

module.exports = {
    getSuggestionsByFilter,
    getSuggestionsByTempFilter
}