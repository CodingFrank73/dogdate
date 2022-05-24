const { UserDAO } = require("../../db-access")

// Match-Code
// 1. Suche in der Collection likeStatus alle Datensatz bei denen die idSecondary mit der ID der von mir geliketen Person übereinstimmen.

// 2. Wenn in der Liste Inhalt ist
//           => suche in der Liste ob in einem der Datensätze meine ID im Feld idPrimary vorkommt.
//                JA => TREFFER => Ändere Feld Match auf True und benachrichtige die Person

//                NEIN => Erstelle einen neunen Datensatz in der Collection.
//                            1. In Feld idPrimary kommt meine ID
//                            2. In Feld idSecondary kommt die ID der Person die ich geliked habe
//                            3. Feld Match ist false 

//    Wenn in der Liste KEIN Inhalt ist => gehe Punkt 2 -> NEIN

const likeOne = async ({ myId, likedId }) => {

   const like = await UserDAO.findMatches({ myId, likedId })
   console.log("Ergebnis der Suche nach likes die matchen können:", like);

   // Wenn kein Match, dann erzeuge neuen Datensatz
   if (!like) {
      console.log("kein Match");
      const insertResult = await UserDAO.insertLike({ myId, likedId })

      const isInsertSuccessfully = insertResult.acknowledged === true && insertResult.insertedId;
      if (!isInsertSuccessfully) throw new Error("Adding a new Like failed");

      return
   }

   // ++++ Ein Like match => update die notwendigen Felder ++++
   // console.log("Aus diesem LIKE wird ein Match:", like);
   const setMatch = await UserDAO.updateLikeToMatch(like._id, like.myId, like.idILiked)
   // console.log("Welche Collections wurden geupdated: ", setMatch);
}


module.exports = {
   likeOne
}