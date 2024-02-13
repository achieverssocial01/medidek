
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {ActivityIndicator, View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { axiosClient } from "./utils/axiosClient";

const AllCategories = ({route}) => {
   
  const category =route?.params?.category;
    const navigation =useNavigation()
  const ref = useRef()
  const [locations, setLocations] = useState([]);
  const [doctors,setdoctors]=useState([])

  const [specialties, setspecialties] = useState([]);

  const imgurl = 'https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  const [locationSearchText, setLocationSearchText] = useState("");
  const [specialtiesearchText, setspecialtiesearchText] = useState(category);

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredspecialties, setFilteredspecialties] = useState([]);

  const [isLocationListOpen, setLocationListOpen] = useState(false);
  const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);

  const handlecategories =async(text)=>{
    setspecialtiesearchText(text)
    setSpecialtiesListOpen(true)
    const res= await axiosClient.get(`/v2/getSpeacilityList?speciality=${text}`)
    setspecialties(res?.data?.result)
    setFilteredspecialties(res?.data?.result)
  }

  const handleSearchdoctor =async(text)=>{
    const res= await axiosClient.get(`/v2/getAllDoctorWithAllQuery?userInput=${text}`)
    setdoctors(res?.data?.result)
  }

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

useEffect(()=>{
   handleSearchdoctor(specialtiesearchText || "eye")
},[specialtiesearchText])


 const handlelocationData =async(data)=>{
  const res = await axiosClient.post("/v2/doctorsByLocation",{
    speciality:specialtiesearchText,
    location:data
  })
  if(Array.isArray(res.data.result.data)){
    setdoctors(res.data.result.data)
  }
 }


  const RenderHospitalItem = ({ item} ) => (

    <TouchableOpacity
      onPress={() => {
        setspecialtiesearchText(item);
        setFilteredspecialties([]);
        setSpecialtiesListOpen(false);
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Text style={{ padding: 10, color: "black" }}>{item}</Text>
      </View>
    </TouchableOpacity>
  );


  const Item = ({item}) => (
    <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
      <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
        <Image source={{ uri: item?.imgurl ? item?.imgurl : imgurl }} width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
      </View>
      <View style={{ flex: 2, padding: 10 }} >
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Dr.{item?.nameOfTheDoctor}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Expr:{item?.yearOfExprience}</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Sp:{item?.speciality}</Text>
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
  );




  return (
    <>
  
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 ,}}
    >
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF",}}>
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
                zIndex:1
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
            zIndex:999
          }}
        >
          <Image source={require("./Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
          <TextInput
            placeholder="Search All Categories"
            placeholderTextColor="#706D6D"
            style={{ color: "black" ,width:'100%' }}
            value={specialtiesearchText}
            onChangeText={(text)=>handlecategories(text)}
          />
                 

        </View>
 {isSpecialtiesListOpen &&  (
          <FlatList
            data={specialties}
            renderItem={({item}) => <RenderHospitalItem item={item} />}
            keyExtractor={(item) => item}
            style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 10, paddingHorizontal: 10,position:"absolute",zIndex:1,top:65,left:14 }}
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

   {/* <ScrollView>
      {
         doctors?.length > 0 ? doctors.map((item)=>(
          <View key={item._id} style={{ flexDirection: 'column',margin:3, borderRadius: 10, backgroundColor: '#DCE3F6', shadowColor: 'gray', elevation: 10, shadowOpacity: 0.6,zIndex:0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
              <Image source={{ uri: item?.imgurl ?item?.imgurl : imgurl }} width={100} height={100} style={{ borderRadius: 10, }}/>
            </View>
            <View style={{ padding: 10, flex: 2.5 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Dr.{item?.nameOfTheDoctor}</Text>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Expr:{item?.yearOfExprience}</Text>
            </View>
          </View>

          <View style={{ padding: 10, flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Rating</Text>
            <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 10, justifyContent: 'center', width: 80 }} onPress={()=>navigation.navigate("Book",{
                        doctorDetail: item,
                      })}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', padding: 10, textAlign: "center" }}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
         )) : (
          <View>
            <Text style={{color:"blue",textAlign:"center",fontSize:20,fontWeight:'600'}}>No Doctors Found</Text>
          </View>
         )
      }
      </ScrollView> */}
      </View>



    </KeyboardAvoidingView>
    </>
  )
}

export default AllCategories

const styles = StyleSheet.create({})




