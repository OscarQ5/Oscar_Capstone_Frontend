import React from 'react';
import FetchLocation from "../Components/FetchLocation.jsx";
import UserLocation from '../Components/UserLocation.jsx';
import '../Styles/StateEmergency.css'
const StateEmergency = () => {
    return (
        <div>
            {/* <FetchLocation /> */}
            <UserLocation />
            <div className="emergencyButtons">

                <div className='buttonDiv'>
                    <h4>  911 </h4>
                    <a href="tel:911">
                        <img className="emergencyServices" src="/blueStar.svg" alt="Emergency Services" />
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