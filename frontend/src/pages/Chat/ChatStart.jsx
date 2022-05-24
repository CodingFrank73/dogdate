import { useEffect } from "react"
import { Link } from "react-router-dom";
import apiBaseUrl from "../../api"

const ChatStart = (props) => {

    useEffect(() => {
        fetchMatches()
    }, [])

    const fetchMatches = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/showMyMatches`, {
                headers: {
                    token: "JWT " + props.token
                }
            })

            const data = await response.json();
            console.log("Matches:", data);
            // console.log("Suggestions with default filter for listOfUsers:", data.listOfUsers);
            // console.log("Suggestions with default filter for foundUser:", data.foundUser);
            // setSuggestions(data.listOfUsers)

            // setFilteredGender(data.foundUser.filterGender);
            // setFilteredAgeRange(data.foundUser.ageRange);
            // setFilteredSize(data.foundUser.filterSize);
            // setFilteredMaxDistance(data.foundUser.maxDistance);
            // setMatches(data.foundUser.match);

        } catch (error) {

        }
    }




    return (
        <>
            {/* {props.likesArr.map((like, i) => <LikesCard like={like} wert={i} />)} */}
        </>
    );
}

export default ChatStart;