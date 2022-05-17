
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


//pages and componentes
import AuthRequired from './components/AuthRequired/AuthRequired';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Splash from './pages/Start/Splash';
import SplashStart from './pages/Start/SplashStart';
import ProfileEditAvatar from './pages/Profile/ProfileEditAvatar';
import ProfileEditSettings from "./pages/Profile/ProfileEditSettings"

function AppRoutes() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const loginSuccess = (token) => {
        setToken(token);
        navigate("/home")
    }

    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/splashstart" element={<SplashStart />} />
            <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
            <Route path="/signup" element={<Signup />} />

          
            <Route path="/home" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Home token={token} />
                </AuthRequired>}
            />

            <Route path="/profile" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Profile token={token} />
                </AuthRequired>}
            />

            <Route path="/profile/profileEditAvatar" element={
                <AuthRequired token={token} setToken={setToken}>
                    <ProfileEditAvatar token={token} />
                </AuthRequired>}
            />
            <Route path="/profile/profileEditSettings" element={
                <AuthRequired token={token} setToken={setToken}>
                    <ProfileEditSettings token={token} />
                </AuthRequired>}
            />

             {/* <Route path="/profile/profileEditSettings" element={<ProfileEditSettings token={token} />} /> */}


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