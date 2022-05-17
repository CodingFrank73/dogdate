import { useState, useEffect } from "react";

import { Link } from "react-router-dom";


const Home = () => {

    useEffect(() => {

    }, []);

    return (
        <div>
            <h1>Login erfolgreich</h1>
            <Link to="/profile" >Link to</Link>
        </div>

    );
}

export default Home;