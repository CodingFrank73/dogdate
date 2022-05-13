const { objectId, ObjectId } = require("mongodb");
const { getDbB } = require("./db-connector");

const collectionName = "users";

async function findAll() {
    const db = await getDbB();
    const users = await db.collection(collectionName).find().toArray();
    return users
}

async function findById(id) {
    const db = await getDbB();
    const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return user
}

async function findByEmail(email) {
    const db = await getDbB();
    const user = await db.collection(collectionName).findOne({ email: email });
    return user
}

async function insert(user) {
    const db = await getDbB();
    const newUser = await db.collection(collectionName).insertOne(user);
    return newUser
}

async function update(userId, updateInfo) {
    const db = await getDbB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateInfo }
    )
    return updatedUser
}


module.exports = {
    findAll,
    findById,
    findByEmail,
    insert,
    update
}