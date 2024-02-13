
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet, ScrollView ,ActivityIndicator} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AirbnbRating } from 'react-native-ratings';
import { axiosClient } from "./utils/axiosClient";
const AllHospitalWithDoctorsRoute = () => {



  const ref = useRef()
  const [locations, setLocations] = useState([]);


  const navigation = useNavigation();
  const [doctors, setdoctors] = useState([1, 2, 3, 4])
  const [Hospitals, setHospitals] = useState([])
  const [specialties, setspecialties] = useState([{ hospital: "eye" },
  { hospital: "Fever" },
  { hospital: "Pregnancy" },
  { hospital: "Bp" },
  { hospital: "Bones" },
  { hospital: "Diabetes" },
  { hospital: "Dentist" },
  { hospital: "Body" },]);

  const imgurl = 'https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  const [locationSearchText, setLocationSearchText] = useState("");
  const [specialtiesearchText, setspecialtiesearchText] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredspecialties, setFilteredspecialties] = useState([]);

  const [isLocationListOpen, setLocationListOpen] = useState(false);
  const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);

  const gethospitalsdata = async () => {
    const res2 = await axiosClient.get('/v2/getHotspitalsDoctorForHomeScreen')
    setHospitals(res2?.data?.result)
  }
  useFocusEffect(
    useCallback(() => {
      gethospitalsdata()
    }, [])
  );

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
    const res = await axiosClient.get(`/v2/getAllDoctorWithAllQuery?value=${text}`)
    setspecialtiesearchText(text);
    const filtered = specialties.filter((hospital) =>
      hospital.hospital.toLowerCase().includes(text?.toLowerCase())
    );
    setFilteredspecialties(filtered);
    setSpecialtiesListOpen(true);
    setLocationListOpen(false);
  };

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


  return (
    <>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF"}}>
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
                console.log(data.description);
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
              marginBottom: 10,
              zIndex: 999
            }}
          >
            <Image source={require("./Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
            <TextInput
              placeholder="Search All Hospitals with Doctors"
              placeholderTextColor="#706D6D"
              style={{ color: "black" ,width:'100%' }}
              value={specialtiesearchText}
              onChangeText={handlespecialtiesearch}
            />
          </View>
          {isSpecialtiesListOpen && filteredspecialties.length > 0 && (
            <FlatList
              data={filteredspecialties}
              renderItem={renderHospitalItem}
              keyExtractor={(item) => item.hospital}
              style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 10, paddingHorizontal: 10, position: "absolute", zIndex: 1, top: 65, left: 14 }}
            />
          )}





          <ScrollView>
            {
              Hospitals?.length > 0 ? Hospitals.map((item) => (
                <TouchableOpacity
                 onPress={()=>navigation.navigate("AllDoctorswithHospital",{
                  HospitalId: item._id,
                 })}
                key={item._id} style={{ borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor: 'black', elevation: 7, shadowOpacity: 0.9, zIndex: 0, justifyContent: "center", alignItems: 'center', padding: 10, gap: 5, margin: 5 }}>

                  <Image source={{ uri: item?.imgurl }} width={200} height={150} style={{ borderRadius: 10, objectFit: 'contain' }} />
                  <ScrollView horizontal>
                    <View style={{ flexDirection: 'row', gap: 5, marginVertical: 5 }}>
                      {
                        item?.doctors?.length > 0 ? item?.doctors?.map((data) => (
                          <View key={data?._id}>
                          <Image
                            source={{ uri: data?.imgurl }}
                            width={70} height={70} style={{ borderRadius: 10, objectFit: 'contain' }}>
                          </Image>
                          <Text style={{fontWeight:"600",fontSize:15}}>Dr.{data?.nameOfTheDoctor}</Text>
                          </View>
                        )) : (
                          <View>
                            <Text style={{ color: "blue", fontSize: 15, fontWeight: '600', textAlign: "center" }}>No Doctors Found</Text>
                          </View>
                        )
                      }
                    </View>
                  </ScrollView>

                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.nameOfhospitalOrClinic}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>{item?.location}</Text>
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
                <View style={{ padding: 10 }}>
                <ActivityIndicator size={'900'} />
                <Text style={{ textAlign: "center", color: "#1F51C6" }}>Loading...</Text>
              </View>
              )
            }
          </ScrollView>

        </View>



      </KeyboardAvoidingView>
    </>
  )
}

export default AllHospitalWithDoctorsRoute

const styles = StyleSheet.create({})






