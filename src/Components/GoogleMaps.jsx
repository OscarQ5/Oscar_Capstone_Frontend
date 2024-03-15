import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import "../Styles/GoogleMaps.css";

const containerStyle = {
    width: '450px',
    height: '300px'
};

const GoogleMapsComponent = ({ locations, userLocation }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY
    const onMarkerClick = (location) => {
        setSelectedMarker(location);
    };

    const onInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation || { lat: 40.712776, lng: -74.005974 }}
                zoom={13}
            >
                {userLocation && (
                    <Marker
                        position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                        title="Your Location"
                    />
                )}

                {Array.isArray(locations) &&
                    locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={{ lat: location.latitude, lng: location.longitude }}
                            title={location.name}
                            onClick={() => onMarkerClick(location)}
                        />
                    ))
                }

                {selectedMarker && (
                    <InfoWindow
                        position={{
                            lat: selectedMarker.latitude,
                            lng: selectedMarker.longitude,
                        }}
                        onCloseClick={onInfoWindowClose}
                    >
                        <div>
                            {/* Add information to display in the InfoWindow */}
                            <h3>Name: {selectedMarker.name}</h3>
                            <p>{selectedMarker.address}</p>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapsComponent;