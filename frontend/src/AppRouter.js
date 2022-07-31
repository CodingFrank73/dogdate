
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


//pages and componentes
import AuthRequired from './components/AuthRequired/AuthRequired';
import Match from './pages/Match/Match';
import Splash from './pages/Start/Splash';
import SplashStart from './pages/Start/SplashStart';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Like from './pages/Like/Like';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import ProfileEditAvatar from './pages/Profile/ProfileEditAvatar';
import ProfileEditSettings from "./pages/Profile/ProfileEditSettings"


function AppRoutes() {
    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const navigate = useNavigate();

    const loginSuccess = (token, profileImage) => {
        setToken(token);
        setProfileImage(profileImage);
        navigate("/home");
    }

    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/splashstart" element={<SplashStart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login loginSuccess={loginSuccess} />} />

            <Route path="/home" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Home token={token} />
                </AuthRequired>}
            />

            <Route path="/like" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Like token={token} profileImage={profileImage} />
                </AuthRequired>}
            />

            <Route path="/match" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Match token={token} />
                </AuthRequired>}
            />

            <Route path="/chat" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Chat token={token} />
                </AuthRequired>}
            />


            <Route path="/chatstatic" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Chat token={token} username={"Balto"} room={"1"} />
                </AuthRequired>}
            />


            <Route path="/profile" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Profile token={token} setToken={setToken} />
                </AuthRequired>}
            />

            <Route path="/profile/editProfileImage" element={
                <AuthRequired token={token} setToken={setToken}>/
                    <ProfileEditAvatar token={token} />
                </AuthRequired>}
            />
            <Route path="/profile/editSettings" element={
                <AuthRequired token={token} setToken={setToken}>
                    <ProfileEditSettings token={token} />
                </AuthRequired>}
            />

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