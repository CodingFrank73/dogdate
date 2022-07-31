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

// TODO: Funktion muss überarbeitet werden, Frank
async function findByIdForProfileImage({ userId }) {
    const db = await getDB();
    const fUser = await db.collection(collectionName).findOne({ _id: new ObjectId(userId) });
    return fUser
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
    return result
}

// TODO: Diese Funktion muss auf AWS angepasst werden.....
async function updateAvatar({ userId, profileImage }) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profileImage: profileImage } }
    )
    return updatedUser
}

// TODO: Diese Funktion muss auf AWS angepasst werden......
async function updateBigImage({ userId, bigImage }) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { bigImage: bigImage } }
    )
    return updatedUser
}

// ++++++ Functions for the likes +++++++++++++
// Hint: idUserA ist der User der einen anderen User geliked hat / idUserB ist der User der geliked wurde.


// find an l
async function findLikeByUserIds({ idUserA, idUserB }) {
    const db = await getDB();
    const foundLike = await db.collection("likes").findOne(
        {
            idUserB: new ObjectId(idUserA),
            idUserA: new ObjectId(idUserB)
        }
    );
    return foundLike
}

// find all userIds who likes a specific User based on userId
async function findUserIDsWholikeMe(userId) {
    const db = await getDB();
    const userIds = await db.collection("likes").aggregate([
        {
            $match: {
                $and: [
                    { idUserB: ObjectId(userId) },
                    { match: false }
                ]
            }
        },
        {
            $project: {
                _id: 0,
                idUserA: 1
            }
        }]).toArray();

    return userIds
}

// find all required informations about the Users who liked a specific User
async function findByIdList(idList) {
    const db = await getDB();
    const usersWhoLikeMe = await db.collection(collectionName).aggregate([
        { $match: { _id: { $in: idList.map(item => ObjectId(item.idUserA)) } } },
        {
            $project: {
                _id: 1,
                dogName: 1,
                profileImage: 1,
                bigImage: 1,
                gender: 1,
            }
        }]).toArray()

    return usersWhoLikeMe
}

async function insertLike({ idUserA, idUserB }) {
    const db = await getDB();
    const like = await db.collection("likes").insertOne(
        {
            idUserA: new ObjectId(idUserA),
            idUserB: new ObjectId(idUserB),
            match: false,
            notification: false
        });
    return like
}

async function updateLikeToMatch(idUserB, idUserA) {
    const db = await getDB();
    const updatelike = await db.collection("likes").updateOne(
        { $and: [{ idUserA: new ObjectId(idUserA) }, { idUserB: new ObjectId(idUserB) }] },
        { $set: { match: true } }
    );

    const updateUserOne = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(idUserA) },
        { $push: { "match": new ObjectId(idUserB) } }
    );

    const updateUserTwo = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(idUserB) },
        { $push: { "match": new ObjectId(idUserA) } }
    );

    return (true)
}













async function updateLanguage({ userId, language }) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { language: language } }
    )
    return updatedUser
}

async function updateMaxDistance({ userId, maxDistance }) {
    const db = await getDB();
    const insertResult = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { maxDistance: maxDistance } }
    );
    return insertResult
}

async function updateAgeRange({ userId, ageRange }) {
    const db = await getDB();
    const insertResult = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { ageRange: ageRange } }
    );
    return insertResult
}

async function deleteUser(userId) {
    const db = await getDB();
    const insertResult = await db.collection(collectionName).deleteOne(
        { _id: new ObjectId(userId) },
    )
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
    findLikeByUserIds,
    findUserIDsWholikeMe,
    insertLike,
    updateLikeToMatch,
    updateLanguage,
    updateMaxDistance,
    updateAgeRange,
    deleteUser,
    updateBigImage
}