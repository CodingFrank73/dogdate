const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function findAllExcept(id) {
    // const db = await getDB();
    // const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    // return users
}

async function findAllByFilter({ _id, postalCodeArr, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match, pastLikes }) {
    const matchObj = match.map(a => a.fk_id)
    const exIDs = [...matchObj, ...pastLikes, _id].map(item => ObjectId(item.toString()));

    const db = await getDB();
    const users = await db.collection("users").find(
        {
            _id: { $nin: exIDs },
            dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
            gender: { $in: filterGender },
            size: { $in: filterSize },
            postalCode: { $in: postalCodeArr.map(item => (item.postalCode)) },

        }).toArray();

    return users
}

module.exports = {
    findAllExcept,
    findAllByFilter
}