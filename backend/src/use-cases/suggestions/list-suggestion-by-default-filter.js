
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const AgeCalc = require("../../utils/ageCalc");
const { listAllUsers } = require("../users/list-all-users");

const fetch = require('node-fetch');

const listSuggestionByDefaultFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)
    const { postalCode, maxDistance, filterGender, ageRange, filterSize, _id, match } = user

    console.log("PostalCode", postalCode);
    const minAgeAsDate = AgeCalc.subtractYears(ageRange[0])
    const maxAgeAsDate = AgeCalc.subtractYears(ageRange[1])
    const nearBy = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${postalCode}&country=DE&radius=30&username=codingfrank_73&maxRows=30`)

    const json = await nearBy.json();

    const postalCodeArr = json.postalCodes.map(({ postalCode }) => (postalCode))


    console.log("Array", postalCodeArr);
    console.log("Array", filterGender);

    const users = await SuggestionDAO.findAllByFilter({ _id, postalCodeArr, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match })


    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        bigImage: u.bigImage,
        profileImage: u.profileImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        location: u.location,
    }))

    return ({ listOfUsers, foundUser })
}

module.exports = {
    listSuggestionByDefaultFilter
}