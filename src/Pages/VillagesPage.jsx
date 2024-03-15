import React from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider"
import { Link } from 'react-router-dom';
import AllVillages
 from '../Components/AllVillages';
const VillagesPage = () => {
    const {  user } = useLoginDataProvider()
    return (
        <div>
            <h1> My Villages </h1>
            <p>{<AllVillages />}</p>
<div className="addVillageButton">
     <Link to='/users/home'><button>Back</button></Link>

      <Link to="/users/villages/new"><button>Add Village</button></Link>      
</div>

        </div>
    );
};

export default VillagesPage;