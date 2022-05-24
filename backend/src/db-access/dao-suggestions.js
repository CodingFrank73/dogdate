const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function findAllExcept(id) {
    const db = await getDB();
    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ _id, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match }) {
    const db = await getDB();

    const exIDs = [...match, _id].map(id => ObjectId(id.toString()))

    const users = await db.collection("users").find(
        {
            _id: { $nin: exIDs },
            dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
            gender: { $in: filterGender },
            size: { $in: filterSize },
            maxDistance: { $lte: maxDistance }
        }).toArray();

    return users
}

module.exports = {
    findAllExcept,
    findAllByFilter
}