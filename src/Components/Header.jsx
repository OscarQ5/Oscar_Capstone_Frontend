import React from 'react';

const Header = () => {
    return (
        <div className='bg-gray-400 fixed w-full z-20 top-0 start-0 border-b dark:border-gray-300 py-6 shadow-lg'>
            <div className=''>
                <a href="/Signin">
                    <img src="./login.png" alt="Sign In icon" width="75" className='relative bottom-4 right-1 hover:bg-red-800'></img>
                </a>
            </div>
            <div className="">
                <a href="/Signup">
                    <img src="./sign-up.png" alt="Sign up icon" width="65" className='absolute right-5 top-5 py-2 px-2 hover:bg-red-800'></img>
                </a>
            </div>
        </div>

    );
};

export default Header;