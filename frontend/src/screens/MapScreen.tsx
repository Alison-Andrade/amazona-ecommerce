import React, { useEffect, useRef, useState } from 'react'
import {
    GoogleMap,
    LoadScript,
    Marker,
    StandaloneSearchBox,
} from '@react-google-maps/api'
import LoadingBox from '../components/LoadingBox'
import api from '../services/api'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'
import { useDispatch } from 'react-redux'
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstant'
import { useHistory } from 'react-router-dom'

const libs: Libraries = ['places']
const defaultLocation = { lat: -5.5406462, lng: -35.8322523 }

export default function MapScreen() {
    const history = useHistory()
    const [googleApiKey, setGoogleApiKey] = useState('')
    const [center, setCenter] = useState(defaultLocation)
    const [location, setLocation] = useState(center)
    const dispatch = useDispatch()

    const mapRef = useRef<any>(null)
    const placeRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    useEffect(() => {
        const fetch = async () => {
            await api.get('/api/config/google').then((response) => {
                setGoogleApiKey(response.data)
                getUserCurrentLocation()
            })
        }
        fetch()
    }, [])

    const onLoad = (map) => {
        mapRef.current = map
    }

    const onMarkerLoad = (marker) => {
        markerRef.current = marker
    }

    const onLoadPlaces = (place) => {
        placeRef.current = place
    }

    const onIdle = () => {
        setLocation({
            lat: mapRef.current?.center.lat(),
            lng: mapRef.current?.center.lng(),
        })
    }

    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation os not suported by this browser')
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            })
        }
    }

    const onPlacesChanged = () => {
        const place = placeRef.current?.getPlaces()[0].geometry.location
        setCenter({ lat: place.lat(), lng: place.lng() })
        setLocation({ lat: place.lat(), lng: place.lng() })
    }

    const onConfirm = () => {
        const places = placeRef.current?.getPlaces()
        if (places && places.length === 1) {
            // TODO: dispatch select action
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                },
            })
            alert('Location selected successfuly!')
            history.push('/shipping')
        } else {
            alert('Please enter your address.')
        }
    }

    return googleApiKey ? (
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap
                    id="sample-map"
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadPlaces}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <div className="map-input-box">
                            <input type="text" placeholder="Enter your address" />
                            <button
                                type="button"
                                className="primary"
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : (
        <LoadingBox />
    )
}
