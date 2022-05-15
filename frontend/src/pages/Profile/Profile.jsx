
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import AccountSetting from "../../components/AccountSetting/AccountSetting";

import pic from '../../assets/img/ShittingDog.png'

function valuetext(value: number) {
    return `${value}°C`;
}

const Profile = () => {
    const [age, setAge] = useState([2, 4.5]);
    const [maxDistance, setMaxDistance] = useState(100);

    const handleChange = (event, newValueAge) => {
        setAge(newValueAge);
    };

    const handleChangeDistance = (event, newValueDistance) => {
        setMaxDistance(newValueDistance);
    };

    return (
        <div>
            <h1>Profile</h1>
            <img src={pic} alt="avatar" />
            <button>Edit</button>
            <AccountSetting />
            <h2>Plan Settings</h2>
            <p>CurrentPlan <span>free</span></p>
            <h2>Discovery Settings</h2>
            <p>Location <Link to="">My Current Location</Link></p>
            <p>Preferred Language <span>ENGLISH</span></p>
            <p>Show Me <span>ALL</span></p>

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





        </div >
    );
}

export default Profile;