import { Link } from 'react-router-dom';
import { useState } from 'react';
import { image } from 'react';
import apiBaseUrl from '../../api';


import backarrow from '../../assets/icons/arrow-back.svg';

const Login = (props) => {
    const [email, setEmail] = useState('balto@gmx.de');
    const [password, setPassword] = useState('Brille123!');
    const [error, setError] = useState('');

    const doLogin = async (e) => {
        e.preventDefault();

        // prüfung ob login-felder leer sind

        try {

            const response = await fetch(apiBaseUrl + '/api/users/login', {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const result = await response.json();

            if (!result.err) {
                props.loginSuccess(result.token)
                return
            }

            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + ": " + "Login ist schief gelaufen")

                return
            }

            setError(result.err)


        } catch (error) {
            console.log("Error during login");
        }

    }


    return (
        <div className="profile">
            <div className="profile-header">
                <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
                <h2>Login</h2>
            </div>
            <form className='signup-box'>
                <input type="email" name="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={doLogin} type="submit">Login</button>
            </form>
            {error && <p className='errorText'>{error}</p>}
        </div>
    );
}

export default Login;