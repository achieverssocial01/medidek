import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from "react-native"

import { useContext, useState } from "react"
import { axiosClient } from "../../utils/axiosClient"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome"
import UserContext from "../../Context/userContext"



const ResetPassword = ({ route }) => {

  const navigate = useNavigation()
  const {role,setrole} =useContext(UserContext)
  const [updatedPassword, setUpDatedPassword] = useState({
    password: "",
    role: role,
    phone: ""
  })
  const [error, setError] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlesubmit = async () => {
    if (!updatedPassword.phone ||
      !updatedPassword.password ||
      !updatedPassword.role) {
      setError(true);
      return;
    }
    console.log(updatedPassword)
    const res = await axiosClient.post("/v2/userpasswordupdated", { phone: updatedPassword.phone, password: updatedPassword.password, role: updatedPassword.role });
   console.log(res);
    if (res.data.status === "ok") {
      Alert.alert("User Password updated succesfully");
      navigate.navigate("loginWithEmail")
    }
    else {
      console.log(res);
    }
  }
  return <View style={{ flex: 1,justifyContent:"center",marginHorizontal:10}}>
      <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingHorizontal: 30, paddingVertical: 32, borderRadius: 10, gap: 13 }}>
        <View><Text style={{ textAlign: "center", fontWeight: "700", fontSize: 25, color: "#FFFFFF" }}>Reset Password?</Text></View>
        
        <TextInput
          style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", color: "#FFFFFF", fontSize: 18 }}
          placeholder="+91"
          placeholderTextColor="#FFFFFF"
          onChangeText={(e) => setUpDatedPassword({ ...updatedPassword, phone: e })}
        />
       {error && !updatedPassword.phone && <Text style={{color:"yellow"}}>Please Enter Phone</Text>}
        <TextInput
          style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", color: "#FFFFFF", fontSize: 18 }}
          placeholder="Enter new password"
          placeholderTextColor="#FFFFFF"
          onChangeText={(e) => setUpDatedPassword({ ...updatedPassword, password: e })}
        secureTextEntry={isPasswordVisible}
        />
        <TouchableOpacity onPress={setIsPasswordVisible}>
          {
            isPasswordVisible ? 
            <Text style={{padding: 0, marginTop: -32, marginLeft: 'auto', marginRight: 20}} onPress={()=>setIsPasswordVisible(!isPasswordVisible)}><Icon name='eye' size={15} color='white' /></Text>
            :
            <Text style={{padding: 0, marginTop: -32, marginLeft: 'auto', marginRight: 20}} onPress={()=>setIsPasswordVisible(!isPasswordVisible)}><Icon  name='eye-slash' size={15} color='white' /></Text>
          }
        </TouchableOpacity>
        {
          error && !updatedPassword.password && <Text style={{ color: "yellow" }}>Please enter password</Text>
        }

        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: "center",
          }}
          onPress={handlesubmit}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
        </TouchableOpacity>
      </View>
    {/* </ImageBackground> */}

  </View>
}

export default ResetPassword