import { useState } from 'react';
import {
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Header from '../../components/Header/Header';
import CustomButton from '../../components/CustomButton/CustuomButton';
import apiBaseUrl from '../../api';

const Login = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('@gmx.de');
    const [password, setPassword] = useState('Brille123!');
    const [error, setError] = useState('');

    const doLogin = async (e) => {
        e.preventDefault();

        // TODO: prüfung ob login-felder leer sind

        try {
            const response = await fetch(apiBaseUrl + '/api/users/login', {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const result = await response.json();

            // login was successfull
            if (!result.err) {
                props.loginSuccess(result.token, result.currentUser)
                return
            }

            // login failed because of validationErrors
            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0]
                setError(firstError.msg + " : Login ist schief gelaufen")

                return
            }

            setError(result.err)

        } catch (error) {
            console.log("Error during login");
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="profile">

            {/* <div className="profile-header"> */}
            <Header headline={"Login"}></Header>
            {/* </div> */}


            <form className='signup-box'>
                <TextField
                    id="email"
                    label="Email Address"
                    name='email'
                    fullWidth
                    margin="dense"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    id="password"
                    label='Password'
                    name='password'
                    fullWidth
                    size="small"
                    margin="dense"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <div className="customButton-save">
                    <CustomButton clickHandler={doLogin} buttonText="Login"></CustomButton>
                </div>

            </form>
            {error && <p className='errorText'>{error}</p>}
        </div>
    );
}

export default Login;