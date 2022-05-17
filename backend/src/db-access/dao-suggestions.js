const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");


async function findAllExcept(id) {
    const db = await getDB();
    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();
    return users
}

async function findAllByFilter({ distance, ageMin, ageMax, gender }) {
    const db = await getDB();
    const users = await db.collection("users").find(
        { km: { $lte: distance } },
        { age: ageMin },
        { gender: gender }).toArray();
    return users
}




module.exports = {
    findAllExcept,
    findAllByFilter
}