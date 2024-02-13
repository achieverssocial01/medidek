import { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { useRecoilSnapshot, useRecoilState } from "recoil"
// import { Userdata } from "../Recoil/Atom"
// import axios from "axios"
// import { axiosClient } from "../utils/axiosClient"



const AppointmentInstantPopUpcancel = ({ OpenPopUp,cancalAppointment}) => {
    
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
               
                 <View style={{width:"100%",height:40,justifyContent:"center",alignItems:"center",marginVertical:10}}>
                  <TouchableOpacity     onPress={OpenPopUp}>
                  <View style={{height:40,width:40,borderWidth:1,borderRadius:20,borderColor:"#FFFFFF",justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#FFFFFF"}}>X</Text>
                    </View>
                  </TouchableOpacity>
                 </View>
                <View style={{width:"100%",backgroundColor:"#FFFFFF",borderTopRightRadius:10,borderTopLeftRadius:10,paddingHorizontal:16,paddingVertical:24,position:"relative"}}>
                   
                    <Text style={{color:"#383838",fontWeight:"700",fontSize:24}}>Cancel Appointment</Text>
                    <Text style={{color:"#706D6D",fontWeight:"600",fontSize:13}}>Are you sure you want to proceed?</Text>

                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
                <TouchableOpacity style={{ backgroundColor: "#D9D9D9", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
                onPress={OpenPopUp}
                >
                    <View >
                        <Text style={{ fontWeight: "600", fontSize: 16 ,color:"#383838" }}>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1F51C6", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
                onPress={cancalAppointment}
                >
                    <View >
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>Confirm</Text>
                    </View>
                </TouchableOpacity>
            </View>
                </View>
            </View>
        </>
    )
}



export default AppointmentInstantPopUpcancel