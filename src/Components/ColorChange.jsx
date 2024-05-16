import React, { useState } from 'react';
import '../Styles/ColorChange.css'
function ColorChange() {

    const [isWhiteBackground, setIsWhiteBackground] = useState(false);

    function changeBackgroundColor() {
        if (isWhiteBackground) {
            document.body.style.background = ' radial-gradient(ellipse at bottom, #10161e 0%, #12141d 100%)';
        } else {
            document.body.style.background = 'linear-gradient(90deg, rgba(255,223,179,1) 0%, rgba(254,178,60,1) 0%)';
        }
        setIsWhiteBackground(!isWhiteBackground);
    }

    return (
        <button
            onClick={changeBackgroundColor}
            className='colorChange'
            title="Light Mode"
        >
            {isWhiteBackground ? '☀️' : '🌙'}
        </button>
    );
}

export default ColorChange;