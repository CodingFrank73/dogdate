const { ObjectId, ObjectID } = require("mongodb");
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
        { _id: new ObjectId(userId) },
        { $set: updatedInfo }
    )
    return result
}

async function updateProfileImage(userId, profileImage) {
    const db = await getDB();
    const updatedUser = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profileImage: profileImage } }
    )
    return updatedUser
}

async function updateMainImage(userId, bigImage) {
    const db = await getDB();
    const result = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { bigImage: bigImage } }
    )
    return result
}

// ++++++ Functions for the likes +++++++++++++
// Hint: idUserA ist der User der einen anderen User geliked hat / idUserB ist der User der geliked wurde.

async function findLikeByUserIds({ idUserA, id }) {
    const db = await getDB();
    const foundLike = await db.collection("likes").findOne(
        {
            idUserB: new ObjectId(idUserA),
            idUserA: new ObjectId(id)
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

async function findByMatchList(matchList) {
    const db = await getDB();
    const ll = await db.collection(collectionName).aggregate([
        { $match: { _id: { $in: matchList.map(item => ObjectId(item.fk_id)) } } },
        {
            $project: {
                _id: 1,
                dogName: 1,
                profileImage: 1,
            }
        }]).toArray()
    return ll
}

async function insertLike({ idUserA, idUserB }) {
    const db = await getDB();

    const updatePastLikes = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(idUserA) },
        { $push: { pastLikes: idUserB } }
    )

    const like = await db.collection("likes").insertOne(
        {
            idUserA: new ObjectId(idUserA),
            idUserB: new ObjectId(idUserB),
            match: false,
            notification: false
        });

    return like
}

async function updateLikeToMatch(idUserB, idUserA, uuid) {
    const db = await getDB();
    const updatelike = await db.collection("likes").updateOne(
        { $and: [{ idUserA: new ObjectId(idUserA) }, { idUserB: new ObjectId(idUserB) }] },
        { $set: { match: true } }
    );

    const updateUserOne = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(idUserA) },
        { $push: { "match": { "fk_id": new ObjectId(idUserB), "chatID": uuid } } },
        { $push: { "match": new ObjectId(idUserB) } }
    );

    const updateUserTwo = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(idUserB) },
        { $push: { "match": { "fk_id": new ObjectId(idUserA), "chatID": uuid } } },
        { $push: { "match": new ObjectId(idUserA) } }
    );

    return (true)
}

async function deleteUser(userId) {
    const db = await getDB();
    const insertResult = await db.collection(collectionName).deleteOne(
        { _id: new ObjectId(userId) },
    )
    return insertResult
}

// TODO: Schauen was diese Funktion macht und ob notwendig oder ien überbleibsel
async function joinC() {
    const db = await getDB();
    const jj = await db.collection("likes").aggregate([
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "idUserA",
                as: "copie"
            }
        },
        {
            $project:
            {
                idUserA: 1,
                match: 1,
                dogName: "$copie.dogName",
                profileImage: "$copie.profileImage",
            }
        }
    ]
    ).toArray()
    console.log("jj", jj);
    return
}

module.exports = {
    joinC,
    findAll,
    findById,
    findByIdList,
    findByMatchList,
    findByEmail,
    findByIdForProfileImage,
    insert,
    update,
    updateProfileImage,
    updateMainImage,
    findLikeByUserIds,
    findUserIDsWholikeMe,
    insertLike,
    updateLikeToMatch,
    deleteUser,
}