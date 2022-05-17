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
        { $set: { profileImage: updateInfo } }
    )

    return updatedUser
}


async function updateAvatar({userId, profileImage}) {  
   console.log("userId aus DAO", userId)
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profileImage: profileImage } }
    )
     console.log("IDtest", userId)
     console.log("updated user aus DAO", updatedUser)
     return updatedUser
}

async function findMatches({ myId, likedId }) {
    console.log("Suche Match...");
    const db = await getDB();
    const foundLike = await db.collection("likeStatus").findOne(
        {
            // myId: myId,
            // idILiked: likedId
            idILiked: myId,
            myId: likedId
        }
    );

    return foundLike
}

async function insertLike({ myId, likedId }) {
    console.log("Insert like......");
    const db = await getDB();
    const like = await db.collection("likeStatus").insertOne(
        {
            myId: myId,
            idILiked: likedId,
            match: false,
            notification: false
        });
    return like
}

async function updateLikeToMatch(likeId) {
    console.log("Update like mit der ID: " + likeId + " to match.......");
    const db = await getDB();
    const like = await db.collection("likeStatus").updateOne(
        { _id: likeId },
        { $set: { match: true } }
    );

    return like
}


module.exports = {
    findAll,
    findById,
    findByEmail,
    insert,
    update,
    updateAvatar,
    findMatches,
    insertLike,
    updateLikeToMatch
}