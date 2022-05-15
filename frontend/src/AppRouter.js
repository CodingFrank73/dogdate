import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

//pages and componentes
import Signup from './pages/Signup/Signup';

function AppRoutes() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const loginSuccess = (token) => {
        setToken(token);
        navigate("/home")
    }

    return (
        <Routes>
            <Route path="/" element={<Signup />} />
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