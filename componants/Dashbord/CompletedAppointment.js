import React, { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Button } from "react-native";
import { axiosClient } from "../utils/axiosClient";
// import { useRecoilValue } from "recoil";
// import { Userdata } from "../Recoil/Atom";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppointmentCancelPopUp from "../../componants/Stacknavigation/AppointmentPopup/AppointmentCancalpopup";
import UserContext from "../Context/userContext";
import moment from "moment";
import ViewAppointment from "../Appointment/ViewAppointment";

const Dashbord = () => {
    const [allAppointment, setallappointment] = useState([]);
    const { userLogIn } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const navigation =useNavigation();

    // const url = "https://images.pexels.com/photos/18221948/pexels-photo-18221948/free-photo-of-beautiful-brunette-woman-in-white-off-the-shoulder-dress-standing-on-a-beach.jpeg"
    const getCompleteAppointmentsData = async () => {
        setIsLoading(true);
        if(userLogIn?.token){
            const response = await axiosClient.get(
            `/v2/getCompletedAppointment/${userLogIn?.user?._id}`
        );
        if(Array.isArray(response?.data?.result)){
            setIsLoading(false);
            setallappointment(response?.data?.result);
        }
        else{
            setIsLoading(false)
            
        }
        return;
        }
        else{
          navigation.navigate("loginWithEmail")
        } 
    };


    useEffect(() => {
      getCompleteAppointmentsData()
    }, [])

   

    return (
        <>
            <ScrollView style={{ backgroundColor: "#gray",padding:20 }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#1F51C6" /> // Display loading indicator while fetching data
                ) : 
                (
                      allAppointment.length > 0 ?
                     allAppointment?.map((item) => (
                        <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
                            <Image
                            
                            
                            source={{ uri: item?.doctorid?.imgurl ?  item?.doctorid?.imgurl :"https://images.pexels.com/photos/18221948/pexels-photo-18221948/free-photo-of-beautiful-brunette-woman-in-white-off-the-shoulder-dress-standing-on-a-beach.jpeg" }}
                            
                            
                            width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
                          </View>
                          <View style={{ flex: 2, padding: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Appointment With {item?.doctorid?.nameOfTheDoctor ? item?.doctorid?.nameOfTheDoctor : "Doctor Name"}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>
                            Date :  {moment(item?.appointmentDate).format("DD-MM-YYYY")}
                            </Text>        
                          </View>
                        </View>
                        <View style={{ padding: 5, flexDirection: 'row', justifyContent: "center" }}>
                          <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }} 
                                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )) : (
                        <Text style={{textAlign:"center",marginTop:20,fontSize:17,fontWeight:800}}>No Completed Appointments ,Please Book Your First Appointment</Text>
                    )
                    )
                }
            </ScrollView>
        </>
    );
};

export default Dashbord;

const styles = StyleSheet.create({
    doctorCardStyle: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        padding: 24,
        width: "100%",
        marginTop: 16,
        height: "50",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        gap: 8,
        color:"black",
        // flex: 1,
    },
    title: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "600",
    },

})


