
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AlertDialog from './AlertDelete';

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

    const [ageRange, setAgeRange] = useState([2, 4]);
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

    const [error, setError] = useState("")

    const navigate = useNavigate()

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
            setAgeRange([result.ageRange[0], result.ageRange[1]])
            setMaxDistance(result.maxDistance)

        } catch (error) {

        }
    }


    const handleChange = async (event, newValueAge) => {
        if (newValueAge[0] === ageRange[0] && newValueAge[1] === ageRange[1]) {
            return
        }
        setAgeRange(newValueAge);

        try {
            const response = await fetch(apiBaseUrl + '/api/users/myProfile/ageRange', {
                method: "PUT",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([newValueAge[0], newValueAge[1]])
            })

            const result = await response.json()

            if (!result.err) {
                console.log("success!!")

                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + ": " + firstError.param)
                return
            }

        } catch (error) {
            console.log("show me an error !!!!")
        }
    };


    const handleChangeDistance = async (event, newValueDistance) => {
        if (newValueDistance === maxDistance) {
            return  //value not changed -> cancel
        }

        setMaxDistance(newValueDistance)

        try {
            const response = await fetch(apiBaseUrl + '/api/users/myProfile/editMaxDistance', {
                method: "PUT",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ maxDistance: newValueDistance })
            })

            const result = await response.json()

            if (!result.err) {
                console.log("success!!")

                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + ": " + firstError.param)
                return
            }

        } catch (error) {
            console.log("show me an error !!!!")
        }
    }


    const changeLanguage = async (e) => {
        const updatedLanguage = e.target.value
        setLanguage(updatedLanguage)

        try {
            const response = await fetch(apiBaseUrl + '/api/users/myProfile/editLanguage', {
                method: "PUT",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ language: updatedLanguage })
            })

            const result = await response.json()

            if (!result.err) {
                console.log("success!!")

                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + ": " + firstError.param)
                return
            }

        } catch (error) {
            console.log("show me an error !!!!")
        }
    }


    const logout = () => {
        props.setToken(null)
        console.log("You are logged out")
    }

    const handleDelete = async (e) => {
        console.log("token", props.token)
        try {
            const response = await fetch(apiBaseUrl + "/api/users/myProfile/deleteAccount/", {
                method: "DELETE",
                headers: {
                    token: "JWT " + props.token,
                    "Content-Type": "application/json"
                },
            })

            const result = await response.json()

            if (!result.err) {
                console.log("successfully deleted!!")
                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + ": " + firstError.param)
                return
            }

        } catch (error) {
            console.log("show me an error !!!!")
        }
    }

    return (
        <div className="profile">
            <div className="profile-header">

                <Link to={-1}>
                    <img className="profile-arrow-back" src={backarrow} alt="back" />
                </Link>
                <h2>Profile</h2>
            </div>
            <div className="profileBody">
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
                    <Link to="/profile/profileEditSettings"><button className='headlineButton'>Edit</button></Link>
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
                    <div className="dataLable">Current Plan</div>
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
                            defaultValue={"English"}
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
                            value={ageRange}
                            onChangeCommitted={handleChange}
                            valueLabelDisplay="on"
                            min={0}
                            max={20}
                            step={1}
                        />
                    </div>

                    <div className="dataFrame">
                        <p>Maximum Distance</p>
                        <Slider
                            value={maxDistance}
                            onChangeCommitted={handleChangeDistance}
                            valueLabelDisplay="on"
                            min={0}
                            max={200}
                            step={5}
                        />
                    </div>
                </Box>

                <button onClick={logout} className="buttonLogout">
                    Logout
                </button>

                <AlertDialog token={props.token} />
                {/* <button className="buttonDeleteAccount" onClick={handleDelete}>
                    Delete Account
                </button> */}



            </div >

            <footer>
                <div className="nav">
                    <div><Link to="/home" ><img src={iconHome} alt="home" /></Link></div>
                    <div><Link to="/like" ><img src={iconLike} alt="like" /></Link></div>
                    <div><Link to="/chat" ><img src={iconChat} alt="chat" /></Link></div>
                    <div><Link to="/profile" ><img src={iconProfileaktiv} alt="profile" /></Link></div>
                </div>
            </footer>


        </div >
    );
}

export default Profile;