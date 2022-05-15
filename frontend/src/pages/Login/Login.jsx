import { useState } from 'react';
import apiBaseUrl from '../../api';

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
        <div>
            <form style={{ display: "flex", flexDirection: "column", width: "400px", margin: "50px auto" }}>
                <input type="text" name="email" id='' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="password" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={doLogin} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;