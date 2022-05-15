
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


//pages and componentes
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Splash from './pages/Start/Splash';
import SplashStart from './pages/Start/SplashStart';

function AppRoutes() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const loginSuccess = (token) => {
        setToken(token);
        console.log(token.sub);
        navigate("/home")
    }

    return (
        <Routes>
            <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile token={token} />} />
        </Routes>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
};