import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from 'react-tinder-card';

import "./Card.css"
import Footer from "../../components/Footer/Footer";
import HomeFilter from "./HomeFilter";

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
    const [isGenderMClicked, setIsGenderMClicked] = useState(false);
    const [isGenderFClicked, setIsGenderFClicked] = useState(false);
    const [isSizeSClicked, setIsSizeSClicked] = useState(false);
    const [isSizeMClicked, setIsSizeMClicked] = useState(false);
    const [isSizeLClicked, setIsSizeLClicked] = useState(false);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    const [filterScreenIsOpen, setFilterScreenIsOpen] = useState(false);

    const [lastDirection, setLastDirection] = useState()


    const navigate = useNavigate();


    const swiped = async (direction, dogName, profileImage, swipedId) => {

        setLastDirection(direction)

        if (direction === "right") {
            doLike(swipedId, dogName, profileImage)

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
            const response = await fetch(apiBaseUrl + `/api/suggestion/allwithfilter`, {
                headers: {
                    token: "JWT " + props.token
                }
            })

            const data = await response.json();
            const sortTest = data.listOfUsers.sort((a, b) => (a.dogName < b.dogName) ? 1 : -1);
            console.log("Suggestions with default filter for foundUser:", sortTest);

            // setSuggestions(data.listOfUsers.sort(function () { return Math.random() - 0.5 }))
            setSuggestions(data.listOfUsers.sort((a, b) => (a.dogName < b.dogName) ? 1 : -1))
            setCurrentUser(data.foundUser);
            setFilteredGender(data.foundUser.filterGender);
            setFilteredAgeRange(data.foundUser.ageRange);
            setFilteredSize(data.foundUser.filterSize);
            setFilteredMaxDistance(data.foundUser.maxDistance);
            setMatches(data.foundUser.match);

        } catch (error) {

        }
    }

    const fetchSuggestionsWithTempFilter = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/suggestion/withTempFilter`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ageRange: filteredAgeRange, maxDistance: filteredMaxDistance, gender: filteredGender, size: filteredSize, match: matches })
            })

            const data = await response.json()
            setSuggestions(data)

        } catch (error) {

        }
    }

    const handleClose = () => {
        setFilterScreenIsOpen(false);
        fetchSuggestionsWithTempFilter()
    }

    const handleChangeAgeRange = async (event, newValueAge) => {
        if (newValueAge[0] === filteredAgeRange[0] && newValueAge[1] === filteredAgeRange[1]) {
            return
        }
        setFilteredAgeRange(newValueAge);
    }

    const handleChangeDistance = async (event, newValueDistance) => {
        if (newValueDistance === filteredMaxDistance) {
            return
        }
        setFilteredMaxDistance(newValueDistance)
    }

    const handleChangeGenderM = async (event) => {
        if (!isGenderMClicked) {
            setFilteredGender([...filteredGender, "m"])
            setIsGenderMClicked(true)
            document.getElementById("genderRight").classList.toggle("genderRight-aktiv")
        } else {
            const result = filteredGender.filter(size => size !== "m")
            setFilteredGender(result)
            setIsGenderMClicked(false)
            document.getElementById("genderRight").classList.toggle("genderRight-aktiv")
        }
    }

    const handleChangeGenderF = async (event) => {
        if (!isGenderFClicked) {
            setFilteredGender([...filteredGender, "f"])
            setIsGenderFClicked(true)
            document.getElementById("genderLeft").classList.toggle("genderLeft-aktiv")
        } else {
            const result = filteredGender.filter(size => size !== "f")
            setFilteredGender(result)
            setIsGenderFClicked(false)
            document.getElementById("genderLeft").classList.toggle("genderLeft-aktiv")
        }
    }

    const handleChangeSizeS = async (event) => {
        if (!isSizeSClicked) {
            setFilteredSize([...filteredSize, "s"])
            setIsSizeSClicked(true)
            document.getElementById("sizeSmall").classList.toggle("sizeSmall-aktiv")
        } else {
            const result = filteredSize.filter(size => size !== "s")
            setFilteredSize(result)
            setIsSizeSClicked(false)
            document.getElementById("sizeSmall").classList.toggle("sizeSmall-aktiv")
        }
    }

    const handleChangeSizeM = async (event) => {
        if (!isSizeMClicked) {
            setFilteredSize([...filteredSize, "m"])
            setIsSizeMClicked(true)
            document.getElementById("sizeMiddle").classList.toggle("sizeMiddle-aktiv")
        } else {
            const result = filteredSize.filter(size => size !== "m")
            setFilteredSize(result)
            setIsSizeMClicked(false)
            document.getElementById("sizeMiddle").classList.toogle("sizeMiddle-aktiv")
        }
    }

    const handleChangeSizeL = async (event) => {
        if (!isSizeLClicked) {
            setFilteredSize([...filteredSize, "l"])
            setIsSizeLClicked(true)
            document.getElementById("sizeLarge").classList.toggle("sizeLarge-aktiv")
        } else {
            const result = filteredSize.filter(size => size !== "l")
            setFilteredSize(result)
            setIsSizeLClicked(false)
            document.getElementById("sizeLarge").classList.toggle("sizeLarge-aktiv")
        }
    }

    const doLike = async (likedId, dogName, profileImage) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/likeone`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ likedId: likedId })
            })

            const result = await response.json()

            if (!result.isLikeCreated) { doLikeToMatch(result.idUserA, dogName, profileImage) }

        } catch (error) {

        }
    }

    const doLikeToMatch = async (idUserA, dogName, profileImage) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/likeToMatch`, {
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
                                    <img src={character.bigImage} alt="dog pic" />
                                    <div className="dogName">{character.dogName}, {character.age}</div>
                                    <div className="distanceKM">{character.location} km</div>
                                </div>
                            </TinderCard>
                        )}
                    </div>
                </div>

                <div className="home-like-wrapper">
                    <div className="home-like-buttons">
                        <div className="home-dislike" onClick={() => swiped("left", "", "")}><img src={buttonDislike} alt="dislike" /> </div>
                        <div className="home-like"><img src={buttonLike} alt="like" /></div>
                    </div>
                </div>
            </div>

            <HomeFilter
                isFilterScreenOpenend={filterScreenIsOpen}
                filteredGender={filteredGender}
                filteredAgeRange={filteredAgeRange}
                filteredSize={filteredSize}
                filteredMaxDistance={filteredMaxDistance}
                handleChangeGenderF={handleChangeGenderF}
                handleChangeGenderM={handleChangeGenderM}
                handleChangeAgeRange={handleChangeAgeRange}
                handleChangeSizeS={handleChangeSizeS}
                handleChangeSizeM={handleChangeSizeM}
                handleChangeSizeL={handleChangeSizeL}
                handleChangeDistance={handleChangeDistance}
                handleClose={handleClose}
            />

            <Footer />
        </div >
    );
}


export default Home;