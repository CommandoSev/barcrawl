import React, { useEffect, useRef } from 'react';
import end_point from '../images/Red_circle.png';
import med_point from '../images/Grey_circle.png';
import start_point from '../images/Green_circle.png';
import user_icon from '../images/example_user_icon.png';



// test users object, replace this with users from database

// managerservice:5433/get_attendee_locations?event_id=________

const users = [{"user_id": 2,
                "username": "Bob",
                "icon": '',
                "location": [21, 20]},
                
                {"user_id": 3,
                "username": "John",
                "icon": '',
                "location": [20, 21]},

                {"user_id": 4,
                "username": "Cena",
                "icon": '',
                "location": [22, 21]}
];

// test event locations object, replace with object from database
const event_locations = [
  {
      "event_id": 2,
      "owner_id": 1,
      "start_location": [
          20.0,
          20.0
      ],
      "waypoints": [
          [
              21.0,
              21.0
          ],
          [
              22.0,
              22.0
          ]
      ],
      "end_location": [
          23.0,
          23.0
      ],
      "creation_date": "2022-04-26 13:26:41.228426+00:00",
      "start_date": "2022-04-16 13:26:41.228426+00:00"
  }
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
        icon: user_icon
    }
    markerList.push(markerObject)
  } 

  // List of waypoint markers
  const waypointMarkerList = [];
  for (var j = 0; j < event_locations[0].waypoints.length; j++){
    var markerObjectWaypoints = {
      lat:  event_locations[0].waypoints[j][0],
      lng:  event_locations[0].waypoints[j][1],
      icon: med_point  
    }
    waypointMarkerList.push(markerObjectWaypoints)
  }

  // starting marker
  var startMarker = {
    lat:  event_locations[0].start_location[0],
    lng:  event_locations[0].start_location[1],
    icon: start_point  
  } 
  waypointMarkerList.push(startMarker)

  // ending  marker
  var endMarker = {
    lat:  event_locations[0].end_location[0],
    lng:  event_locations[0].end_location[1],
    icon: end_point  
  } 
  waypointMarkerList.push(endMarker)
  

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map(x => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    waypointMarkerList.map(x => {
      const marker = CreateMarkerWaypoints(x);
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
 
  // create user markers on map 
  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker height and width
      scaledSize: new window.google.maps.Size(24, 24)
    }
  });

  // create waypoint markers on map 
  const CreateMarkerWaypoints = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker height and width
      scaledSize: new window.google.maps.Size(30, 30)
    }
  });
 
  return <div
    ref={googleMapRef}
    style={{ width: 1000, height: 850 }}
  />
}
 
export default Map;