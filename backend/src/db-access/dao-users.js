const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

const collectionName = "users";

async function findAll() {
    const db = await getDB();
    const users = await db.collection(collectionName).find().toArray();
    return users
}

async function findById(id) {
    const db = await getDB();
    const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return user
}

async function findByEmail(email) {
    const db = await getDB();
    const user = await db.collection(collectionName).findOne({ email: email });
    return user
}

async function insert(user) {
    const db = await getDB();
    const newUser = await db.collection(collectionName).insertOne(user);
    return newUser
}

async function update(userId, updateInfo) {
   
   console.log("userId aus DAO", userId)
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: userId },
        { $set: {profileImage: updateInfo} } 
    )
   
     return updatedUser
}

async function updateAvatar({userId, profileImage}) {
   console.log("profile image aus DAO", profileImage)
   console.log("userId aus DAO", userId)
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: {profileImage: profileImage} } 
    )
    console.log("TEST DAO")
    console.log("IDtest", userId)
     return updatedUser
}


module.exports = {
    findAll,
    findById,
    findByEmail,
    insert,
    update,
    updateAvatar
}