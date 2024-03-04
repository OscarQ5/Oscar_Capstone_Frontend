import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../Styles/FriesNavbar.css';

const FriesNavbar = () => {
    const API = import.meta.env.VITE_API_URL;

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const closeMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        }
    }, []);

    return (
        <nav className='friesnavbar-style'>
            <Router>
                <Link to={`${API}/`} >
                    <img src='./VillageLogo.png' alt='Logo with heart in hand' width="80" className='logo'></img>
                </Link>
                <h5 className='logo-caption'>It takes a Village...</h5>

                <div className='fries-btn-container'>
                    <button type="button" ref={menuRef} className={`fries-btn ${openMenu ? 'open' : ''}`} onClick={toggleMenu}>
                        <div className='fry'></div>
                        <div className='fry short'></div>
                        <div className='fry'></div>
                    </button>

                    {openMenu && (
                        <div className='dropdown-content'>
                            <ul className='ul-style'>
                                <li>
                                    <Link to={'/'} className='Link'> Home </Link>
                                </li>
                                <li>
                                    <Link to={`${API}/users/Sign-up`} className='Link'> Sign Up </Link>
                                </li>
                                <li>
                                    <Link to={`${API}/users/login`} className='Link'> Log in </Link>
                                </li>
                                <li>
                                    <Link to={`${API}/users/:user_id/profile`} className='Link'> Profile </Link>
                                </li>
                                <li>
                                    <Link to={`${API}/users/:user_id/contacts`} className='Link'> Emergency Contacts </Link>
                                </li>
                                <li>
                                    <Link to={`${API}/users/:user_id/medical`} className='Link'> Medical History</Link>
                                </li>
                            </ul>
                        </div>

                    )}
                </div>
            </Router>
        </nav>
    );
};

export default FriesNavbar;