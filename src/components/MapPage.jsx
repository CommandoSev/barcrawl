import React, { useState, useEffect } from 'react';
import Map from './Map';
 
// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyAEjuE0gQsjIIpp0CR8wRTHLVXjP7rwyqM';
 
// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}
 
const MapPage = () => {
  const [loadMap, setLoadMap] = useState(false);
 
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
 
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      {!loadMap ? <div>Loading...</div> : <Map />}
    </div>
  );
}
 
export default MapPage;