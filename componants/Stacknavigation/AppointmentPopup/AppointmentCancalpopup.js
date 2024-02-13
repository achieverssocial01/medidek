import { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { useRecoilSnapshot, useRecoilState } from "recoil"
// import { Userdata } from "../Recoil/Atom"
// import axios from "axios"
// import { axiosClient } from "../utils/axiosClient"



const AppointmentCancelPopUp = ({ OpenPopUp ,cancalAppointment,appointmentId}) => {
    // const [userPassword, setuserPassword] = useState({ password: "" })
    // const [userConfirmPassword, setuserConfirmPassword] = useState({ password: "" })
    // const [olduserPassword, setolduserPassword] = useState({ password: "" })
    // const [userProfile, setuserProfile] = useRecoilState(Userdata)

    // const ChangePassword = async () => {

    //     if (userConfirmPassword.password !== userPassword.password) {
    //         return Alert.alert("new Password not match")
    //     }
    //     else {
    //         try {
    //             const result = await axiosClient.put(`updateUserpatientPasswordByapp/${userProfile[0]._id}`,{oldpassword:olduserPassword.password,password:userConfirmPassword.password})
    //             console.log(result.data.statusCode);
    //             if (result.data.statusCode == 201) {
    //                 Alert.alert("Successfully update !!")
    //                 props.handleChangePassword()
    //             }
    //             else {
    //                 Alert.alert("not updated")
                
    //             }


    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }



    // }
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                {/* <View style={{ backgroundColor: "#FFFFFF", padding: 20, borderWidth: 1, width: "100%", borderRadius: 5 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ color: "#383838", fontWeight: "600" }}>Change Password</Text>
                        <Text style={{ color: "#383838" }} onPress={() => props.handleChangePassword()}>X</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#D9D9D9", width: "100%", marginVertical: 14 }}></View>

                    <View style={{ width: "100%", paddingHorizontal: 6 }}>
                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} >Enter Old Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9"
                                onChangeText={(e) => setolduserPassword({ ...olduserPassword, password: e })}
                            ></TextInput>
                        </View>

                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} >Enter New Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9" onChangeText={(e) => setuserPassword({ ...userPassword, password: e })}></TextInput>
                        </View>

                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} > Confirm New  Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9"
                                onChangeText={(e) => setuserConfirmPassword({ ...userConfirmPassword, password: e })}
                            ></TextInput>
                        </View>

                        <TouchableOpacity onPress={ChangePassword}>
                            <View style={{
                                backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12
                                , display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Change Password</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.handleChangePassword()}>

                            <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View> */}
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
                onPress={()=>cancalAppointment(appointmentId)}
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



export default AppointmentCancelPopUp