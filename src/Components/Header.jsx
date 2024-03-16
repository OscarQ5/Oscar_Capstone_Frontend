import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/Header.css';

const Header = () => {

    const API = import.meta.env.VITE_BASE_URL;

    return (

        <div className='header-bg'>
            <Link to={`/users/login`}>
                <img src="./login.png" alt="Sign In icon" className='login-style' />
            </Link>

            <Link to={`/users/Sign-up`} >
                <img src="./signup.png" alt="Sign up icon" className='signup-style' />
            </Link>

        </div>


    );
};

export default Header;
