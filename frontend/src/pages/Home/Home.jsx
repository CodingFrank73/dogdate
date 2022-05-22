import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    // transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',

    // borderRadius: '12px',

    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Home = (props) => {
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
    const [error, setError] = useState('');

    const [open, setOpen] = useState(false);

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

        } catch (error) {

        }
    }

    const fetchSuggestionsWithTempFilter = async () => {
        try {
            console.log("filtered Value im MaxDistance:", filteredMaxDistance);
            console.log("filtered Value im AgeRang:", filteredAgeRange);
            console.log("filtered Value im Size:", filteredSize);
            console.log("filtered Value for Gender: ", filteredGender);

            const response = await fetch(apiBaseUrl + `/api/suggestion/withTempFilter`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ageRange: filteredAgeRange, maxDistance: filteredMaxDistance, gender: filteredGender, size: filteredSize })
            })

            const data = await response.json()
            console.log("suggestions with Temp Filter: ", data);
            // setSuggestions(data)


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
        } else {
            const result = filteredGender.filter(size => size !== "m")
            setFilteredGender(result)
            setIsGenderMClicked(false)
        }
    }

    const handleChangeGenderF = async (event) => {
        if (!isGenderFClicked) {
            setFilteredGender([...filteredGender, "f"])
            setIsGenderFClicked(true)
        } else {
            const result = filteredGender.filter(size => size !== "f")
            setFilteredGender(result)
            setIsGenderFClicked(false)
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
        } else {
            const result = filteredSize.filter(size => size !== "m")
            setFilteredSize(result)
            setIsSizeMClicked(false)
        }
    }

    const handleChangeSizeL = async (event) => {

        if (!isSizeLClicked) {
            setFilteredSize([...filteredSize, "l"])
            setIsSizeLClicked(true)
        } else {
            const result = filteredSize.filter(size => size !== "l")
            setFilteredSize(result)
            setIsSizeLClicked(false)
        }
    }





    return (
        <div>

            <div className="home">
                <div className="home-header">
                    <img className="home-dd-logo" src={ddLogo} alt="dogdate logo" />
                    <h2>dogdate</h2>
                    {/* <Button onClick={handleOpen}>Open modal</Button> */}
                    <img className="home-filter" src={filter} alt="filter" onClick={handleOpen} />
                </div>

                <div className="home-doggy-bigpic">
                    <SuggestionsStaple suggestions={suggestions} />

                    {/* <div className="dog-wrapper01">
                        <img src={dogImage01} alt="dog pic" />
                        <div className="dogName">Dimka, 5</div>
                        <div className="distanceKM">4 km</div>
                    </div>
                    <div className="dog-wrapper02">
                        <img src="/dogs/balu.png" alt="dog pic" />
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
                    </div> */}

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
                            <div className="genderLeft">Female</div>
                            <div className="genderRight">Male</div>
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
                            <div id="sizeSmall" className="sizeSmall" onClick={handleChangeSizeS}>S</div>
                            <div className="sizeMiddle" onClick={handleChangeSizeM}>M</div>
                            <div className="sizeLarge" onClick={handleChangeSizeL}>L</div>
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


export default Home;

