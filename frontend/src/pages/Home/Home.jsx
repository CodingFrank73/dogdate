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
    const [filteredAgeRange, setFilteredAgeRange] = useState([2, 4]);
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

        // {
        //     setIsSizeSClicked(true)
        //     
        // } else {
        //     setIsSizeSClicked(false)
        //     document.getElementById("sizeSmall").classList.toggle("sizeSmall-aktiv")
        // }

        // if (document.getElementById("sizeSmall").classList.contains("hidden-phone")) {
        //     document.getElementById("sizeSmall").classList.remove("hidden-phone")
        // } else {
        //     document.getElementById("sizeSmall").classList.add("hidden-phone")
        // }
        // document.getElementById("sizeSmall").classList.toggle("hidden-phone")

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

            const data = await response.json()
            console.log("Suggestions with default filter:", data);
            setSuggestions(data)

        } catch (error) {

        }
    }

    const fetchSuggestionsWithTempFilter = async () => {
        try {
            console.log("filtered Value im MaxDistance:", filteredMaxDistance);
            console.log("filtered Value im AgeRang:", filteredAgeRange);
            console.log("filtered Value im Size:", filteredSize);

            const response = await fetch(apiBaseUrl + `/api/suggestion/withTempFilter`, {
                method: "POST",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ageRange: filteredAgeRange, maxDistance: filteredMaxDistance })
            })

            const data = await response.json()
            console.log("suggestions with Temp Filter: ", data);
            setSuggestions(data)


        } catch (error) {

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
                        <p>Distance (in km)</p>
                        <Slider
                            value={filteredMaxDistance}
                            onChangeCommitted={handleChangeDistance}
                            valueLabelDisplay="on"
                            min={0}
                            max={200}
                            step={5}
                        />
                    </div>
                    <div className="dataFrame">
                        <p>Size</p>
                        <div className="sizeBox">
                            <div id="sizeSmall" className="sizeSmall" onClick={handleChangeSizeS}>S</div>
                            <div className="sizeMiddle" onClick={handleChangeSizeM}>M</div>
                            <div className="sizeLarge" onClick={handleChangeSizeL}>L</div>
                        </div>
                    </div>

                    <div className="dataFrame">
                        <p>Age Range</p>
                        <Slider
                            value={filteredAgeRange}
                            onChangeCommitted={handleChangeAgeRange}
                            valueLabelDisplay="on"
                            min={0}
                            max={20}
                            step={1}
                        />
                    </div>
                </Box>
            </Modal>


        </div >

    );
}


export default Home;

