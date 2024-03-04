import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const API = import.meta.env.VITE_BASE_URL;


    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuButtonRef.current && !menuButtonRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setMenuOpen(false)
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <nav className="bg-orange-200 fixed w-full z-20 top-0 start-0 border-b dark:border-gray-300 py-5 shadow-lg">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <Link to={`/`} className='mx-6'>
                    <img src="/VillageLogo.png" alt="Logo with heart in hand" width="80"></img>
                    <span className='self-center my-2 text-sm font-semibold'>It takes a Village.....</span>
                </Link>

                <div className='flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse'>
                    <button
                        ref={menuButtonRef}
                        data-collapse-toggle="navbar-hamburger" type="button" onClick={toggleMenu} className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger"
                        aria-expanded={isMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 ${isMenuOpen ? ' ' : 'hidden'}`} id="navbar-hamburger">
                <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                    <li>
                        <Link to={`/`} className='block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600' aria-current="page"> Home</Link>
                    </li>
                    <li>
                        <Link to={`users/sign-up`} className='block py-2 px-3 text-gray-900 rounded hover:bg-yellow-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' aria-current="page"> Sign-up</Link>
                    </li>
                    <li>
                        <Link to={`/users/login`} className='block py-2 px-3 text-gray-900 rounded hover:bg-yellow-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' aria-current="page"> Sign In</Link>
                    </li>
                    <li>
                        <Link to={`/users/:user_id/profile`} className='block py-2 px-3 text-gray-900 rounded hover:bg-yellow-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' aria-current="page"> Profile</Link>
                    </li>
                    <li>
                        <Link to={`/users/:user_id/contacts`} className='block py-2 px-3 text-gray-900 rounded hover:bg-yellow-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' aria-current="page"> Emergency Contacts</Link>
                    </li>
                    <li>
                        <Link to={`/users/:user_id/medical`} className='block py-2 px-3 text-gray-900 rounded hover:bg-yellow-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' aria-current="page"> Medical History</Link>
                    </li>
                </ul>
            </div>

        </nav >
    );
};

export default Navbar;