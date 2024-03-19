import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '../Styles/UserLocation.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
const RADAR_API_KEY = import.meta.env.VITE_RADAR_API_KEY

const UserLocation = () => {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [currentMarkers, setCurrentMarkers] = useState([]);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (err) => {
                    console.error('Error getting user location:', err);
                }
            );
        } else {
            console.log('Geolocation is not supported in this browser.');
        }
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const address = data.features[0].place_name;
                setUserAddress(address);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching address:', err);
        }
    };

    const searchPlaces = async (category) => {
        if (!userLocation) return;

        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?bbox=${userLocation.longitude - 0.1},${userLocation.latitude - 0.1},${userLocation.longitude + 0.1},${userLocation.latitude + 0.1}&access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                setPlaces(data.features);
                removeMarkers();
                addMarkers(data.features);
            }
        } catch (err) {
            console.error(`Error fetching ${category}:`, err);
        }
    };

    const handleSearch = (category) => {
        searchPlaces(category);
    };

    const removeMarkers = () => {
        if (currentMarkers.length > 0) {
            currentMarkers.forEach(marker => marker.remove());
        }
    };

    const addMarkers = (places) => {
        const markers = places.map(place => {
            const popup = new mapboxgl.Popup({
                className: 'custom-popup',
            }).setText(place.place_name);

            const marker = new mapboxgl.Marker()
                .setLngLat(place.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);

            return marker;
        });

        setCurrentMarkers(markers);
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            getAddressFromCoordinates(userLocation.latitude, userLocation.longitude);
        }
    }, [userLocation]);

    useEffect(() => {
        if (map && userLocation) {
            const userMarker = new mapboxgl.Marker({
                color: '#FF0000'
            }).setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map);
        }
    }, [map, userLocation]);

    useEffect(() => {
        if (!userLocation || !MAPBOX_ACCESS_TOKEN) return;

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        const newMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 12,
        });
        if (map) {
            map.remove();
        }
        setMap(newMap);
    }, [userLocation]);

    return (
        <div className='userLocation'>
            {/* <h2>User Address:</h2> */}
            {loading ? <p>Loading...</p> : <h2>{userAddress}</h2>}
            {/* <h2>User Location Map</h2> */}
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
            <div id="map" style={{ width: '25vw', height: '300px' }}></div>

        </div>
    );
};

export default UserLocation;
