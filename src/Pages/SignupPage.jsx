import React from 'react';
import SignupForm from '../Components/SignupForm';
import { useState } from 'react';

const SignupPage = () => {
    
    const [showBlurb, setShowBlurb] = useState(false)

    const toggleBlurb = () => {
        setShowBlurb(!showBlurb);
    }

    return (
        <div>
            <h2>Sign Up <span onClick={toggleBlurb}>?</span></h2>

            {showBlurb && (
                <div className="blurb-SU">
                    <p>
                        Welcome to the Village - your digital community hub! Sign up now to connect with family and friends.
                    </p>
                </div>
            )}
            <SignupForm />
        </div>
    );
};

export default SignupPage