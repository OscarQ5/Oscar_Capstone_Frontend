import React from 'react';
import LoginForm from '../Components/LoginForm';
import { useState } from 'react';

const LoginPage = () => {
    
    const [showBlurb, setShowBlurb] = useState(false)

    const toggleBlurb = () => {
        setShowBlurb(!showBlurb);
    }

    return (
        <div>
            <h2>Login <span onClick={toggleBlurb}>?</span></h2>

            {showBlurb && (
                <div className="blurb-SU">
                    <p>
                        Welcome Back to the Village - your digital community hub! Lets get you back to your Village.
                    </p>
                </div>
            )}
            <LoginForm />
        </div>
    );
};

export default LoginPage
