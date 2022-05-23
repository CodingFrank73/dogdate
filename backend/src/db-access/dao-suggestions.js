const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

async function findAllExcept(id) {
    const db = await getDB();
    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ _id, maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate, match }) {
    const db = await getDB();

    console.log("Match:", match);

    const exIDs = [...match, _id].map(id => ObjectId(id.toString()))

    const users = await db.collection("users").find(
        {
            // _id: { $ne: ObjectId("628b518a76240635fcfb8f55") },
            // _id: { $nin: [ObjectId("6288b25cfabd112d5193d88f"), ObjectId("628b518a76240635fcfb8f55")] },
            _id: { $nin: exIDs },
            // _id: { $ne: ObjectId(match) },
            // _id: { $ne: ObjectId("628b518a76240635fcfb8f55") },
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