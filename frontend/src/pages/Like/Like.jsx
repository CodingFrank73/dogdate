import { useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LikeList from "./LikeList";

import apiBaseUrl from "../../api"

const Like = (props) => {
    const [likesArr, setLikesArr] = useState([])

    useEffect(() => {
        fetchLikes()
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/like/getLikes`, {
                headers: {
                    token: "JWT " + props.token
                }
            })

            const data = await response.json();
            setLikesArr(data)

        } catch (error) {

        }
    }

    return (
        <div className="profile">
            <Header headline={"Like"}></Header>

            <h3>{`${likesArr.length}`} Likes</h3>
            <LikeList
                likesArr={likesArr}
                token={props.token}
                profileImage={props.profileImage}
            />

            <Footer />
        </div>
    );
}

export default Like;