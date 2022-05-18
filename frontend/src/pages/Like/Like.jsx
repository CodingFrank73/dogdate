import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

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

const Home = () => {

    useEffect(() => {

    }, []);

    return (
        <div>

            <div className="home">
                <div className="home-header">
                    <img className="home-dd-logo" src={ddLogo} alt="dogdate logo" />
                    <h2>dogdate</h2>
                    <img className="home-filter" src={filter} alt="filter" />
                </div>

                <h1>Like</h1>


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