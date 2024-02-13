import React, { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Button } from "react-native";
import { axiosClient } from "../utils/axiosClient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppointmentCancelPopUp from "../../componants/Stacknavigation/AppointmentPopup/AppointmentCancalpopup";
import UserContext from "../Context/userContext";
import moment from "moment";
import ViewAppointment from "../Appointment/ViewAppointment";

const Dashbord = () => {



    const imgurl ="https://th.bing.com/th?q=Doctor+Stock+Image&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"

    const [allAppointment, setallappointment] = useState([]);
    const { userLogIn } = useContext(UserContext)
    const [showAppointment, setShowAppointment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [view,setview]=useState({});
    const navigation = useNavigation()


    const getMissedAppointmentsData = async () => {
        setIsLoading(true);
        if(userLogIn?.token){
              const response = await axiosClient.get(
            `/v2/getMissedAppointment/${userLogIn?.user?._id}`
        );
        setIsLoading(false);
        setallappointment(response.data.result);
        return;
        }
        else{
          navigation.navigate("loginWithEmail")  
        }
      
    };
    
    useEffect(() => {
      getMissedAppointmentsData()
    }, [])



    const OpenPopUp = (item) => {
        setShowAppointment(!showAppointment);
        setview(item);

    };

    return (
        <>
            <ScrollView style={{ backgroundColor: "#gray"}}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#1F51C6" /> // Display loading indicator while fetching data
                ) : 
                (
                    showAppointment ? <ViewAppointment showAppointment ={showAppointment} setShowAppointment={setShowAppointment} view={view}/> 
                    :  allAppointment.length > 0 ? allAppointment.map((item) => (


                        <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
                            <Image
                            
                            
                            source={{ uri: item?.doctorid?.imgurl ?  item?.doctorid?.imgurl :"https://images.pexels.com/photos/18221948/pexels-photo-18221948/free-photo-of-beautiful-brunette-woman-in-white-off-the-shoulder-dress-standing-on-a-beach.jpeg" }}
                            
                            
                            width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
                          </View>
                          <View style={{ flex: 2, padding: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}> AppointId : {item?._id}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>
                            Date :  {moment(item?.appointmentDate).format("DD-MM-YYYY")}
                            </Text>        
                          </View>
                        </View>
                        <View style={{ padding: 5, flexDirection: 'row', justifyContent: "center" }}>
                          <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }} 
                                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>Reschedule Appointment</Text>
                          </TouchableOpacity>
                        </View>
                      </View>



                        // <View key={item._id} style={styles.doctorCardStyle}>
                        //     <Image source={{ uri: item?.doctorid?.imgurl ? item?.doctorid?.imgurl :imgurl  }}
                        //         width={100}
                        //         height={100}
                        //         style={{ borderRadius: 100 }}
                        //     />
                        //     <View>
                        //         <Text style={styles.title}>
                        //             AppointId : {item?._id}
                        //         </Text>
                        //         <Text style={styles.title}>
                        //             Dr. {item?.doctorid?.nameOfTheDoctor ? item?.doctorid?.nameOfTheDoctor :"Doctor name"}
                        //         </Text>
                        //         <Text style={styles.title}>
                        //            speciality : {item?.doctorid?.speciality}
                        //         </Text>
                        //         <Text style={styles.title}>
                        //             Date :  {moment(item?.appointmentDate).format("DD-MM-YYYY")}
                        //         </Text>
                        //     </View>
                        //     {/* <Button title="View Appointment" onPress={()=>OpenPopUp(item)}/> */}
                        // </View>
                    )) : (
                        <Text style={{textAlign:"center",marginTop:20,fontSize:17,fontWeight:800}}>No Appointments Cancelled</Text>
                    )
                    )
                }
            </ScrollView>

            {/* {showAppointment ? (
        <AppointmentCancelPopUp OpenPopUp={OpenPopUp} cancalAppointment={cancalAppointment} appointmentId={appointmentId} />
      ) : null
      } */}

        </>
    );
};

export default Dashbord;

const styles = StyleSheet.create({
    doctorCardStyle: {
        flexDirection: "row",
        backgroundColor: "#DCE3F6",
        padding: 24,
        width: "100%",
        marginTop: 16,
        height: "50",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        flexWrap:"wrap",
        gap: 5,
        borderRadius:10,
        // flex: 1,
    },
    title: {
         flexDirection:"row",
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "600",
        flexWrap:"wrap"
    },

})


