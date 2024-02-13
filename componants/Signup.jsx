import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import UserContext from './Context/userContext'
import AsyncStorage from '@react-native-async-storage/async-storage';



const ScreenHeight = Dimensions.get('screen').height;
const ScreenWidth = Dimensions.get('screen').width;

const Signup = () => {
  const navigation = useNavigation();
  const { role, setrole } = useContext(UserContext)


  const checkdata = async () => {

    const token = await AsyncStorage.getItem("patienttoken");
    const token1 = await AsyncStorage.getItem("doctortoken");
    const token2 = await AsyncStorage.getItem("hospitaltoken");
    if (token) {
      return navigation.navigate("tabbord")
    }
    else if (token1) {
      return navigation.navigate("DoctorDashboard")
    }
    else if (token2) {
      return navigation.navigate("MasterDashboard")
    }
    else {
      return navigation.navigate("Signup")
    }
  }

  useFocusEffect(
    useCallback(() => {
      checkdata()
    }, [])
  );

  const userclick = () => {
    if (role == "DOCTOR") {
      navigation.navigate("createAccountpage")
    }
    else if (role == "PATIENT") {
      navigation.navigate("createAccountpage")
    }
    else if (role == "MASTER") {
      navigation.navigate("createAccountpage")
    }

  }





  return (

    <View style={{ backgroundColor: "#FFFFFF", height:'100%', width: ScreenWidth,paddingHorizontal:16,paddingVertical:16, justifyContent:'space-between'}}>
      <View style={{ }}>
        <Image source={require("./Assets/MedidekLogo.png")} style={{ width: 100, height: 30, objectFit: 'contain', }} />
      </View>

      <View style={{ }}>
        <View style={{ marginVertical: 24, width: 248, height: 106 }}>
          <Text style={{ fontSize: 32, fontWeight: "600", color: "#000000" }}>
            Choose a mode to get Started
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#706D6DA6", width: 200 }}>
            Get Started as a Doctor, Patient or Hospital
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 8, justifyContent: "center", marginTop: 10, }}>
          <TouchableOpacity style={{ padding: 16, gap: 5, borderColor: '#D9D9D9F2', borderWidth: 1, borderRadius: 5, backgroundColor: role == "PATIENT" ? "#1F51C6" : "#FFFFFF" }} onPress={() => setrole("PATIENT")}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: role === "PATIENT" ? "#FFFFFF" : "#000000" }}>
              As Patient
            </Text>
            <Text style={{ color: "#706D6D", fontSize: 13, fontWeight: "700", color: role === "PATIENT" ? "#FFFFFF" : "#706D6DA6", width: 237, }}>Book Appointment, Track Appointment & upload Medical Records </Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 19, gap: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5, backgroundColor: role == "DOCTOR" ? "#1F51C6" : "#FFFFFF" }} onPress={() => setrole("DOCTOR")}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: role === "DOCTOR" ? "#FFFFFF" : "#000000" }}>
              As Doctor
            </Text>
            <Text style={{ color: "#706D6D", fontSize: 13, fontWeight: "700", color: role === "DOCTOR" ? "#FFFFFF" : "#706D6DA6", width: 237, }}>Manage Appointments & View Patient history</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 19, gap: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5, backgroundColor: role == "MASTER" ? "#1F51C6" : "#FFFFFF" }} onPress={() => setrole("MASTER")}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#383838", color: role === "MASTER" ? "#FFFFFF" : "#000000" }}>
              As Hospital
            </Text>
            <Text style={{ color: "#706D6D", fontSize: 13, fontWeight: "700", color: role === "MASTER" ? "#FFFFFF" : "#706D6DA6", width: 237, }}>Manage Appointments, Manage Doctors & Staff</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity style={{ backgroundColor: "#1F51C6", padding: 18, borderRadius: 30, justifyContent: 'center', alignItems: 'center', }} onPress={() => userclick()}>
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>Next</Text>
        </TouchableOpacity>
      </View>



    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    padding: 10
  },


});