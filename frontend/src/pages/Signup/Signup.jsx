
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiBaseUrl from "../../api"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import backarrow from '../../assets/icons/arrow-back.svg';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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
    const [success, setSuccess] = useState("")

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

            if (password !== passwordConfirm) {
                setError("Your passwords do not match. Enter identical passwords.")
                return
            }

            if (!result.err) {
                console.log("gender", gender)
                console.log("Hat geklappt..........");
                setPassword("")
                setError("")
                setSuccess("All done - please login now and enjoy using this app!")
               // const myTimeout = setTimeout(navigate("/login"), 5000)
               // myTimeout()
                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0];
                setError(firstError.msg + ": " + firstError.param);
                console.log("ERROR", result.err.validationErrors)
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
                {/* <input type="text" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)}></input> */}
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                    <FormControlLabel value="f" control={<Radio />} label="Female" />
                    <FormControlLabel value="m" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
                <input type="date" value={dateOfBirth} placeholder="DD/MM/YYYY" onChange={(e) => setDateOfBirth(e.target.value)}></input>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
               
                 <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    >
                    <FormControlLabel value="s" control={<Radio />} label="Small" />
                    <FormControlLabel value="m" control={<Radio />} label="Medium" />
                    <FormControlLabel value="l" control={<Radio />} label="Large" />
                    </RadioGroup>
                </FormControl>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" value={passwordConfirm} placeholder="Repeat Password" onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                <input type="file" placeholder="Picture" onChange={(e) => setBigImage(e.target.files[0])} />
                <button onClick={doSignUp} type="submit">SIGN UP</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}

export default Signup;