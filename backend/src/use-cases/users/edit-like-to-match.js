const { UserDAO } = require("../../db-access")

const editLikeToMatch = async (idUserB, idUserA) => {
    const setMatch = await UserDAO.updateLikeToMatch(idUserB, idUserA)
    return setMatch
}

module.exports = {
    editLikeToMatch
}