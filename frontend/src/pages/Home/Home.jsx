import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from 'react-tinder-card';

import "./Card.css"
import Footer from "../../components/Footer/Footer";
import Filter from "./Filter";

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';

import apiBaseUrl from "../../api"

const Home = (props) => {
    const [suggestions, setSuggestions] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [filteredAgeRange, setFilteredAgeRange] = useState([]);
    const [filteredMaxDistance, setFilteredMaxDistance] = useState(0);
    const [filteredSize, setFilteredSize] = useState([]);
    const [filteredGender, setFilteredGender] = useState([]);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    const [filterScreenIsOpen, setFilterScreenIsOpen] = useState(false);

    const [lastDirection, setLastDirection] = useState()


    const navigate = useNavigate();


    const swiped = async (direction, dogName, profileImage, swipedId) => {

        setLastDirection(direction)

        if (direction === "right") {
            handleLike(swipedId, dogName, profileImage)

        } else {
            // console.log("Kein like");
        }
    }

    const outOfFrame = (name) => {
        // console.log(name + ' left the screen...!')
    }

    useEffect(() => {
        fetchSuggestions()
    }, [])


    const fetchSuggestions = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/suggestion/getSuggestionsByFilter`, {
                headers: {
                    token: "JWT " + props.token
                }
            })

            const data = await response.json();

            console.log(data);

            setSuggestions(data.suggestionsList.sort(function () { return Math.random() - 0.5 }))
            // setSuggestions(data.listOfUsers.sort((a, b) => (a.dogName < b.dogName) ? 1 : -1))
            setCurrentUser(data.currentUser);
            setFilteredGender(data.currentUser.filterGender);
            setFilteredAgeRange(data.currentUser.ageRange);
            setFilteredSize(data.currentUser.filterSize);
            setFilteredMaxDistance(data.currentUser.maxDistance);
            setMatches(data.currentUser.match);

        } catch (error) {

        }
    }

    const fetchSuggestionsWithTempFilter = async () => {
        try {
            const response = await fetch(apiBaseUrl +
                `/api/suggestion/getSuggestionsByTempFilter?maxDistance=${filteredMaxDistance}&gender=${filteredGender}&ageRange=${filteredAgeRange}&size=${filteredSize}`,
                {
                    method: "GET",
                    headers: {
                        token: "JWT " + props.token,
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    }
                })

            const data = await response.json()
            console.log(data);
            setSuggestions(data)

        } catch (error) {

        }
    }

    const handleClose = () => {
        setFilterScreenIsOpen(false);
        fetchSuggestionsWithTempFilter()
    }

    const handleLike = async (likedId, dogName, profileImage) => {
        try {
            const response = await fetch(apiBaseUrl + '/api/like/getLikeByID/' + likedId, {
                method: "GET",
                headers: {
                    token: "JWT " + props.token
                }
            })

            const result = await response.json()

            // If NO like was found => create a new Like
            if (!result) {
                makeLike(likedId)
                return
            }

            // Like was found  => update Like to match
            makeLikeToMatch(result.idUserA, dogName, profileImage)


        } catch (error) {

        }
    }

    const makeLike = async (likedId) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/like/createLike`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ likedId: likedId })
            })

            const result = await response.json()

        } catch (error) {

        }
    }

    const makeLikeToMatch = async (idUserA, dogName, profileImage) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/like/updateLikeToMatch`, {
                method: "PUT",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idUserA: idUserA })
            })

            const data = await response.json()

            navigate('/match', { state: { dogName: dogName, profileImage: profileImage, myImage: `${currentUser.profileImage}` } })

        } catch (error) {

        }
    }


    return (
        <div>
            <div className="home">
                <div className="home-header">
                    <img className="home-dd-logo" src={ddLogo} alt="dogdate logo" />
                    <h2>dogdate</h2>
                    <img className="home-filter" src={filter} alt="filter" onClick={e => setFilterScreenIsOpen(true)} />
                </div>
                <div className="home-doggy-bigpic">
                    <div className='cardContainer'>
                        {suggestions.map((character) =>
                            <TinderCard className='swipe' key={character.dogName} onSwipe={(dir) => swiped(dir, character.dogName, character.profileImage, character._id)} onCardLeftScreen={() => outOfFrame(character._id)}>
                                <div className='card'>
                                    {/* <img src={character.bigImage} alt="dog pic" /> */}
                                    <div className="dogName">{character.dogName}, {character.age}</div>
                                    <div className="distanceKM">{character.distance} km</div>
                                </div>
                            </TinderCard>
                        )}
                    </div>
                </div>

                {/* <div className="home-like-wrapper">
                    <div className="home-like-buttons">
                        <div className="home-dislike" onClick={() => swiped("left", "", "")}><img src={buttonDislike} alt="dislike" /> </div>
                        <div className="home-like"><img src={buttonLike} alt="like" /></div>
                    </div>
                </div> */}
            </div>

            <Filter
                isFilterScreenOpenend={filterScreenIsOpen}
                filteredGender={filteredGender}
                setFilteredGender={setFilteredGender}
                filteredSize={filteredSize}
                setFilteredSize={setFilteredSize}
                filteredMaxDistance={filteredMaxDistance}
                setFilteredMaxDistance={setFilteredMaxDistance}
                filteredAgeRange={filteredAgeRange}
                setFilteredAgeRange={setFilteredAgeRange}
                handleClose={handleClose}
            />

            <Footer />
        </div >
    );
}

export default Home;