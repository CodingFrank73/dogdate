const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");


async function findAllExcept(id) {
    const db = await getDB();

    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate }) {
    const db = await getDB();

    // const users = await db.collection("users").find(
    //     {
    //         dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
    //         gender: { $in: filterGender },
    //         size: { $in: filterSize },
    //         maxDistance: { $lte: maxDistance },

    //     }, { bigImage: 0, profileImage: 0 }).toArray();

    // console.log("user in dao", users);
    // return users



    const users = await db.collection("users").find({}).project({ dogName: 1, dateOfBirth: 1 }).toArray();

    console.log("user in dao", users);
    return users
}

module.exports = {
    findAllExcept,
    findAllByFilter
}