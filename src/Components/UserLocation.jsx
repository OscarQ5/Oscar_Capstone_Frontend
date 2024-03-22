import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '../Styles/UserLocation.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const UserLocation = () => {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [currentMarkers, setCurrentMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [route, setRoute] = useState(null);
    const [directions, setDirections] = useState(null);

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
        setRoute(null)
        setDirections(null)
        searchPlaces(category);
    };

    const removeMarkers = () => {
        if (currentMarkers.length > 0) {
            currentMarkers.forEach(marker => marker.remove());
        }
    };

    const addMarkers = (places) => {
        const markers = places.map(place => {
            const popupContent = `
                <div>
                    <p>${place.place_name}</p>
                    <button class="get-directions-btn" data-lng="${place.geometry.coordinates[0]}" data-lat="${place.geometry.coordinates[1]}">
                        Get Directions
                    </button>
                </div>
            `;
    
            const popup = new mapboxgl.Popup({
                className: 'custom-popup',
            }).setHTML(popupContent);
    
            const marker = new mapboxgl.Marker()
                .setLngLat(place.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
                marker.getElement().addEventListener('click', () => {
                    setSelectedPlace(place);
                })
            // Add event listener for the "Get Directions" button in the popup
            popup.on('open', () => {
                const btn = document.querySelector('.get-directions-btn');
                btn.addEventListener('click', () => {
                    handleDirections(place, popup);
                });
            });
              
            return marker;
        });
    
        setCurrentMarkers(markers);
    };

    const fetchRouteAndDirections = async (destination) => {
        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination.geometry.coordinates[0]},${destination.geometry.coordinates[1]}?geometries=geojson&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            setRoute(data.routes[0].geometry);
            setDirections(data.routes[0].legs[0].steps);
        } catch (err) {
            console.error('Error fetching route and directions:', err);
        }
    }

    const handleDirections = (destination, popup) => {
        fetchRouteAndDirections(destination);
        popup.remove(); // Close the popup
    }

    useEffect(() => {
        if (map) {
            if (route) {
                // Add or update route on the map
                if (map.getSource('route')) {
                    // If source exists, update data
                    map.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: route,
                    });
                } else {
                    // Otherwise, add new source and layer
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route,
                        },
                    });
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#007cbf',
                            'line-width': 8,
                        },
                    });
                }
            } else {
                // Remove route layer and source from the map
                if (map.getLayer('route')) {
                    map.removeLayer('route');
                }
                if (map.getSource('route')) {
                    map.removeSource('route');
                }
            }
        }
    }, [map, route]);
    

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
                color: '#E87400' 
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

    const closeDirections = () => {
        setRoute(null);
        setDirections(null);
    }

    return (
        <div className='userLocation'>
            {loading ? <h2>Loading...</h2> : <h2 className='userAddress'>{userAddress}</h2>}
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
            <div className="mapDivBody">
                <div id="map" style={{ width: '40vw', height: '400px' }}></div>
                {directions && (
                    <div className="mapDirections">
                        <div className="closeDirections">
                            <button className="closeDirectionsChar" onClick={closeDirections}>❌</button>
                        </div>
                        <h2 className="h2Directions">Directions</h2>
                        {directions.map((step, index) => (
                            <p key={index}>{step.maneuver.instruction}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLocation;