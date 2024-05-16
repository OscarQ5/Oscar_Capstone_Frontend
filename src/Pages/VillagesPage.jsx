import React from 'react';
import { Link } from 'react-router-dom';
import AllVillages from '../Components/AllVillages';
import '../Styles/VillagesPage.css'


const VillagesPage = () => {

    return (
        <div className="villagePageBody">
            <h1> My Villages </h1>
            <div className='myVillageBodyMaster'>
                <div className='villageBubble'>
                    <AllVillages />
                </div>
                <div className="addVillageButton">
                    <Link to="/users/villages/new"><button className='villageAdd'>Add Village</button></Link>
                    <Link to='/users/home'><button className="villageBack">Back</button></Link>
                </div>
            </div>
        </div>
    );
};

export default VillagesPage;