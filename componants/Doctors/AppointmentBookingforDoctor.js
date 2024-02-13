import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";

// import {useRecoilState } from "recoil";
// import { UserConformationmasseage, Userdata } from "../Recoil/Atom";
import { useNavigation } from "@react-navigation/native";
import { axiosClient } from "../utils/axiosClient";
import AppointmentConfirmPopUp from "../../componants/Stacknavigation/AppointmentPopup/AppointmentConfirmpop";
const AppointmentBookingforDoctor = ({ route }) => {
    const navigation = useNavigation()
    useEffect(() => {
        getDoctor()
    }, []);

    // patientName :{type:String },
    // age:{type:String},
    // phoneNumber:{type:String},
    // gender:{type:String},
    // appointmentDate:{type:String},
    // appointmentTime:{type:String},
    // doctorsId:{type:String},
    // hospitalId:{type:String},
    // updatedEmailAddress:{type:String},
    // addDateofBirth:{type:String},
    // status:{type:String ,default:"pending"},
    // userId:{type:String},
    // token:{type:String},

    const { id } = route.params;
    // const [aboutDoctor, setAboutDoctor] = useState(false);
    // const [selectedTime, setSelectedTime] = useState(null);
    // const [selectedDate, setSelectedDate] = useState(null);

    const [dates, setDates] = useState([]);
    const [ShowPopUp, setShowPopUp] = useState(false)
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    // const dateScrollViewRef = useRef(null);
    // const dateItemWidth = 160;
    const [doctordata, setdoctordata] = useState({});
    console.log(doctordata,"hjhhjhuiujhuhnijio....................");

    // const [user, setuser] = useRecoilState(Userdata)
    // const [Conformation, setConformation] = useRecoilState(UserConformationmasseage)
    const [appointment, setappointtment] = useState({ patientName: user[0].name, phoneNumber: user[0].phone, gender: "male", appointmentDate: "", appointmentTime: "", doctorsId: id, hospitalId: "", updatedEmailAddress: user[0].email, userId: user[0]._id, doctorsName: doctordata.nameOfTheDoctor})
 
    const getDoctor = async () => {
        const result = await axios.get(`https://medidek-backend-wz4l.onrender.com/v2/getSingleDoctor/${id}`);
        setdoctordata(result.data.result);
    }

    const ConfirmShowPop = () => {
        setShowPopUp(!ShowPopUp)
    }
    const slotTimes = [
        { time: "12:00", slotsAvailable: 2 },
        { time: "13:00", slotsAvailable: 2 },
        { time: "14:00", slotsAvailable: 2 },
        { time: "15:00", slotsAvailable: 2 },
        // Add more slot times as needed
    ];

    const generateDateList = () => {
        const dateList = [];
        const currentDate = new Date();
        for (let i = 0; i < 20; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            dateList.push(date);
        }
        return dateList;
    };

    useEffect(() => {
        const dateList = generateDateList();
        setDates(dateList);
    }, []);

    const renderSlot = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleSlotClick(item.time)}
            style={{
                width: "30%",
                marginVertical: 10,
            }}
        >
            <View
                style={{
                    borderWidth: 1,
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderColor: appointment.appointmentTime === item.time ? "#1F51C6" : "#D9D9D9",
                    borderRadius: 5,
                    backgroundColor: appointment.appointmentTime === item.time ? "#1F51C6" : "#FFFFFF",
                }}
            >
                <Text
                    style={{
                        fontWeight: "600",
                        fontSize: 16,
                        color: appointment.appointmentTime === item.time ? "white" : "#706D6D",
                    }}
                >
                    {item.time}
                </Text>
            </View>
            <Text style={{ alignSelf: "center", color: "#15B912" }}>
                {/* {item.slotsAvailable} */}
                slots available
            </Text>
        </TouchableOpacity>
    );

    const handleSlotClick = (time) => {
        setappointtment((prev) => {
            return { ...prev, appointmentTime: time,doctorsName: doctordata.nameOfTheDoctor , hospitalId: doctordata.hospitalId }
        });
    };

    const handleDateClick = (date, index) => {
        ;
        setappointtment((prev) => {
            return { ...prev, appointmentDate: date }
        });
        setSelectedDateIndex(index);
    };

    // const scrollDatesLeft = () => {
    //     if (selectedDateIndex > 0) {
    //         setSelectedDateIndex(selectedDateIndex - 1);
    //         dateScrollViewRef.current.scrollTo({
    //             x: (selectedDateIndex - 1) * dateItemWidth,
    //             animated: true,
    //         });
    //     }
    // };

    // const scrollDatesRight = () => {
    //     if (selectedDateIndex < dates.length - 1) {
    //         setSelectedDateIndex(selectedDateIndex + 1);
    //         dateScrollViewRef.current.scrollTo({
    //             x: (selectedDateIndex + 1) * dateItemWidth,
    //             animated: true,
    //         });
    //     }
    // };

    const renderDate = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleDateClick(item, index)}
            style={{
                paddingHorizontal: 5,
                paddingVertical: 20,
                backgroundColor: appointment.appointmentDate === item ? "#1F51C6" : "white",
                borderRadius: 5,
                marginRight: 12,
                borderWidth: 1,
                borderColor: "#D9D9D9",
            }}
        >
            <Text style={{ color: appointment.appointmentDate === item ? "white" : "#706D6D", fontWeight: "600", fontSize: 16 }}>
                {item.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                })}
            </Text>
        </TouchableOpacity>
    );


    const makeAppointment = async () => {
        console.log(appointment)
      
        if (!appointment.appointmentDate || !appointment.appointmentTime) {
            Alert.alert("select properly")
        } else {
            let finalAppointment = await axiosClient.post("createAppoinment", appointment)
            // navigation.navigate("Conformation")
            console.log(finalAppointment.data, ".........")
            if (finalAppointment.data.statusCode === 201) {
                setConformation(() => {
                    return [finalAppointment.data.result]
                })
                navigation.navigate("Conformation")
            }
            else if(finalAppointment.data.statusCode === 409) {
               
               Alert.alert("you Already have Appointment for this date ")
            }
        }

    }

    return (
        <>
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

                {/* Slot section */}
                {/* Date Search */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <FlatList
                        data={dates}
                        renderItem={renderDate}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 12 }}
                    />
                </View>
                {/* Date section end */}
                {/* Date Search end */}

                <FlatList
                    data={slotTimes}
                    renderItem={renderSlot}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ borderWidth: 1, marginTop: 14, paddingHorizontal: 4, borderRadius: 4, borderColor: "#D9D9D9" }}
                />
                {/* Slot section end */}

                {/* Book Appointment button */}
                <TouchableOpacity onPress={ConfirmShowPop}>
                    <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, marginVertical: 12, borderRadius: 20 }}>
                        <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center" }}>Book Appointment</Text>
                    </View>
                </TouchableOpacity>


            </View>
            {ShowPopUp ? <AppointmentConfirmPopUp ConfirmShowPop={ConfirmShowPop} makeAppointment={makeAppointment} /> : null}
        </>
    );
};

export default AppointmentBookingforDoctor;
