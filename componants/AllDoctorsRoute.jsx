
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { axiosClient } from "./utils/axiosClient";

const AllDoctorsRoute = () => {

  const ref = useRef()
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const [doctors, setdoctors] = useState([])

  const imgurl = 'https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  const [locationSearchText, setLocationSearchText] = useState("");
  const [specialtiesearchText, setspecialtiesearchText] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredspecialties, setFilteredspecialties] = useState([]);

  const [isLocationListOpen, setLocationListOpen] = useState(false);
  const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);




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




  const handleSearchdoctor = async (text) => {
    if (text) {
      var next = text;
    }
    else {
      next = ""
    }
    setspecialtiesearchText(text)
    const res = await axiosClient.get(`/v2/getAllDoctorWithAllQuery?userInput=${next}`)
    setdoctors(res?.data?.result)
  }

  useFocusEffect(
    useCallback(() => {
      handleSearchdoctor()
    }, [])
  );

  const handlelocationData = async (data) => {
    const res = await axiosClient.post("/v2/doctorsByLocation", {
      speciality: specialtiesearchText,
      location: data
    })
    if (Array.isArray(res.data.result.data)) {
      setdoctors(res.data.result.data)
    }
  }



  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  const Item = ({item}) => (
    <TouchableOpacity 
    onPress={() =>
      navigation.navigate('DoctorProfilePage', {
        doctorid: item._id,
      })
    }
    >
    <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
      <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
        <Image source={{ uri: item?.imgurl ? item?.imgurl : imgurl }} width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
      </View>
      <View style={{ flex: 2, padding: 10 }} >
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Dr.{item?.nameOfTheDoctor}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Expr:{item?.yearOfExprience}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Sp:{item?.speciality}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Fees:{item?.connsultationFee}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Loc:{item?.location?.toLowerCase()}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', }}>
          {/* Rating : */}
          <AirbnbRating
            showRating={false}
            ratingCount={5}
            // defaultRating={3}
            size={20}
            onFinishRating={ratingCompleted}
            isDisabled={true}
          />
        </Text>
      </View>
    </View>

    <View style={{ padding: 5, flexDirection: 'row', justifyContent: "center" }}>
      <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }} 
      onPress={() => navigation.navigate("Book", {
                      doctorDetail: item,
                    })}
                    >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  </View>
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
          <View
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
                handlelocationData(data)
              }}
              isRowScrollable={true}
              query={{
                key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
                language: 'en',
              }}
            />

          </View>


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
              placeholder="Search All Doctors"
              placeholderTextColor="#706D6D"
              style={{ color: "black", width:'100%' }}
              value={specialtiesearchText}
              onChangeText={handleSearchdoctor}
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
     
     {
      doctors?.length > 0 ? (
         <FlatList
           data={doctors}
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
        </View>



      </KeyboardAvoidingView>
    </>
  )
}

export default AllDoctorsRoute

const styles = StyleSheet.create({})






