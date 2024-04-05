import React, { useState } from 'react';
import '../Styles/ColorChange.css'
function ColorChange() {

    const [isWhiteBackground, setIsWhiteBackground] = useState(false);

    function changeBackgroundColor() {

        if (isWhiteBackground) {
            document.body.style.background = ' radial-gradient(ellipse at bottom, #10161e 0%, #12141d 100%)'; //  original color
        } else {
            document.body.style.background = 'radial-gradient(ellipse at bottom, #ffffff 0%, #12141d 100%)'; //  white
        }

        setIsWhiteBackground(!isWhiteBackground);
    }

    return (
        <button
            onClick={changeBackgroundColor}
            className='colorChange'
        >
            {isWhiteBackground ? '☀️' : '🌙'}
        </button>
    );
}

export default ColorChange;