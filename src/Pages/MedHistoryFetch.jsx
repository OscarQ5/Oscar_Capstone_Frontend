import React from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';
import { Link} from "react-router-dom";

const MedHistoryFetch = () => {
    return (
        <div>
        <h1>Medicine Cabinet</h1>
<div className="cCard">

        <h2> <MedicalHistoryFetch/> </h2>

        <Link to="/users/home"><button>Back</button></Link>
        </div>
    </div>
);
    
};

export default MedHistoryFetch;