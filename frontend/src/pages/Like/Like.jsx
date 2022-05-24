import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiBaseUrl from "../../api"
import LikesList from "./LikesList";

//  BILDER-IMPORT

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLikeaktiv from '../../assets/icons/like-aktiv.svg';
import iconChat from '../../assets/icons/chat.svg';
import iconProfile from '../../assets/icons/profile.svg';

const Home = (props) => {

    const [likesArr, setLikesArr] = useState([])

    useEffect(() => {
        fetchLikes()
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/showMyLikes`, {
                headers: {
                    token: "JWT " + props.token
                }
            })

            const data = await response.json();
            console.log("Likes:", data);
            setLikesArr(data)
            console.log(likesArr)

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

                <h3>5 Likes</h3>
                <LikesList likesArr={likesArr}  />

                <footer>
                    <div className="nav">
                        <div><Link to="/home" ><img src={iconHome} alt="home" /></Link></div>
                        <div><Link to="/like" ><img src={iconLikeaktiv} alt="like" /></Link></div>
                        <div><Link to="/chat" ><img src={iconChat} alt="chat" /></Link></div>
                        <div><Link to="/profile" ><img src={iconProfile} alt="profile" /></Link></div>
                    </div>
                </footer>
            </div>


        </div>

    );
}

export default Home;