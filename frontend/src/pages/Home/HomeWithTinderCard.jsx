import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Card.css"

import TinderCard from 'react-tinder-card';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';

//  BILDER-IMPORT
import dogImage01 from '../../assets/img/dimka.png';
import dogImage02 from '../../assets/img/goliath.png';
import dogImage03 from '../../assets/img/idefix.png';
import dogImage04 from '../../assets/img/sandy.png';
import noMore from '../../assets/img/no-more.gif';

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
import iconHomeaktiv from '../../assets/icons/home-aktiv.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChat from '../../assets/icons/chat.svg';
import iconProfile from '../../assets/icons/profile.svg';


import apiBaseUrl from "../../api"
import SuggestionsStaple from "./SuggestionsStaple";

const style = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const HomeWithTinderCard = (props) => {
    const [suggestions, setSuggestions] = useState([]);
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

    const [open, setOpen] = useState(false);

    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete, swipedId) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)

        if (direction === "right") {
            doLike(swipedId)

        } else {
            console.log("Kein like");
        }
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen...!')
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
            console.log("Suggestions with default filter for listOfUsers:", data.listOfUsers);
            console.log("Suggestions with default filter for foundUser:", data.foundUser);
            setSuggestions(data.listOfUsers)

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
            console.log("suggestions with Temp Filter: ", data);
            setSuggestions(data)


        } catch (error) {

        }
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
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

    const doLike = async (likedId) => {
        console.log("Geliked:...:", likedId);

        try {
            const response = await fetch(apiBaseUrl + `/api/users/likeone`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ likedId: likedId })
            })

            const data = await response.json()
            // console.log("suggestions with Temp Filter: ", data);
            // setSuggestions(data)

        } catch (error) {

        }
    }

    return (
        <div>

            <div className="home">
                <div className="home-header">
                    <img className="home-dd-logo" src={ddLogo} alt="dogdate logo" />
                    <h2>dogdate</h2>
                    <img className="home-filter" src={filter} alt="filter" onClick={handleOpen} />
                </div>
                <div className="home-doggy-bigpic">

                    <div className='cardContainer'>
                        {suggestions.map((character) =>

                            <TinderCard className='swipe' key={character.dogName} onSwipe={(dir) => swiped(dir, character.dogName, character._id)} onCardLeftScreen={() => outOfFrame(character._id)}>
                                <div className='card'>
                                    {/* <img src={character.bigImage} alt="dog pic" /> */}
                                    <img src={`dogs/${character.dogName}.png`} alt="dog pic" />
                                    <div className="dogName">{character.dogName}, {character.age}</div>
                                    <div className="distanceKM">{character.maxDistance} km</div>
                                </div>
                            </TinderCard>

                        )}
                    </div>
                    {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}

                    {/* {lastDirection === "right" ? doLike : console.log("dislike")} */}
                </div>


                <div className="home-like-wrapper">
                    <div className="home-like-buttons">
                        <div className="home-dislike" onClick={() => swiped("left", "", "")}><img src={buttonDislike} alt="dislike" /> </div>
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

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">Filter</Typography>

                    <div>Hallo{filteredSize}</div>

                    <div className="dataFrame">
                        <p>Gender</p>
                        <div className="optionBox">
                            {filteredGender.includes("f") ?
                                <div id="genderLeft" className="genderLeft genderLeft-aktiv" onClick={handleChangeGenderF}>Female</div>
                                :
                                <div id="genderLeft" className="genderLeft" onClick={handleChangeGenderF}>Female</div>
                            }

                            {filteredGender.includes("m") ?
                                <div id="genderRight" className="genderRight genderRight-aktiv" onClick={handleChangeGenderM}>Male</div>
                                :
                                <div id="genderRight" className="genderRight" onClick={handleChangeGenderM}>Male</div>
                            }
                        </div>
                    </div>

                    <div className="dataFrame">
                        <p className="rangeHL">Age Range</p>
                        <Slider
                            value={filteredAgeRange}
                            onChangeCommitted={handleChangeAgeRange}
                            valueLabelDisplay="on"
                            min={0}
                            max={20}
                            step={1}
                        />
                    </div>

                    <div className="dataFrame">
                        <p>Size</p>
                        <div className="optionBox">
                            {filteredSize.includes("s") ?
                                <div id="sizeSmall" className="sizeSmall sizeSmall-aktiv" onClick={handleChangeSizeS}>S</div>
                                : <div id="sizeSmall" className="sizeSmall" onClick={handleChangeSizeS}>S</div>
                            }

                            {filteredSize.includes("m") ?
                                < div id="sizeMiddle" className="sizeMiddle sizeMiddle-aktiv" onClick={handleChangeSizeM} > M</div>
                                : <div id="sizeMiddle" className="sizeMiddle" onClick={handleChangeSizeM}>M</div>
                            }

                            {filteredSize.includes("l") ?
                                <div id="sizeLarge" className="sizeLarge sizeLarge-aktiv" onClick={handleChangeSizeL}>L</div>
                                : <div id="sizeLarge" className="sizeLarge" onClick={handleChangeSizeL}>L</div>
                            }
                        </div>
                    </div>

                    <div className="dataFrame">
                        <p className="rangeHL">Distance (in km)</p>
                        <Slider
                            value={filteredMaxDistance}
                            onChangeCommitted={handleChangeDistance}
                            valueLabelDisplay="on"
                            min={0}
                            max={200}
                            step={5}
                        />
                    </div>
                </Box>
            </Modal>
        </div >
    );
}


