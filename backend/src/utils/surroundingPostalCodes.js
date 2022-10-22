const fetch = require('node-fetch');

const getPostalCodes = async (postalCode, maxDistance) => {

    // Suche nach den Postleitzahlen die in der maximalen Distance zu meiner Postleizahl liegen. 
    const nearBy = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${postalCode}&country=DE&radius=${maxDistance}&username=codingfrank_73&maxRows=150`)
    const json = await nearBy.json();

    // Erstellt aus dem zurückgelieferten Daten ein Array mit den Werten Postleitzahl und Distance.
    const postalCodeArr = json.postalCodes.map(i => ({
        postalCode: i.postalCode,
        distance: i.distance
    }))

    return postalCodeArr;
}

module.exports = {
    getPostalCodes
}