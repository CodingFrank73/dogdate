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

