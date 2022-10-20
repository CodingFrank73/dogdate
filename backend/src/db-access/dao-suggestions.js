const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function findAllExcept(id) {
    const db = await getDB();
    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ _id, postalCodeArr, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match }) {
    const db = await getDB();

    const matchObj = match.map(a => a.fk_id)
    const exIDs = [...matchObj, _id].map(id => ObjectId(id.toString()))
    console.log("TCL: findAllByFilter -> exIDs", exIDs)


    const users = await db.collection("users").find(
        {
            _id: { $nin: exIDs },
            dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
            gender: { $in: filterGender },
            size: { $in: filterSize },
            postalCode: { $in: postalCodeArr }
            // location: { $lte: maxDistance }
        }).toArray();

    console.log("Users in dao:", users);
    return users
}

module.exports = {
    findAllExcept,
    findAllByFilter
}