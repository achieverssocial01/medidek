// import React, { useState , useRef} from 'react';
// import { Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
// // import { useRecoilState } from 'recoil';
// // import { Userdata } from '../Recoil/Atom';
// import axios from 'axios';
// import { axiosClient } from '../utils/axiosClient';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



// const Location = (props) => {
//   const ref = useRef()

//   const [Locations, setLocations] = useState();

//   const [searchText, setSearchText] = useState("");
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const handleSearch = (text) => {
//     setSearchText(text);
//     const filtered = Locations.filter(location =>
//       location.city.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredLocations(filtered);
//   };

//   const handleLocationSelect = async (item) => {
//     try {
//       setSearchText(item.city);
//       setFilteredLocations([]);
//       let result = await axiosClient.put(`updateUserpatientByapp/${User[0]._id}`, { location: item.city })
//       setUser((prev) => {
//         return [{ ...prev[0], location: item.city }]
//       })

//       if (result.data.statusCode === 201) {
//         props.navigation.navigate("Indexpage")
//       }
//     } catch (error) {
//       console.log(error)
//     }

//   };

//   const renderLocationItem = ({ item }) => (
//     <TouchableOpacity onPress={() => handleLocationSelect(item)}>
//       <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
//         <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 25 }} />
//         <Text style={{ padding: 10, color: "black" }}>{item.city}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF" }}>
//       <View
//           style={{
//             flexDirection: "row",
//             width: "100%",
//             alignItems: "center",
//             borderRadius: 20,
//             paddingHorizontal: 16,
//             backgroundColor: "#DCE3F6",
//             marginVertical: 10,
//           }}
//         >
//           <Image source={require("../Assets/location.png")} style={{ width: 18, height: 24 }} />
//           <GooglePlacesAutocomplete
//             ref={ref}
//             placeholder='Search'
//             styles={{
//               textInputContainer: {
//                 backgroundColor: '#DCE3F6',
//               },
//               textInput: {
//                 height: 38,
//                 color: '#5d5d5d',
//                 fontSize: 16,
//                 backgroundColor: "#DCE3F6"
//               },
//               predefinedPlacesDescription: {
//                 color: '#1faadb',
//               },
//             }}
//             onPress={(data, details = null) => {
//               // 'details' is provided when fetchDetails = true
//               console.log(data.description);
//             }}
//             isRowScrollable={true}
//             query={{
//               key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
//               language: 'en',
//             }}
//           />

//         </View>

//         {filteredLocations.length > 0 && (
//           <FlatList
//             data={filteredLocations}
//             renderItem={renderLocationItem}
//             keyExtractor={(item) => item.city}
//             style={{ backgroundColor: '#FFFFFF', width: "50%", borderRadius: 10, paddingHorizontal: 10 }}
//           />
//         )}
//       </View>
//     </>
//   );
// };

// export default Location;













// import { StyleSheet, Text, View, Button, TextInput, Platform, PermissionsAndroid } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




// const Location = () => {
//   return (
//     <View style={styles.container}>
//       <View>
//        <GooglePlacesAutocomplete
//       placeholder='Search'
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       query={{
//         key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
//         language: 'en',
//       }}
    
//     />
//     </View>
//     {/*Render our MapView*/}
//       <MapView
//         style={styles.map}
//         //specify our coordinates.
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     </View>
//   );
// }

// export default Location

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1, //the container will fill the whole screen.
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });






import { StyleSheet, Text, View, Button, TextInput, Platform, PermissionsAndroid } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
// import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS} from 'react-native-permissions';



const Map = () => {
  const mapRef = useRef(null);

  const [origin, setOrigin] = useState()
  const [destination, setDestination] = useState()
  const [permissiongranter, setPermissiongranter] = useState(false)
  const [location, setLocation] = useState(false);
  // const [region, setRegion] = useState({
  //   latitude: 21.250367,
  //   longitude: 81.638294,
  //   latitudeDelta: 0.05,
  //   longitudeDelta: 0.05,
  // })

  const [Mlati, setMlati] = useState(0)
  const [Mlong, setMlong] = useState(0)

  const [marker, setMarker] = useState([
    {
      id: 1,
      latitude: 21.250367,
      longitude: 81.638294,
    },
    {
      id: 2,
      latitude: 21.166557,
      longitude: 79.123989,
    },
    {
      id: 3,
      latitude: 21.286012,
      longitude: 80.810149,
    },
  ]
  )

  useEffect(() => {
    requestLocationPermission()
  })

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            setMlati(location.coords.latitude)
            setMlong(location.coords.longitude)
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };


  async function moveaToLocation(latitude, longitude) {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.121,
    },
      2000,
    );
  }

  // if(!permissiongranter) return(
  // <View>
  //   <Text>
  //     Please Allow Location Permission to Continue
  //   </Text>

  // </View>
  // )

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text> */}
      <View style={{ zIndex: 1, flex: 0.5 }}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(JSON.stringify(data));
            console.log(JSON.stringify(details?.geometry?.location));
            moveaToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng)
          }}
          query={{
            key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
            language: 'en',
          }}
        />
        <View style={{ zIndex: 1, flex: 0.6, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder='Search'
              onPress={(data, details = null) => {
                let originCordinates = {
                  latitude: details?.geometry?.location.lat,
                  longitude: details?.geometry?.location.lng
                }
                setOrigin(originCordinates)
                moveaToLocation(originCordinates)
              }}
              query={{
                key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
                language: 'en',
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5, }}>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder='destination'
              onPress={(data, details = null) => {
                let destinationCordinates = {
                  latitude: details?.geometry?.location.lat,
                  longitude: details?.geometry?.location.lng
                }
                setDestination(destinationCordinates)
                moveaToLocation(destinationCordinates)
              }}
              query={{
                key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
                language: 'en',
              }}
            />
          </View>
        </View>

      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 21.250367,
          longitude: 81.638294,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        
      >
<Marker coordinate={{
  latitude: Mlati,
  longitude:Mlong
}} />

        {origin !== undefined ? (
          <Marker coordinate={origin} />) : null
        }
        {destination !== undefined ? (
          <Marker coordinate={destination} />) : null
        }

        {/* {
            marker.map((item) => {
              return (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}
                />)
            })
          } */}
        {origin != undefined && destination != undefined ?
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeWidth={2}
            strokeColor='red'
            apikey={'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0'}
          /> : null}



      </MapView>
      <View style={{ justifyContent: 'flex-end', flex: 0.3 }}>
        <Button title="Get Location" onPress={getLocation} />
        {/* <Text>Latitude: {location ? location.coords.latitude : null}</Text>
        <Text>Longitude: {location ? location.coords.longitude : null}</Text> */}
      </View>

    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {

    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    flex: 0.9,
    zIndex: 0

  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: "center",

  },
});
