
import { useState } from "react";
import apiBaseUrl from "../../api"

import backarrow from '../../assets/icons/arrow-back.svg';

const Signup = () => {
    const [dogName, setDogName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [bigImage, setBigImage] = useState();
    const [error, setError] = useState('');


    const doSignUp = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.set("dogName", dogName)
        formData.set("gender", gender)
        formData.set("dateOfBirth", dateOfBirth)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("bigImage", bigImage, bigImage.name)

        try {
            const response = await fetch(apiBaseUrl + '/api/users/register', {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (!result.err) {
                console.log("Hat geklappt..........");
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
                <img className="profile-arrow-back" src={backarrow} alt="back" />
                <h2>Sign Up</h2>
            </div>
            <form className="signup-box">
                <input type="text" value={dogName} placeholder="Dog Name" onChange={(e) => setDogName(e.target.value)}></input>
                <input type="text" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)}></input>
                <input type="date" value={dateOfBirth} placeholder="DD/MM/YYYY" onChange={(e) => setDateOfBirth(e.target.value)}></input>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" value={passwordConfirm} placeholder="Repeat Password" onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                <input type="file" placeholder="Picture" onChange={(e) => setBigImage(e.target.files[0])} />
                <button onClick={doSignUp} type="submit">SIGN UP</button>
            </form>
        </div>
    );
}

export default Signup;