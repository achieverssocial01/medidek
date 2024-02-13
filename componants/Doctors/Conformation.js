import { Text, View, Image, TouchableOpacity,Alert } from "react-native"
// import { useRecoilState } from "recoil"
// import { UserConformationmasseage } from "../Recoil/Atom"
import {useState} from "react"
import AppointmentInstantPopUpcancel from "../Stacknavigation/AppointmentPopup/AppointmentInstantPopUpcancel"
import { axiosClient } from "../utils/axiosClient"
const Conformation = (props) => {
    // const [user, setuser] = useRecoilState(UserConformationmasseage)
    const [cancel,setCancel]=useState(true)
    const [ShowPopUp,setShowPopUp]=useState(false)
    const AppointmentId=user[0]._id
    const dt = new Date(user[0].appointmentDate);
    const date = dt.toISOString().split('T')[0];


    const cancalAppointment= async ( )=>{
        let result =await axiosClient.put(`updateUserAppointment/${AppointmentId}`,{status:"cancal"})
      if(result.data.statusCode===201){
        setCancel(false)
        setShowPopUp(!ShowPopUp)
        Alert.alert("cancel Appointment ")
      }
    }
    const OpenPopUp=()=>{
        setShowPopUp(!ShowPopUp)
    }
    return <>
    {
        cancel?  <View style={{ paddingHorizontal: 6, paddingVertical: 16, backgroundColor: "#FFFFFF" }}>
        <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#383838" }}>Appoinment Confirm</Text>
                <Text style={{ fontSize: 13, fontWeight: "700", color: "#383838" }}>{user[0].doctorName} at {user[0].appointmentTime} pm ,{date}</Text>
                <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Name:{user[0].patientName}</Text>
                <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Token no:{user[0].token}</Text>
                <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Gender:{user[0].gender}</Text>
                <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Phone No :{user[0].phoneNumber}</Text>
            </View>

            {/* {"appointmentDate": 2023-09-20T12:06:05.365Z, "appointmentTime": "12:00", "doctorName": "Abhay", "doctorsId": "650a0e4b783c95cf4eedb883", "gender": "male", "hospitalId": "", "patientName": "Lokesh zade.🖤", "phoneNumber": "8855843505", "updatedEmailAddress": "zadelokesh1@gmail.com", "userId": "650a8b29a9c1e2cd838133c1"} */}

            <View style={{ flex: 1, display: "flex", alignItems: "center", marginHorizontal: 1 }}>
                <View style={{ width: 72, height: 72, backgroundColor: "#15B912", borderRadius: 36, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require("../Assets/Right.png")} style={{ width: "60%", height: "60%" }} resizeMode="contain"></Image>
                </View>
            </View>


        </View>
        {/* 
        Button Section  */}

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
            <TouchableOpacity style={{ backgroundColor: "#B92612", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
            onPress={()=>setShowPopUp(!ShowPopUp)}
            >
                <View >
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Cancel Appoinment</Text>
                </View>
            </TouchableOpacity>
        </View>

    </View> :<View style={{ paddingHorizontal: 6, paddingVertical: 16 }}>
            <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10 ,display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"row" }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#383838" }}>Appoinment Cancel !</Text>
                    <Text style={{ fontSize: 13, fontWeight: "700", color: "#383838" }}>{user[0].doctorName} at {user[0].appointmentTime} pm ,{date}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Name:{user[0].patientName}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Token no:{user[0].token}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Gender:{user[0].gender}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "#383838" }}>Phone:{user[0].phoneNumber}</Text>
                </View>

               <View style={{flex:1, display:"flex", alignItems:"center"}}>
               <View style={{ width: 72, height: 72, backgroundColor: "#B92612", borderRadius: 36, justifyContent: "center", alignItems: "center"  }}>
                    <Image source={require("../Assets/cross.png")} style={{ width: "60%", height: "60%" }} resizeMode="cover"></Image>
                </View>
               </View>


            </View>
            <TouchableOpacity style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
            onPress={()=>props.navigation.navigate("Searchdoctor")}
            >
                <View >
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Book Appoinment</Text>
                </View>
            </TouchableOpacity>
        </View> 
    }
     {ShowPopUp?<AppointmentInstantPopUpcancel OpenPopUp={OpenPopUp} cancalAppointment={cancalAppointment}/>:null}
    </>
}


export default Conformation