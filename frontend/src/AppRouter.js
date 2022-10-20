
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
import ChatRoom from './pages/Chat/ChatRoom';

import Profile from './pages/Profile/Profile';
import EditImages from './pages/Profile/EditImages';
import EditSettings from './pages/Profile/EditSettings'
import EditSettings_Discovery from "./pages/Profile/EditSettings_Discovery";


function AppRoutes() {
    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const navigate = useNavigate();

    const loginSuccess = (token, currentUser) => {
        setToken(token);
        setProfileImage(currentUser.profileImage);
        setCurrentUsername(currentUser.dogName)
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
                    <Chat token={token} dogName={currentUsername} />
                </AuthRequired>}
            />

            <Route path="/room" element={
                <AuthRequired token={token} setToken={setToken}>
                    <ChatRoom token={token} />
                </AuthRequired>}
            />

            <Route path="/profile" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Profile token={token} setToken={setToken} />
                </AuthRequired>}
            />

            <Route path="/profile/editImages" element={
                <AuthRequired token={token} setToken={setToken}>/
                    <EditImages token={token} />
                </AuthRequired>}
            />

            <Route path="/profile/editSettings" element={
                <AuthRequired token={token} setToken={setToken}>
                    <EditSettings token={token} />
                </AuthRequired>}
            />

            <Route path="/profile/editSettingsDiscovery" element={
                <AuthRequired token={token} setToken={setToken}>/
                    <EditSettings_Discovery token={token} />
                </AuthRequired>}
            />

        </Routes >
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
};