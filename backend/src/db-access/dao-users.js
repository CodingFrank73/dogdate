const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");

const collectionName = "users";

async function findAll() {
    const db = await getDB();
    const users = await db.collection(collectionName).find().toArray();
    return users
}

async function findById(id) {
    // console.log("id in DAOUser: ", id);
    const db = await getDB();
    const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    //  console.log("User in DOUser: ", user);
    return user
}

async function findByIdForProfileImage({ userId }) {
    const db = await getDB();
    const fUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    return fUser
}

async function findByIdList(idList) {
    const db = await getDB();
    const foundList = await db.collection(collectionName).find({ _id: { $in: idList.map(id => new ObjectId(id)) } }).toArray();
    return foundList
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

async function update(userId, updatedInfo) {
    const db = await getDB();
    const result = await db.collection(collectionName).updateOne(
        { _id: userId },
        { $set: updatedInfo }
    )
    console.log("updatedInfo from DAO:", updatedInfo, userId)
    console.log("result from DAO", result)

    return result
}


async function updateAvatar({ userId, profileImage }) {
    // console.log("userId aus DAO", userId)
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profileImage: profileImage } }
    )
    console.log("IDtest", userId)
    console.log("updated user aus DAO", updatedUser)
    return updatedUser
}

async function updateBigImage({ userId, bigImage }) {
    console.log("userId aus DAO bigImage", userId)
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { bigImage: bigImage } }
    )
    // console.log("IDtest", userId)
    // console.log("updated user aus DAO", updatedUser)
    return updatedUser
}

async function findLikesById({ userId }) {
    const db = await getDB();
    const likes = await db.collection("likes").find({ idILiked: new ObjectId(userId) }).toArray();
    return likes
}

async function findMatches({ myId, likedId }) {
    console.log("Suche Matches in dao-user:...");
    const db = await getDB();
    const foundLike = await db.collection("likes").findOne(
        {
            idILiked: new ObjectId(myId),
            myId: new ObjectId(likedId)
        }
    );

    return foundLike
}

async function insertLike({ myId, likedId }) {
    console.log("Insert like......");
    const db = await getDB();
    const like = await db.collection("likes").insertOne(
        {
            myId: new ObjectId(myId),
            idILiked: new ObjectId(likedId),
            match: false,
            notification: false
        });
    return like
}

async function updateLikeToMatch(likeId, myId, idILiked) {
    // console.log("Update like mit der ID: " + likeId + " to match.......");
    const db = await getDB();
    const updatelike = await db.collection("likes").updateOne(
        { _id: likeId },
        { $set: { match: true } }
    );

    const updateUserOne = await db.collection("users").updateOne(
        { _id: myId },
        { $push: { "match": idILiked } }
    );

    const updateUserTwo = await db.collection(collectionName).updateOne(
        { _id: idILiked },
        { $push: { "match": myId } }
    )

    return (true)
}

async function updateLanguage({ userId, language }) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { language: language } }
    )
    // console.log("IDtest", userId)
    return updatedUser
}

async function updateMaxDistance({ userId, maxDistance }) {
    const db = await getDB();
    const insertResult = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { maxDistance: maxDistance } }
    )
    // console.log("IDtest", userId)
    return insertResult
}

async function updateAgeRange({ userId, ageRange }) {
    const db = await getDB();
    // console.log("id, ageRange from DAO ", userId, ageRange)
    const insertResult = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { ageRange: ageRange } }
    )
    // console.log("IDtest", userId)
    return insertResult
}

async function deleteUser(userId) {
    const db = await getDB();
    // console.log("id, ageRange from DAO ", userId)
    const insertResult = await db.collection(collectionName).deleteOne(
        { _id: new ObjectId(userId) },
    )
    // console.log("IDtest", userId)
    return insertResult
}






module.exports = {
    findAll,
    findById,
    findByIdList,
    findByEmail,
    findByIdForProfileImage,
    insert,
    update,
    updateAvatar,
    findMatches,
    findLikesById,
    insertLike,
    updateLikeToMatch,
    updateLanguage,
    updateMaxDistance,
    updateAgeRange,
    deleteUser,
    updateBigImage
}