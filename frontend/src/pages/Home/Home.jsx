import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//  BILDER-IMPORT
import dogImage from '../../assets/img/dimka.png';
import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHomeaktiv from '../../assets/icons/home-aktiv.svg';
import iconLike from '../../assets/icons/like.svg';
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

                <div className="home-doggy-bigpic">
                    <img src={dogImage} alt="dog pic" />
                    <div className="dogName">Henry, 5</div>
                    <div className="distanceKM">4 km</div>
                </div>

                <div className="home-like-wrapper">
                    <div className="home-like-buttons">
                        <div className="home-dislike"><img src={buttonDislike} alt="dislike" /> </div>
                        <div className="home-like"><img src={buttonLike} alt="like" /></div>
                    </div>
                </div>
                <footer>
                    <div className="nav">
                        <div><img src={iconHomeaktiv} alt="home" /></div>
                        <div><img src={iconLike} alt="like" /></div>
                        <div><img src={iconChat} alt="chat" /></div>
                        <div><img src={iconProfile} alt="profile" /></div>
                    </div>
                </footer>
            </div>


        </div>

    );
}

export default Home;