
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


//pages and componentes
import AuthRequired from './components/AuthRequired/AuthRequired';
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
import HomeWithTinderCard from './pages/Home/HomeWithTinderCard';
import Match from './pages/Like/Match';
import ChatStart from './pages/Chat/ChatStart';

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
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login loginSuccess={loginSuccess} />} />

            {/* <Route path="/home" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Home token={token} />
                </AuthRequired>}
            /> */}


            <Route path="/home" element={
                <AuthRequired token={token} setToken={setToken}>
                    <HomeWithTinderCard token={token} />
                </AuthRequired>}
            />

            <Route path="/like" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Like token={token} />
                </AuthRequired>}
            />

            <Route path="/chat" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Chat token={token} />
                </AuthRequired>}
            />

            {/* <Route path="/chat" element={
                <AuthRequired token={token} setToken={setToken}>
                    <ChatStart token={token} />
                </AuthRequired>}
            /> */}


            <Route path="/profile" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Profile token={token} setToken={setToken} />
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

            <Route path="/likes/match" element={
                <AuthRequired token={token} setToken={setToken}>
                    <Match token={token} />
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