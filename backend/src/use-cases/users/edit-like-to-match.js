const { UserDAO } = require("../../db-access");
const uuid = require("uuid");

const chatID = uuid.v4();

const editLikeToMatch = async (idUserB, idUserA) => {
    const setMatch = await UserDAO.updateLikeToMatch(idUserB, idUserA, chatID)
    return setMatch
}

module.exports = {
    editLikeToMatch
}