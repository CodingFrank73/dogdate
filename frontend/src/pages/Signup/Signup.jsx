
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiBaseUrl from "../../api"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import backarrow from '../../assets/icons/arrow-back.svg';
import InputLabel from '@mui/material/InputLabel';

const Signup = () => {
    const [dogName, setDogName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [bigImage, setBigImage] = useState();
    const [error, setError] = useState('');
    const [size, setSize] = useState("")
    const navigate = useNavigate();

    const doSignUp = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.set("dogName", dogName)
        formData.set("gender", gender)
        formData.set("dateOfBirth", new Date(dateOfBirth).toLocaleDateString('en-CA'))
        formData.set("email", email)
        formData.set("password", password)
        formData.set("size", size)
        // formData.set("bigImage", bigImage, bigImage.name)

        try {
            const response = await fetch(apiBaseUrl + '/api/users/register', {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (!result.err) {
                console.log("Hat geklappt..........");

                navigate("/login")
                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0];
                setError(firstError.msg + ":" + firstError.param);
                return
            }

            setError(result.err.message);

        } catch (error) {
            console.log("error..............");
        }
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <Link to={-1}>
                    <img className="profile-arrow-back" src={backarrow} alt="back" />
                </Link>
                <h2>Sign Up</h2>

            </div>
            <form className="signup-box">
                <input type="text" value={dogName} placeholder="Dog Name" onChange={(e) => setDogName(e.target.value)}></input>
                <input type="text" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)}></input>
                <input type="date" value={dateOfBirth} placeholder="DD/MM/YYYY" onChange={(e) => setDateOfBirth(e.target.value)}></input>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <div className="dataFrame">
                    <div className="dataLable">
                        <InputLabel id="labelLanguage"> Size</InputLabel></div>
                    <div className="dataData">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={size}
                            label="Size"
                            onChange={(e) => { setSize(e.target.value) }}
                        >
                            <MenuItem value="s">Small</MenuItem>
                            <MenuItem value="m">Medium</MenuItem>
                            <MenuItem value="l">Large</MenuItem>
                        </Select>
                    </div>
                </div>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" value={passwordConfirm} placeholder="Repeat Password" onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                <input type="file" placeholder="Picture" onChange={(e) => setBigImage(e.target.files[0])} />
                <button onClick={doSignUp} type="submit">SIGN UP</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signup;