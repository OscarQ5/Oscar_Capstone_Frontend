import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapsComponent from './GoogleMaps';
import '../Styles/FetchLocation.css'
const API_KEY = import.meta.env.VITE_API_KEY;

const FetchLocation = () => {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  const endpoint = 'http://localhost:5555';

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );

        const formattedAddress =
          response.data.results && response.data.results[0]
            ? response.data.results[0].formatted_address
            : 'No address found';

        setUserAddress(formattedAddress);
      } catch (error) {
        console.error('Error getting location or fetching address:', error);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchNearestPlace = async (type) => {
    if (!userLocation) {
      console.error('User location not available.');
      return;
    }

    try {
      const response = await axios.get(`${endpoint}/nearest?type=${type}&lat=${userLocation.latitude}&lng=${userLocation.longitude}`);
      setLocations([response.data]);
    } catch (error) {
      console.error(`Error fetching nearest ${type}:`, error.message);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(endpoint);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className='application'>
      <button className="myLocation" onClick={getUserLocation}>My Location</button>
      <p>{userAddress ? <h3 className="userAddress">{userAddress}</h3> : null}</p>

      <div className="mapButtons">

        <div className="mapButtonDiv">
          <h4>Fire</h4>
          <img onClick={() => handleSearch('fire_station')} className="fireStation" src="/fireStationsvg.svg" alt="Fire Station Button" />
        </div>

        <div className="mapButtonDiv">
        <h4>Police</h4>
          <img onClick={() => handleSearch('police')} className="policeStation" src="/policeStation.svg" alt="Police Station Button" />
        </div>

        <div className="mapButtonDiv">
        <h4>Hospital</h4>
          <img onClick={() => handleSearch('hospital')} className="hospitalStation" src="/hospitalStation.svg" alt="Hospital Button" />
        </div>

      </div>

      <div className="map-container">
        <GoogleMapsComponent locations={locations} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default FetchLocation;
