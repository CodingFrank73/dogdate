const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

const collectionName = "likeStatus";


async function findAllSecondaryIDs(id) {
    const db = await getDB();
    const user = await db.collection(likeStatus).find({ idSecondary: new ObjectId(id) }).toArray();
    return user
}



async function insert(user) {
    const db = await getDB();
    const newUser = await db.collection(collectionName).insertOne(user);
    return newUser
}

async function update(userId, updateInfo) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateInfo }
    )
    return updatedUser
}


module.exports = {

    findById,

    insert,
    update
}