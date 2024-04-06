import React from 'react';
import '../Styles/About.css'

const About = () => {
    return (
        <div className="aboutBody">
            <br/>
            <br/>
            <br/>
            <br/>
            <br />
            <div className="about">
                <h2>About Village</h2>
                <p>Village is a desktop and mobile friendly application designed to enhance communication and coordination among parents, friends, and loved ones. With a range of features including geolocation tracking, resource locators, and messaging capabilities, the app simplifies the process of staying connected, safe, and organized within family units. Its primary goal is to streamline communication and improve coordination between caregivers, ensuring better care and support for children, family members, and friends.</p>
            </div>

            <div className="howToUse">
                <h2>How to Use:</h2>
                <ul>
                    <li>Sign Up and Customize Your Village:
                        <p>Begin by signing up for Village and tailor your experience to suit your needs.</p>
                    </li>
                    <li>Emergency Situation:
                        <p>In times of emergency, simply press the red button on the profile page to access all safety features.</p>
                    </li>
                    <li>Emergency Page:
                        <p>Upon entering the Emergency Page, you'll find three buttons positioned above the map:</p>
                        <ul>
                            <div className='buttonOpt'>
                            <li>Fire Station</li>
                            <li>Police</li>
                            <li>Hospital</li>
                            </div>
                        </ul>
                        <p>Click on the relevant button to discover the nearest emergency service option. Once selected, click on the marker to receive the route and directions.</p>
                    </li>
                    <li>Distress Messaging:
                        <p>Village users have the option to send a distress message to their Village, make direct calls to emergency services, or both, using the buttons located below the map.</p>
                        <p>Speech-to-text functionality is available to expedite messaging if needed.</p>
                        <p>Once sent, the message, along with the user's current location and optional Medical Information, will be distributed to all members within the selected Village. Village members can then take appropriate action to ensure the safety and wellbeing of the user in distress.</p>
                    </li>
                </ul>
            </div>
            
        </div>
    );
};

export default About;