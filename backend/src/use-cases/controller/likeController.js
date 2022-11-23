const { UserDAO } = require("../../db-access")
const uuid = require("uuid");

const getLikes = async (req, res) => {
    const userId = req.userClaims.sub;

    try {
        // find all likes where I was liked => My Id is in field: idILiked
        const tempUserIdsArr = await UserDAO.findUserIDsWholikeMe(userId);

        // generate an Array with all needed fields
        const likes = await UserDAO.findByIdList(tempUserIdsArr)

        res.status(200).json(likes)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error during finding likes." })
    }
}

// Prüfe ob bereits ein LIKE für diese Kombination vorhanden ist.
const getLikeByID = async (req, res) => {
    const idUserA = req.userClaims.sub;
    const { id } = req.params //idUserB

    try {
        const like = await UserDAO.findLikeByUserIds({ idUserA, id })
        res.status(200).json(like)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error during finding like." })
    }
}

// Kein Like vorhanden => Erstelle einen neuen Eintrag ín der Collection "Likes" 
const createLike = async (req, res) => {
    const idUserA = req.userClaims.sub;
    const idUserB = req.body.likedId

    try {
        const insertResult = await UserDAO.insertLike({ idUserA, idUserB })
        const isInsertSuccessfully = insertResult.acknowledged === true && insertResult.insertedId;

        if (!isInsertSuccessfully) throw new Error("Adding a new Like failed");

        res.status(201).json(insertResult)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error during inserting likes." })
    }
}

const updateLikeToMatch = async (req, res) => {
    const idUserB = req.userClaims.sub;
    const idUserA = req.body.idUserA;
    const chatID = uuid.v4();

    try {
        const setMatch = await UserDAO.updateLikeToMatch(idUserB, idUserA, chatID)
        res.status(200).json(setMatch)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error during updating likes and users." })
    }
}


module.exports = {
    updateLikeToMatch,
    createLike,
    getLikes,
    getLikeByID
}