import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { axiosClient } from "./utils/axiosClient";
import UserContext from "./Context/userContext";






const DUID = () => {
      const navigation =useNavigation()
    const [doctorid,setdoctorid]=useState("");
    const [message,setmessage]=useState("");
    const  {userLogIn,doctorDetail,setdoctorDetail} = useContext(UserContext)

   const getdoctorinfo =async()=>{
    if(!doctorid){
        setmessage("pls enter doctorid")
        return ;
    }
    const res = await axiosClient.post("/v2/getdoctorinfo",{
        doctorid:doctorid,
        hospitalId:userLogIn?.user?._id
    })
   if(res?.data?.status == "error"){
    setmessage(res?.data?.message)
    console.log(res?.data)
   }
   else if(res?.data?.status == "ok"){
         setdoctorDetail(res?.data?.result)
         navigation.navigate("AddDoctorByHospital");
   }
   }
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
                <View style={{ backgroundColor: "#FFFFFF", padding: 20, borderWidth: 1, width: "100%", borderRadius: 5 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ color: "#383838", fontWeight: "600" }}>Add Doctor</Text>
                        <Text style={{ color: "#383838" }} onPress={()=>navigation.goBack()}>X</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#D9D9D9", width: "100%", marginVertical: 14 }}></View>

                    <View style={{ width: "100%", paddingHorizontal: 6 }}>
                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} > Enter DUID <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Enter DUID" placeholderTextColor="#D9D9D9"
                                onChangeText={(e) => setdoctorid(e)}
                            ></TextInput>
                            {message && <Text style={{color:"red"}}>{message}</Text>}
                        </View>

                        <TouchableOpacity onPress={getdoctorinfo}>
                            <View style={{
                                backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12
                                , display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color:"#FFFFFF"}}>Add Doctor</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    )
}



export default DUID