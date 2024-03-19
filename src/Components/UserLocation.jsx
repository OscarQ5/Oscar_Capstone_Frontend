import React, { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoib3NjYXI1IiwiYSI6ImNsdHhudnRycjA4enUya3FuaWliN2EzOGoifQ.42dh8eTDnmnVaSCkzjIkOw'
const RADAR_API_KEY = import.meta.env.VITE_RADAR_API_KEY

const UserLocation = () => {
    const [loading, setLoading] = useState(true)
    const [userLocation, setUserLocation] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [map, setMap] = useState(null)

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation({ latitude, longitude })
                },
                (err) => {
                    console.error('Error getting user location:', err)
                }
            )
        } else {
            console.log('Geolocation is not supported in this browser.')
        }
    }

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`, {
                headers: {
                    Authorization: `${RADAR_API_KEY}`
                }
            })
            const data = await response.json()
            if (data.addresses && data.addresses.length > 0) {
                const address = data.addresses[0].formattedAddress
                setUserAddress(address)
                setLoading(false)
            }
        } catch (err) {
            console.error('Error fetching address:', err)
        }
    }

    useEffect(() => {
        getUserLocation()
    }, [])

    useEffect(() => {
        if (userLocation) {
            getAddressFromCoordinates(userLocation.latitude, userLocation.longitude)
        }
    }, [userLocation])

    useEffect(() => {
        if (map && userLocation) {
            const marker = new mapboxgl.Marker().setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map)
        }
    }, [map, userLocation])

    useEffect(() => {
        if (!userLocation || !MAPBOX_ACCESS_TOKEN) return

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
        const newMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 12,
        });
        if (map) {
            map.remove();
        }
        setMap(newMap)
    }, [userLocation])

    return (
        <div>
            <h2>User Address:</h2>
            {loading ? <p>Loading...</p> : <p>{userAddress}</p>}
            <h2>User Location Map</h2>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    )
}

export default UserLocation