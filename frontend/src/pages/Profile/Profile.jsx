
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
import iconProfileaktiv from '../../assets/icons/profile-aktiv.svg';
import iconpen from '../../assets/icons/pen.svg';



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
            setDateOfBirth(new Date(result.dateOfBirth).toLocaleDateString('en-CA'))
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
        <div className="profile">
            <div className="profile-header">
                <img className="profile-arrow-back" src={backarrow} alt="back" />
                <h2>Profile</h2>
            </div>
            <div className="profileBody">
                {/* <Link to="/profileEditAvatar" >Stift</Link> */}
                <div className="profilePic">
                    <img src={profileImage !== null ? profileImage : pic} alt="avatar" />
                    <div className="editProfilepic">
                        <Link to="/profile/profileEditAvatar" >
                            <img src={iconpen} alt="home" />
                        </Link>
                    </div>
                </div>

                <div className="headlineFrame">
                    <h3>Account Settings</h3>
                    <button className='headlineButton'>Edit</button>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Name </div>
                    <div className="dataData">{dogname}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Gender </div>
                    <div className="dataData">{gender}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Date Of Birth </div>
                    <div className="dataData">{dateOfBirth}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Size</div>
                    <div className="dataData">{size}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Email</div>
                    <div className="dataData">{email}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Phone number</div>
                    <div className="dataData">{phone}</div>
                </div>


                <h3>Plan Settings</h3>
                <div className="dataFrame">
                    <div className="dataLable">Current Planr</div>
                    <div className="dataData colorHighlight">{plan}</div>
                </div>
                <h3>Discovery Settings</h3>
                <div className="dataFrame">
                    <div className="dataLable">Location</div>
                    <div className="dataData colorHighlight"><Link to="">My Current Location</Link></div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">
                        <InputLabel id="labelLanguage"> Preferred Language</InputLabel></div>
                    <div className="dataData">
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
                    </div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Show me</div>
                    <div className="dataData">{filterGender}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Size</div>
                    <div className="dataData">{filterSize}</div>
                </div>

                <Box >
                    <div className="dataFrame">
                        <p>Age Range</p>
                        <Slider
                            value={age}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            min={0}
                            max={20}
                            step={.5}
                        />
                    </div>

                    <div className="dataFrame">
                        <p>Maximum Distance</p>
                        <Slider
                            value={maxDistance}
                            onChange={handleChangeDistance}
                            valueLabelDisplay="on"
                            min={0}
                            max={200}
                            step={5}
                        />
                    </div>
                </Box>

                <button className="buttonLogout">
                    Logout
                </button>
                <button className="buttonDeleteAccount">
                    Delete Account
                </button>

            </div >

            <footer>
                <div className="nav">
                    <div><img src={iconHome} alt="home" /></div>
                    <div><img src={iconLike} alt="like" /></div>
                    <div><img src={iconChat} alt="chat" /></div>
                    <div><img src={iconProfileaktiv} alt="profile" /></div>
                </div>
            </footer>


        </div >
    );
}

export default Profile;