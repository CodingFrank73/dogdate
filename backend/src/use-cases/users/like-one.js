const { UserDAO } = require("../../db-access")

const likeOne = async ({ idUserA, idUserB }) => {

   // Schaue ob bereits ein LIKE für diese Kombination vorhanden ist.
   const foundLike = await UserDAO.findLikeByUserIds({ idUserA, idUserB })

   // Wenn Eintrag gefunden, beende Funktion. Durch Rückgabewerte wird ein Matsch erstellt.
   if (foundLike) {
      return { isLikeCreated: false, idUserA: foundLike.idUserA }
   }

   // Ansonsten erstelle einen neuen Eintrag ín der Collection "Likes" und return true
   const insertResult = await UserDAO.insertLike({ idUserA, idUserB })
   const isInsertSuccessfully = insertResult.acknowledged === true && insertResult.insertedId;

   if (!isInsertSuccessfully) throw new Error("Adding a new Like failed");

   return { isLikeCreated: true }
}

module.exports = {
   likeOne
}