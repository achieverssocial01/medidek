import { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { axiosClient } from "../../utils/axiosClient"
// import {  useRecoilValue } from "recoil"
// import { Userdata } from "../../Recoil/Atom"
// import axios from "axios"





const ReviewPopUp = ({ OpenPopUp, doctorId }) => {
    // const [userPassword, setuserPassword] = useState({ password: "" })
    // const [userConfirmPassword, setuserConfirmPassword] = useState({ password: "" })
    // const [olduserPassword, setolduserPassword] = useState({ password: "" })
    // const userProfile = useRecoilValue(Userdata)

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

     const [reviews, setreviews] = useState({ name:userProfile[0].name, doctorId:doctorId,rating:"5",masseage:"" })
     const postReview = async()=>{
        console.log('')
//    try {
//     if(!reviews.masseage){
//         return Alert.alert("please fill masseage ")
//     }
//     const result =await axiosClient.post(`reviewCreation/${doctorId}`,reviews)
//     console.log((result.data.statusCode));
//     if(result.data.statusCode===201){
//         OpenPopUp()
//        return Alert.alert("Thank you ")
//     }

//     if(result.data.statusCode===500){
//         OpenPopUp()
//        return Alert.alert("Something went to wrong")
//     }
    
//    } catch (error) {
//     Alert.alert(error)
//    }
     }
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "center", alignItems: "center",paddingHorizontal:16 }}>
              

                <View style={{ width: "100%", backgroundColor: "#FFFFFF",borderRadius:5, paddingHorizontal: 16, paddingTop: 10, position: "relative" }}>

                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}><Text style={{ color: "#383838", fontWeight: "500", fontSize: 16 }}>Write A Review</Text>
                       <TouchableOpacity onPress={OpenPopUp}><Text style={{ color: "#383838", fontWeight: "500", fontSize: 24 }}>x</Text></TouchableOpacity>
                    </View>


                    <View style={{ height: 1, width: "100%", backgroundColor: "#D9D9D9",marginVertical:8 }}></View>

                    <View style={{ paddingHorizontal: 10,marginVertical:10 }}>
                        <View><Text style={{ color: "#383838",fontWeight:"600",fontSize:15 }}>Rate Appointment</Text>
                            <View>
                                <Text style={{ color: "#383838" }}>start</Text>
                            </View>
                        </View>

                        <View style={{marginTop:15}}>
                            <Text style={{ color: "black",fontWeight:"600",fontSize:15 }}>Leave a Review</Text>
                            <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderColor: "#D9D9D9",textAlignVertical:"top",color:"black" }} placeholder="Type your review Here" placeholderTextColor="#D9D9D9"onChangeText={(e)=>setreviews({...reviews,masseage:e})} ></TextInput>
                        </View>

                        <TouchableOpacity onPress={postReview} >
                            <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20,backgroundColor:"#1F51C6",marginVertical:16 }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#FFFFFF" }}>Post Review</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </>
    )
}



export default ReviewPopUp