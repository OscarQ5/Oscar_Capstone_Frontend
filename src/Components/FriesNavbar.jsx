import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../Styles/FriesNavbar.css';


const FriesNavbar = () => {
    const API = import.meta.env.VITE_BASE_URL;

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

            <Link to={`/`} >
                <img src='../VillageLogo.png' alt='Logo with heart in hand' className='logo' />
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
                                <Link to={'/users/sign-up'} className='Link'> Sign Up </Link>
                            </li>
                            <li>
                                <Link to={'/users/login'} className='Link'> Log in </Link>
                            </li>
                            <li>
                                <Link to={'/users/sign-up/:user_id/profile'} className='Link' > Profile </Link>
                            </li>
                            <li>
                                <Link to={'/users/contacts'} className='Link'> Emergency Contacts </Link>
                            </li>
                            <li>
                                <Link to={'/users/medical'} className='Link'> Medical History </Link>
                            </li>
                        </ul>
                    </div>

                )}
            </div>

        </nav>
    );
};

export default FriesNavbar;