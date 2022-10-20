const { UserDAO } = require("../../db-access");

async function editImageMain({ userId, bigImage }) {
    const insertResult = await UserDAO.updateImageMain(userId, bigImage);

    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount === 1
    if (!wasSuccessful) {
        throw new Error("Updating BigImage failed, please try again.")
    }

    return insertResult
}

module.exports = {
    editImageMain
}