import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/LandingHomePage.css'

const LandingHomePage = () => {
    return (
        <div className="home">
            <div className="h1andButton">
            <h1>Village</h1>
            <Link to={"users/login"}><button>Enter</button></Link>
            </div>
        </div>
    );
};

export default LandingHomePage;