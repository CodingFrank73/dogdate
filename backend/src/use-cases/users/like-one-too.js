
//Brauche meine ID und die ID des like


const likeOneToo = async () => {

    const setMatch = await UserDAO.updateLikeToMatch(like._id, like.myId, like.idILiked)

}

module.exports = {
    likeOneToo
}