export default HomeWithTinderCard;




{/* <div>

    <div className="home">
        <div className="home-header">
            <img className="home-dd-logo" src={ddLogo} alt="dogdate logo" />
            <h2>dogdate</h2>
            <img className="home-filter" src={filter} alt="filter" onClick={handleOpen} />
        </div>
        <div className="home-doggy-bigpic">

            <div className="dog-wrapperBackground">
                <img src={noMore} alt="dog pic" />
                <div className="textL1">Sorry, no more</div>
                <div className="textL2">suggestions available.</div>
            </div>

            <div>
                <h1>Dog Date</h1>
                <div className='cardContainer'>
                    {suggestions.map((character) =>
                        <TinderCard className='swipe' key={character.dogName} onSwipe={(dir) => swiped(dir, character.dogName)} onCardLeftScreen={() => outOfFrame(character.dogName)}>

                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                <img src={`dogs/${character.dogName}.png`} alt="dog pic" />
                                <h3>{character.dogName}</h3>
                            </div>
                        </TinderCard>
                    )}
                </div>
                {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
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

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>

            <Typography id="modal-modal-title" variant="h6" component="h2">Filter</Typography>

            <div>Hallo{filteredSize}</div>

            <div className="dataFrame">
                <p>Gender</p>
                <div className="optionBox">
                    {filteredGender.includes("f") ?
                        <div id="genderLeft" className="genderLeft genderLeft-aktiv" onClick={handleChangeGenderF}>Female</div>
                        :
                        <div id="genderLeft" className="genderLeft" onClick={handleChangeGenderF}>Female</div>
                    }

                    {filteredGender.includes("m") ?
                        <div id="genderRight" className="genderRight genderRight-aktiv" onClick={handleChangeGenderM}>Male</div>
                        :
                        <div id="genderRight" className="genderRight" onClick={handleChangeGenderM}>Male</div>
                    }
                </div>
            </div>

            <div className="dataFrame">
                <p className="rangeHL">Age Range</p>
                <Slider
                    value={filteredAgeRange}
                    onChangeCommitted={handleChangeAgeRange}
                    valueLabelDisplay="on"
                    min={0}
                    max={20}
                    step={1}
                />
            </div>

            <div className="dataFrame">
                <p>Size</p>
                <div className="optionBox">
                    {filteredSize.includes("s") ?
                        <div id="sizeSmall" className="sizeSmall sizeSmall-aktiv" onClick={handleChangeSizeS}>S</div>
                        : <div id="sizeSmall" className="sizeSmall" onClick={handleChangeSizeS}>S</div>
                    }

                    {filteredSize.includes("m") ?
                        < div id="sizeMiddle" className="sizeMiddle sizeMiddle-aktiv" onClick={handleChangeSizeM} > M</div>
                        : <div id="sizeMiddle" className="sizeMiddle" onClick={handleChangeSizeM}>M</div>
                    }

                    {filteredSize.includes("l") ?
                        <div id="sizeLarge" className="sizeLarge sizeLarge-aktiv" onClick={handleChangeSizeL}>L</div>
                        : <div id="sizeLarge" className="sizeLarge" onClick={handleChangeSizeL}>L</div>
                    }
                </div>
            </div>

            <div className="dataFrame">
                <p className="rangeHL">Distance (in km)</p>
                <Slider
                    value={filteredMaxDistance}
                    onChangeCommitted={handleChangeDistance}
                    valueLabelDisplay="on"
                    min={0}
                    max={200}
                    step={5}
                />
            </div>
        </Box>
    </Modal>
</div > */}