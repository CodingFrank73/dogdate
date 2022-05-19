import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//  BILDER-IMPORT

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChataktiv from '../../assets/icons/chat-aktiv.svg';
import iconProfile from '../../assets/icons/profile.svg';

const Home = () => {

    useEffect(() => {

    }, []);

    return (
        <div>

            <div className="profile">
                <div className="profile-header">
                    <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
                    <h2>Chat</h2>
                </div>

                <h1>Chat</h1>


                <footer>
                    <div className="nav">
                        <div><Link to="/home" ><img src={iconHome} alt="home" /></Link></div>
                        <div><Link to="/like" ><img src={iconLike} alt="like" /></Link></div>
                        <div><Link to="/chat" ><img src={iconChataktiv} alt="chat" /></Link></div>
                        <div><Link to="/profile" ><img src={iconProfile} alt="profile" /></Link></div>
                    </div>
                </footer>
            </div>


        </div>

    );
}

export default Home;