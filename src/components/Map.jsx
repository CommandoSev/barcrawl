import React, { useEffect, useRef } from 'react';

// test users object, replace this with users from database
const users = [{"user_id": 2,
                "username": "Bob",
                "icon": 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
                "location": [18.516075, 10.219820]},
                
                {"user_id": 3,
                "username": "John",
                "icon": 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
                "location": [18.516075, 10.229820]}
];

const Map = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  // List of markers
  const markerList = []
  for (var i = 0; i < users.length; i++){
    var markerObject = {
        lat:  users[i].location[0],
        lng:  users[i].location[1],
        icon: users[i].icon
    }
    markerList.push(markerObject)
  } 

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map(x => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); 
  }, []);
 
  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
        center: { lat: 0, lng: 0 },
      zoom: 8
    });
  }
 
  // create marker on map 
  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker height and width
      scaledSize: new window.google.maps.Size(50, 50)
    }
  });
 
  return <div
    ref={googleMapRef}
    style={{ width: 1000, height: 1650 }}
  />
}
 
export default Map;