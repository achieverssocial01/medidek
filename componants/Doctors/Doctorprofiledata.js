import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, } from "react-native";

const DoctorsProfile = ({ route }) => {
  const navigation = useNavigation()
  const { id } = route.params
  const [aboutDoctor, setAboutDoctor] = useState(false);
  // const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [dates, setDates] = useState([]);
  // const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  // const dateScrollViewRef = useRef(null);
  // const dateItemWidth = 160;
  const [doctordata, setdoctordata] = useState("")
  const [reviews, setReviews] = useState([]);
  console.log(reviews,"........");

  useEffect(() => {
    getDoctor()
  }, [])
  const getDoctor = async () => {
    const result = await axios.get(`https://medidek-backend-wz4l.onrender.com/v2/getSingleDoctor/${id}`)
    setReviews(result.data.result.reviews)
    setdoctordata(result.data.result)

  }
  return (

    <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#FFFFFF", flex: 1 }}>
      {/* Doctors information section */}
      <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10 }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <View style={{ height: 84, width: 84, borderRadius: 42 }}>
            <Image source={require("../Assets/girl.png")} style={{ width: "100%", height: "100%" }}></Image>
          </View>

          {/* Doctors information */}
          <View style={{ justifyContent: "center" }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#383838", fontWeight: "600", fontSize: 18 }}>Dr {doctordata.nameOfTheDoctor}</Text>
              {/* Icon */}
              <View style={{ width: 20, height: 20, backgroundColor: "#15B912", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../Assets/Right.png")} style={{ width: "60%", height: "60%" }}></Image>
              </View>
            </View>
            <Text style={{ color: "#706D6D", fontWeight: "700", fontSize: 13 }}>{doctordata.yearOfExprience} Years experience</Text>
            <Text style={{ color: "#706D6D" }}>144 Ratings</Text>
          </View>
        </View>
      </View>
      {/* Doctors information section end */}

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("AppointmentBookingforDoctor", { id: id })}>
          <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, marginVertical: 12, borderRadius: 20 }}>
            <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center" }}>Book Appointment</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Slot section */}
      {/* Date Search */}

      {/* Date section end */}
      {/* Date Search end */}


      {/* Slot section end */}

      {/* About the Doctor */}
      <View>
        <TouchableOpacity onPress={() => setAboutDoctor(!aboutDoctor)}>
          <View style={{ display: "flex", justifyContent: "space-between", borderColor: "#D9D9D978", borderWidth: 1, flexDirection: "row", paddingVertical: 10, borderRadius: 5, paddingHorizontal: 10, marginVertical: 20 }}>
            <Text style={{ color: "#383838", fontWeight: "600", fontSize: 16 }}>About the Doctor</Text>
            <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>{aboutDoctor ? <>^</> : ""}</Text>
          </View>
        </TouchableOpacity>
        {aboutDoctor ? (
          <View style={{ display: "flex", justifyContent: "space-between", padding: 6, borderColor: "#D9D9D978", borderWidth: 1, borderRadius: 5 }}>
            <Text style={{ color: "#706D6D", fontWeight: "600", fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
            </Text>
          </View>
        ) : null}
      </View>

      {/* Reviews section */}
      <View style={{ borderColor: "#D9D9D978", borderWidth: 1, flexDirection: "row", paddingVertical: 10, borderRadius: 5, paddingHorizontal: 10, marginVertical: 20 }}>
              <Text style={{ color: "#383838", fontWeight: "600", fontSize: 16 }}>Reviews</Text>
            </View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          return<>
            <View style={{ borderWidth: 1, marginTop: 3, borderColor: "#D9D9D978", paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10 }}>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <View style={{ height: 84, width: 84, borderRadius: 42 }}>
                  <Image source={require("../Assets/girl.png")} style={{ width: "100%", height: "100%" }}></Image>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#383838", fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ color: "#706D6D" }}>{item.masseage}</Text>
                </View>
              </View>
            </View>
            </>
        }}
      />


    </View>

  );
};

export default DoctorsProfile;
