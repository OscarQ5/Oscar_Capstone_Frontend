import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_API_KEY

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

function App() {
    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    const onMapLoad = (map) => {
        setMap(map);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentPosition(pos);
                    map.panTo(pos);
                },
                () => {
                    handleLocationError(true, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, map.getCenter());
        }
    };

    const handleLocationError = (browserHasGeolocation, currentPosition) => {
        console.log(
            browserHasGeolocation
                ? 'Error: The Geolocation service failed.'
                : 'Error: Your browser doesn\'t support geolocation.'
        );
    };

    const findNearestPlace = (map, type) => {
        if (!currentPosition || !map) return;

        const service = new window.google.maps.places.PlacesService(map);
        service.textSearch(
            {
                location: currentPosition,
                radius: 5000, // Search within 5km
                query: type, // Use the type as the query
            },
            (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    if (results.length > 0) {
                        const nearestPlace = results[0];
                        const placeLocation = nearestPlace.geometry.location;

                        // Create an AdvancedMarkerElement
                        const advancedMarker = new window.google.maps.Marker({
                            position: placeLocation,
                            map: map,
                            title: nearestPlace.name,
                        });

                        // Center map on the found place
                        map.panTo(placeLocation);
                    } else {
                        console.log(`No ${type} found`);
                    }
                } else {
                    console.log('Error fetching places');
                }
            }
        );
    };
    
    return (
        <LoadScript
            googleMapsApiKey={API_KEY}
            libraries={['places']}
            googleMapURL={googleMapURL}
        >
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={15}
                    center={currentPosition || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco
                    onLoad={onMapLoad}
                >
                    {currentPosition && (
                        <Marker
                            position={currentPosition}
                            title="Current Location"
                        />
                    )}
                </GoogleMap>
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                    <button onClick={() => findNearestPlace(map, 'hospital')}>Hospital</button>
                    <button onClick={() => findNearestPlace(map, 'police station')}>Police Station</button>
                    <button onClick={() => findNearestPlace(map, 'fire station')}>Fire Station</button>
                </div>

            </div>
        </LoadScript>
    );
}

export default App;
