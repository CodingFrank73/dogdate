import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//  BILDER-IMPORT
import dogImage01 from '../../assets/img/dimka.png';
import dogImage02 from '../../assets/img/goliath.png';
import dogImage03 from '../../assets/img/idefix.png';
import dogImage04 from '../../assets/img/sandy.png';

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
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
                    <div className="dog-wrapper01">
                        <img src={dogImage01} alt="dog pic" />
                        <div className="dogName">Dimka, 5</div>
                        <div className="distanceKM">4 km</div>
                    </div>
                    <div className="dog-wrapper02">
                        <img src={dogImage02} alt="dog pic" />
                        <div className="dogName">Goliath, 8</div>
                        <div className="distanceKM">15 km</div>
                    </div>
                    <div className="dog-wrapper03">
                        <img src={dogImage03} alt="dog pic" />
                        <div className="dogName">Idefix, 12</div>
                        <div className="distanceKM">1 km</div>
                    </div>
                    <div className="dog-wrapper04">
                        <img src={dogImage04} alt="dog pic" />
                        <div className="dogName">Sandy, 2</div>
                        <div className="distanceKM">8 km</div>
                    </div>
                </div>

                <div className="home-like-wrapper">
                    <div className="home-like-buttons">
                        <div className="home-dislike"><img src={buttonDislike} alt="dislike" /> </div>
                        <div className="home-like"><img src={buttonLike} alt="like" /></div>
                    </div>
                </div>
                <footer>
                    <div className="nav">
                        <div><Link to="/home" ><img src={iconHomeaktiv} alt="home" /></Link></div>
                        <div><Link to="/like" ><img src={iconLike} alt="like" /></Link></div>
                        <div><Link to="/chat" ><img src={iconChat} alt="chat" /></Link></div>
                        <div><Link to="/profile" ><img src={iconProfile} alt="profile" /></Link></div>
                    </div>
                </footer>
            </div>


        </div>

    );
}

export default Home;