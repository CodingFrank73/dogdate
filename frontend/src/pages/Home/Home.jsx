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
    const [filteredGender, setFilteredGender] = useState(["f", "m"]);

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

    const handleChangeGender = async (event, newValueGender) => {

    }

    const handleChangeSize = async (event, newValueSize) => {
        console.log(event);
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

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Filter</Typography>

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
                            <div className="sizeSmall">S</div>
                            <div className="sizeMiddle">M</div>
                            <div className="sizeLarge">L</div>
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


                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                </Box>
            </Modal>


        </div >

    );
}

// function Item(props) {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }

export default Home;

