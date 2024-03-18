import React from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider"
import { Link } from 'react-router-dom';
import AllVillages from '../Components/AllVillages';
import '../Styles/VillagesPage.css'


const VillagesPage = () => {
    // const { user } = useLoginDataProvider()
    return (
        <div>
            <h1> My Villages </h1>
              <AllVillages />
            <div className="addVillageButton">
                <Link to="/users/villages/new"><button className='villageAdd'>Add Village</button></Link>
                <Link to='/users/home'><button className="villageBack">Back</button></Link>
            </div>

        </div>
    );
};

export default VillagesPage;