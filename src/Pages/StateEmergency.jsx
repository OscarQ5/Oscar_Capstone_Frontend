import React from 'react';
import FetchLocation from "../Components/FetchLocation.jsx";
import '../Styles/StateEmergency.css'
const StateEmergency = () => {
    return (
        <div>
            <FetchLocation />

            <div className="emergencyButtons">

                <div className='buttonDiv'>
                    <h4>  911 </h4>
                    <a href="tel:911">
                        <img class="emergencyServices" src="/blueStar.svg" alt="Emergency Services" />
                    </a>
                </div>

                <div className='buttonDiv'>
                    <h4>  911 + Village </h4>
                    <img className="emergencyServices" src="/arrows.svg" alt="Emergency Services" />
                </div>

                <div className='buttonDiv'>
                    <h4>  Village </h4>
                    <img className="emergencyServices" src="/community.svg" alt="Emergency Services" />
                </div>

            </div>
        </div>
    );
};

export default StateEmergency;