const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");


async function findAllExcept(id) {
    const db = await getDB();

    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate }) {
    const db = await getDB();

    console.log("minAgeAsDate in DAO:", minAgeAsDate);
    console.log("maxAgeAsDate in DAO:", maxAgeAsDate);

    const users = await db.collection("users").find(
        {
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