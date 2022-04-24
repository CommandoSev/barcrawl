import React, { useEffect, useRef } from 'react';

// test users object, replace this with users from database
const users = [{"user_id": 2,
                "username": "Bob",
                "icon": 'https://i.pinimg.com/originals/85/78/bf/8578bfd439ef6ee41e103ae82b561986.png',
                "location": [39.653657, -3.276112]},
                
                {"user_id": 3,
                "username": "John",
                "icon": 'https://pngset.com/images/redstone-minecraft-pixel-art-download-maroon-first-aid-sweets-food-transparent-png-1062567.png',
                "location": [39.753657, -3.277112]},

                {"user_id": 4,
                "username": "Cena",
                "icon": 'https://freepngimg.com/download/minecraft/11-2-minecraft-diamond-png.png',
                "location": [39.854657, -3.275112]}
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