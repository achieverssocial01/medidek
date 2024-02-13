
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet, ScrollView,ActivityIndicator } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { axiosClient } from "./utils/axiosClient";
const AllHospitalsRoute = () => {



  const ref = useRef()
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const [doctors, setdoctors] = useState([1, 2, 3, 4])
  const [specialties, setspecialties] = useState([{ hospital: "eye" },
  { hospital: "Fever" },
  { hospital: "Pregnancy" },
  { hospital: "Bp" },
  { hospital: "Bones" },
  { hospital: "Diabetes" },
  { hospital: "Dentist" },
  { hospital: "Body" },]);
  const [Hospitals,setHospitals]=useState([]);


  // const gethospitalsdata =async()=>{
  //   const res2 = await axiosClient.get('/v2/getHotspitalsDoctorForHomeScreen')
  //   setHospitals(res2?.data?.result)
  // }
  // useFocusEffect(
  //   useCallback(() => {
  //      gethospitalsdata()
  //   }, [])
  // );
  
  const gethospitalsdata = async (text) => {
    if (text) {
      var next = text;
    }
    else {
      next = ""
    }
    setspecialtiesearchText(text)
    const res = await axiosClient.get(`/v2/getAllHospitalsWithAllQuery?userInput=${next}`)
    setHospitals(res?.data?.result)
  }

  useFocusEffect(
    useCallback(() => {
      gethospitalsdata()
    }, [])
  );

  


  const imgurl = 'https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  const [locationSearchText, setLocationSearchText] = useState("");
  const [specialtiesearchText, setspecialtiesearchText] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredspecialties, setFilteredspecialties] = useState([]);

  const [isLocationListOpen, setLocationListOpen] = useState(false);
  const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);

  const handleLocationSearch = (text) => {
    setLocationSearchText(text); // Update location search text

    // Filter the locations based on the input text
    const filtered = locations.filter((location) =>
      location.city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
    setLocationListOpen(true);
    setSpecialtiesListOpen(false);
  };

  const handlespecialtiesearch = async (text) => {
    const res = await axiosClient.get(`/v2/getAllHospitalsWithAllQuery?userInput=${text}`)
    setSpecialtiesListOpen(true);
    setLocationListOpen(false);
  };


  const handlelocationData = async (data) => {
    const res = await axiosClient.post("/v2/doctorsByLocation", {
      speciality: specialtiesearchText,
      location: data
    })
    if (Array.isArray(res.data.result.data)) {
      setdoctors(res.data.result.data)
    }
  }





  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setLocationSearchText(item.city);
        setFilteredLocations([]);
        setLocationListOpen(false);
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image source={require("./Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
        <Text style={{ padding: 10, color: "black" }}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHospitalItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setspecialtiesearchText(item.hospital);
        setFilteredspecialties([]);
        setSpecialtiesListOpen(false);
        props.navigation.navigate("SelectDoctor");

      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image source={require("./Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
        <Text style={{ padding: 10, color: "black" }}>{item.hospital}</Text>
      </View>
    </TouchableOpacity>
  );

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }


  const Item = ({item}) => (
    <TouchableOpacity 
    onPress={() =>
      navigation.navigate('AllDoctorswithHospital', {
        HospitalId: item._id,
      })
    }
    key={item._id} style={{ borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor: 'black', elevation: 7, shadowOpacity: 0.9, zIndex: 0, justifyContent: "center", alignItems: 'center', padding: 10, gap: 5, margin:5 }}>
      <Image source={{ uri: item?.imgurl }} width={200} height={150} style={{ borderRadius: 10,objectFit:'contain', }} />
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.nameOfhospitalOrClinic}</Text>
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.hospitalType}</Text>
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.location}-{item?.landmark}</Text>
      <AirbnbRating
                showRating={false}
                ratingCount={5}
                // defaultRating={3}
                size={20}
                onFinishRating={ratingCompleted}
                isDisabled={true}
                
              />
    </TouchableOpacity>
  );




  return (
    <>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF" }}>
          {/* Location input */}
          {/* <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              borderRadius: 20,
              paddingHorizontal: 16,
              backgroundColor: "#DCE3F6",
              marginVertical: 10,
            }}
          >
            <Image source={require("./Assets/location.png")} style={{ width: 18, height: 24 }} />
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder='Search'
              styles={{
                textInputContainer: {
                  backgroundColor: '#DCE3F6',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                  backgroundColor: "#DCE3F6"
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                handlelocationData(data)
              }}
              isRowScrollable={true}
              query={{
                key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
                language: 'en',
              }}
            />

          </View> */}


          {/* Specialty input */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              borderRadius: 20,
              paddingHorizontal: 16,
              backgroundColor: "#DCE3F6",
              marginVertical: 10,
              // zIndex: 999
            }}
          >
            <Image source={require("./Assets/location.png")} style={{ width: 18, height: 24 }} />
            <TextInput
              placeholder="Search Hospitals"
              placeholderTextColor="#706D6D"
              style={{ color: "black" ,width:'100%'}}
              value={specialtiesearchText}
              onChangeText={gethospitalsdata}
            />
          </View>
          {isSpecialtiesListOpen && filteredspecialties.length > 0 && (
            <FlatList
              data={filteredspecialties}
              renderItem={renderHospitalItem}
              keyExtractor={(item) => item}
              style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 10, paddingHorizontal: 10, position: "absolute", zIndex: 1, top: 65, left: 14 }}
            />
          )}


{
      Hospitals?.length > 0 ? (
         <FlatList
           data={Hospitals}
           renderItem={({item}) => <Item item={item} />}
           keyExtractor={item => item._id}
          />
      ) : (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size={'900'} />
          <Text style={{ textAlign: "center", color: "#1F51C6" }}>Loading...</Text>
        </View>
      )
     }


          
{/* <ScrollView>


          {
            Hospitals?.length > 0 ? Hospitals.map((item) => (

              <TouchableOpacity 
              onPress={() =>
                navigation.navigate('AllDoctorswithHospital', {
                  HospitalId: item._id,
                })
              }
              key={item._id} style={{ borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor: 'black', elevation: 7, shadowOpacity: 0.9, zIndex: 0, justifyContent: "center", alignItems: 'center', padding: 10, gap: 5, margin:5 }}>
                <Image source={{ uri: item?.imgurl }} width={200} height={150} style={{ borderRadius: 10,objectFit:'contain', }} />
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.nameOfhospitalOrClinic}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.hospitalType}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.location}-{item?.landmark}</Text>
                <AirbnbRating
                          showRating={false}
                          ratingCount={5}
                          // defaultRating={3}
                          size={20}
                          onFinishRating={ratingCompleted}
                          isDisabled={true}
                          
                        />
              </TouchableOpacity>

            )) : (
              <View>
                <Text style={{color:"blue",textAlign:"center"}}>Loading...</Text>
              </View>
            )
          }
</ScrollView> */}
        </View>



      </KeyboardAvoidingView>
    </>
  )
}

export default AllHospitalsRoute

const styles = StyleSheet.create({})