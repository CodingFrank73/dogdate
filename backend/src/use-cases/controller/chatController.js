const { UserDAO } = require("../../db-access")

const getChats = async (req, res) => {
    const userId = req.userClaims.sub;

    try {
        const foundUser = await UserDAO.findById(userId);

        const { match } = foundUser

        const matchDetails = match.map(i => ({
            _id: i.fk_id,
            chatID: i.chatID
        }))

        const chatPartner = await UserDAO.findByMatchList(match)

        const fullMatchArr = [...chatPartner, ...matchDetails]

        const result = fullMatchArr.reduce((acc, fullMatch) => {
            const duplicate = acc.find(addr => addr._id.toString() === fullMatch._id.toString());

            if (duplicate) {
                duplicate.chatID = fullMatch.chatID
                return acc
            }
            return acc.concat(fullMatch)

        }, [])

        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error during finding likes." })
    }



}


module.exports = {
    getChats
}