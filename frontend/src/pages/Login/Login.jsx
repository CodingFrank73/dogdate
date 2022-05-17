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
                setError(firstError.msg + ": " + firstError.param)
                return
            }

            setError(result.err.message)

        } catch (error) {
            console.log("Error during login");
        }

    }


    return (
        <div className="profile">
            <div className="profile-header">
                <img className="profile-arrow-back" src={backarrow} alt="back" />
                <h2>Login</h2>
            </div>
            <form className='signup-box'>
                <input type="text" name="email" id='' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={doLogin} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;