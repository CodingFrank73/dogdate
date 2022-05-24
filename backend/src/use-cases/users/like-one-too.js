
//Brauche meine ID und die ID des like
//Use-Case für die Like-Liste -> Wenn ein User den anderen Liked und der Like somit zum Match wird.

const likeOneToo = async () => {

    const setMatch = await UserDAO.updateLikeToMatch(like._id, like.myId, like.idILiked)

}

module.exports = {
    likeOneToo
}