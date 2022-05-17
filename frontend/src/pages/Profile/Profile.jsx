
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//  BILDER-IMPORT
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChat from '../../assets/icons/chat.svg';
import iconProfilaktiv from '../../assets/icons/profil-aktiv.svg';



import pic from '../../assets/img/shittingDogColor.png'

import apiBaseUrl from "../../api"

const Profile = (props) => {

    const [age, setAge] = useState([2, 4.5]);
    const [maxDistance, setMaxDistance] = useState(100);
    const [dogname, setDogname] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [size, setSize] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('English');
    const [filterGender, setFilterGender] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const languages = [
        { value: "English" },
        { value: "French" },
        { value: "Spanish" },
        { value: "Chinese" },
        { value: "Arabic" },
        { value: "Portuguese" },
        { value: "Japanese" },
        { value: "German" },
    ]

    useEffect(() => {
        fetchData()
            .then(console.log())
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/myProfile`, {
                headers: {
                    token: "JWT " + props.token
                }
            })
            const result = await response.json()

            setProfileImage(result.profileImage);
            setDogname(result.dogName)
            setGender(result.gender);
            setEmail(result.email)
            setDateOfBirth(result.dateOfBirth)
            setSize(result.size)
            setPhone(result.phone)
            setLocation(result.location);
            setLanguage(result.language);
            setFilterGender(result.filterGender);
            setFilterSize(result.filterSize);
            setPlan(result.plan)
            setAge([result.ageRangeMin, result.ageRangeMax])

        } catch (error) {

        }
    }


    const handleChange = (event, newValueAge) => {
        setAge(newValueAge);
    };

    const handleChangeDistance = (event, newValueDistance) => {
        setMaxDistance(newValueDistance);
    };

    const changeLanguage = (e) => {
        setLanguage(e.target.value)
    }

    return (
        <div className="profil">
            <div className="profil-header">
                <img className="profil-arrow-back" src={backarrow} alt="back" />
                <h3>Profil</h3>
            </div>
            <div className="profilBody">
                {/* <Link to="/profileEditAvatar" >Stift</Link> */}
                <div className="profilPic">
                    <img src={profileImage !== null ? profileImage : pic} alt="avatar" />
                </div>
                <Link to="/profile/profileEditAvatar" >Stift</Link>
                <h2>Account Settings</h2>
                <Link to="/profile/profileEditSettings"><button>Edit</button></Link>

                <p>Name <span>{dogname}</span></p>
                <p>Gender <span>{gender}</span></p>
                <p>DateOfBirth <span>{dateOfBirth}</span></p>
                <p>Size <span>{size}</span></p>
                <p>Email <span>{email}</span></p>
                <p>Phone number <span>{phone}</span></p>

                <h2>Plan Settings</h2>
                <p>CurrentPlan <span>{plan}</span></p>

                <h2>Discovery Settings</h2>
                <p>Location <Link to="">My Current Location</Link></p>

                <InputLabel id="labelLanguage"> Preferred Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="PreferredLanguage"
                    onChange={changeLanguage}
                >
                    <MenuItem value="German">German</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="Arabic">Arabic</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                    <MenuItem value="Polish">Polish</MenuItem>
                </Select>


                <p>Show Me <span>{filterGender}</span></p>
                <p>Size <span>{filterSize}</span></p>


                <Box sx={{ width: 300 }}>
                    <p>Age Range</p>
                    <Slider
                        value={age}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        min={0}
                        max={20}
                        step={.5}
                    />

                    <p>Maximum Distance</p>
                    <Slider
                        value={maxDistance}
                        onChange={handleChangeDistance}
                        valueLabelDisplay="on"
                        min={0}
                        max={200}
                        step={5}
                    />
                </Box>

                <button>
                    Logout
                </button>

                <button>
                    Delete Account
                </button>
            </div>
            <footer>
                <div className="nav">
                    <div><img src={iconHome} alt="home" /></div>
                    <div><img src={iconLike} alt="like" /></div>
                    <div><img src={iconChat} alt="chat" /></div>
                    <div><img src={iconProfilaktiv} alt="profil" /></div>
                </div>
            </footer>


        </div >
    );
}

export default Profile;