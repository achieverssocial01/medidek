import React, { useRef, useState } from "react";
import { View, Image, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet } from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AllHospitalsRoute from "../AllHospitalsRoute";
import AllHospitalWithDoctorsRoute from "../AllHospitalWithDoctorsRoute";
import AllDoctorsRoute from "../AllDoctorsRoute";
import AllCategories from "../AllCategoriesRoute";
import { useNavigation } from "@react-navigation/native";
const Searchdoctor = (props) => {
  var value = props?.route?.params?.value
  if (!value) {
    value = "AllDoctors"
  }


  {
    if (value === "AllHospitals") {
      return (
        <AllHospitalsRoute />
      )
    }

  }
  {
    if (value == "AllHospitalWithDoctors") {
      return (
        <AllHospitalWithDoctorsRoute />
      )
    }

  }
  {
    if (value == "AllDoctors") {
      return (
        <AllDoctorsRoute />
      )
    }

  }
  {
    if (value == "AllCategories") {
      return (
        <AllCategories />
      )
    }

  }

  return (

    <>
    </>
  );
};

export default Searchdoctor;


const styles = StyleSheet.create({
  search: {
    height: 40,
    backgroundColor: "red",
  }
})
