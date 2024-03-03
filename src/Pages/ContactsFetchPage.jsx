import React from 'react';
import EmergencyContactsFetch from '../Components/EmergencyContactsFetch';
import '../Styles/ContactsFetchPage.css'
import { Link } from 'react-router-dom';

const ContactsFetchPage = () => {
    return (
        <div>
            <h1>Emergency Contacts</h1>
<div className="cCard">
            <h2> <EmergencyContactsFetch/> </h2>

            <Link to="/users/home"><button>Back</button></Link>
            </div>
        </div>
    );
};

export default ContactsFetchPage;