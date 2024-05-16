import React from 'react';
import EmergencyContactsFetch from '../Components/EmergencyContactsFetch';
import '../Styles/ContactsFetchPage.css'
import { Link } from 'react-router-dom';

const ContactsFetchPage = () => {
    return (
        <div className="emContactsPageBody">
            <h1>Emergency Contacts</h1>
            <div className="cCard">
                <h2> <EmergencyContactsFetch /> </h2>
            </div>
            <div className="emButtons">
                <Link to="/users/contacts/new">  <img className="addUserButton" src="/contact-add.svg" alt="Add Emergency Contact" /> </Link>
                <Link to="/users/home"> <img className="backButton" src="/backButton2.svg" alt="Back Button" /></Link>
            </div>
        </div>
    );
};

export default ContactsFetchPage;