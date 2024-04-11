import React, { useState } from 'react';
import '../Styles/ColorChange.css'
function ColorChange() {

    const [isWhiteBackground, setIsWhiteBackground] = useState(false);

    function changeBackgroundColor() {

        if (isWhiteBackground) {
            document.body.style.background = ' radial-gradient(ellipse at bottom, #10161e 0%, #12141d 100%)'; //  dark mode
        } else {
            document.body.style.background = 'linear-gradient(90deg, rgba(255,223,179,1) 0%, rgba(254,178,60,1) 0%)'; //  light mode
            // document.body.style.background = 'linear-gradient(90deg, rgba(242,200,65,1) 0%, rgba(254,198,112,1) 39%, rgba(246,195,59,1) 97%)'


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