import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Button, Alert, Dimensions } from "react-native";
import React, { useContext, useState } from 'react'
import { axiosClient } from "../utils/axiosClient";
import UserContext from "../Context/userContext";
import Edit from "./Edit";
import { useNavigation } from "@react-navigation/native";

const windowheight = Dimensions.get("window").height;

const ViewAppointment = ({route}) => {
   const {view} =route.params; 
   console.log(route.params.view);
  const { userLogIn} = useContext(UserContext)
  const navigation =useNavigation();

  const [edit,setedit]=useState(false);
  const [inputValue, setInputValue] = useState({
    name:view?.name,
    age:view?.age,
    gender:view?.gender,
    phone:view?.phone,
    email:view?.email,
    appointmentDate:view?.appointmentDate,
    AppointmentNotes:view?.AppointmentNotes,
     AppointmentTime:view?.AppointmentTime,
     doctorid:view?.doctorid?._id,
     userid:userLogIn?.user?._id,
    status:"pending"
  })

  console.log(inputValue);
  console.log(view?.doctorid?.nameOfTheDoctor)

      const Handlecancelappointment =async()=>{
    try {
      const response = await axiosClient.put(
          `/v2/updateUserAppointmentStatus/${view._id}`,
          { status: "cancelled",remark:"by patient" }
      );
      if (response.data.status === "ok") {
         Alert.alert("status changed succesfully");
         navigation.navigate("UpcomingAppointment")
      }
      else{
        Alert.alert("status does not changed succesfully");
      }
  } catch (error) {
      console.log(error);
  }
  }

  return (

    <View style={{justifyContent:"center",height:windowheight}}>
      {
        !edit ? (
          <View style={{ paddingHorizontal: 6, paddingVertical: 16, backgroundColor: "#FFFFFF",justifyContent:"center" }} >
          <View style={{ paddingHorizontal: 9, backgroundColor: "#DCE3F6", justifyContent: "space-between", flexDirection: "row", paddingVertical: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                  <View>
                      <Text style={{ color: '#383838', fontSize: 24, fontWeight: 'bold' }}>Thank You</Text>
                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: "normal" }}>You are Application had been booked</Text>
                   </View>
                <View>
                    <View style={{ height: 40, width: 40, backgroundColor: "#15B912", borderRadius: 35, justifyContent: "center", alignItems: "center" }}>
                         <Image source={require("../Assets/Right.png")} style={{ width: "30%", height: "20%" }}></Image>
                        </View>
                  </View>
                </View>
                 <View style={{ paddingHorizontal: 9, backgroundColor: "#DCE3F6", paddingVertical: 12, marginTop: 1 }}>
                     <View>
                    <Text style={{ color: '#383838', fontSize: 18, fontWeight: 'bold' }}>Track appointment</Text>
                        <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: 'bold' }}>Appointment Id: {view?._id}</Text>
                   </View>
                    <View style={{ marginTop: 15 }}>
                     <View style={{ flexDirection: "row", gap: 9 }}>
                           <View><View style={{ height: 22, width: 22, backgroundColor: "#15B912", borderRadius: 11, justifyContent: "center", alignItems: "center" }}>
      
                       <Image source={require("../Assets/Right.png")} style={{ width: "60%", height: "60%" }} resizeMode="contain"></Image>
                   </View>
                     
                       <View style={{ alignItems: "center", gap: 1 }}>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                           <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                          </View>
                      </View>
                      <View>
                          <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Appointment Confirmed with <Text style={{color:"blue"}}> {view?.doctorid?.nameOfTheDoctor}</Text> </Text>
                          <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: 'bold' }}>Time : {view?.AppointmentTime}</Text>
                         </View>
                        </View>
      
                      <View style={{ flexDirection: "row", gap: 9 }}>
                          <View><View style={{ height: 22, width: 22, borderRadius: 11, borderWidth: 1, borderColor: "#1F51C6", justifyContent: "center", alignItems: "center" }}>
                              <View style={{ height: 14, width: 14, borderRadius: 11, backgroundColor: "#1F51C6" }}></View>
                          </View>
                              <View style={{ alignItems: "center", gap: 1 }}>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                                  <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              </View>
                          </View>
                          <View>
                              <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Dr {view?.doctorid?.nameOfTheDoctor} will start appointments</Text>
                          </View>
                      </View>
      
      
                       <View style={{ flexDirection: "row", gap: 9 }}>
                           <View><View style={{ height: 22, width: 22, borderRadius: 11, borderWidth: 1, borderColor: "#1F51C6", justifyContent: "center", alignItems: "center" }}>
                               <View style={{ height: 14, width: 14, borderRadius: 11, backgroundColor: "#1F51C6" }}></View>
                           </View>
                           </View>
                           <View>
                               <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Appointment Completed</Text>
                           </View>
                       </View>
                   </View>
      
      
               </View>
      
               <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
                   <TouchableOpacity style={{ backgroundColor: "#DF5436", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
                   onPress={()=>{Handlecancelappointment(view._id)}}
                   >
                       <View >
                           <Text style={{ fontWeight: "600", fontSize: 16,color:"#ffffff" }}>Cancel Appoinment</Text>
                       </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>setedit(true)} style={{ backgroundColor: "#1F51C6", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}>
                       <View >
                           <Text style={{ fontWeight: "600", fontSize: 16,color:"white" }}>Edit Appoinment</Text>
                       </View>
                   </TouchableOpacity>
               </View>  
        </View>
        
        
        
        ) :(
          <View>
           <Edit
            inputValue={inputValue}
            setInputValue={setInputValue}
            setedit={setedit}
            appointmentId={view._id}
            setShowAppointment={setShowAppointment}
           />
          </View>
        )
      }
  </View>
  )
}

export default ViewAppointment
