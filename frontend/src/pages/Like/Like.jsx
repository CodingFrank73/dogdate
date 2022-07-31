import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import apiBaseUrl from "../../api"
import LikeList from "./LikeList";

import backarrow from '../../assets/icons/arrow-back.svg';


const Like = (props) => {

    const [likesArr, setLikesArr] = useState([])

    useEffect(() => {
        fetchLikes()
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/showLikes`, {
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
        <div>
            <div className="profile">
                <div className="profile-header">
                    <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
                    <h2>Likes</h2>
                </div>

                <h3>{`${likesArr.length}`} Likes</h3>
                <LikeList
                    likesArr={likesArr}
                    token={props.token}
                    profileImage={props.profileImage}
                />

                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default Like;