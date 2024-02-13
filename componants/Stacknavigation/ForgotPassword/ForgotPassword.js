import { ImageBackground, Text, View ,TextInput ,TouchableOpacity,Alert } from "react-native"
import { axiosClient } from "../../utils/axiosClient"
import { useState } from "react"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"





const ForgotPassword =(props)=>{
  const navigation =useNavigation()
  const [userphone,setUserphone]=useState({phone:""})
  const [userNotFound, setUserNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const handlesubmit =async()=>{
    if(!userphone.phone){
        seterror(true);
        return;
    }
    try {
      setLoading(true)
      const res = await axiosClient.post("/v2/forgotpassword",{phone:userphone.phone});
      if(res.data.status === "ok"){
        Alert.alert("Phone Verified succesfully ");
        navigation.navigate("ResetPassword")
        setLoading(false)
      }
      else if(res.data.status === "error" && res.data.statusCode === 404) {
         setUserNotFound(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error.message)
    }
   
}
    return <View style={{flex:1,justifyContent:"center",marginHorizontal:10}}>
              <View style={{backgroundColor:"#1F51C6",width:"100%",paddingHorizontal:30,paddingVertical:32,borderRadius:10,gap:13}}>
<View><Text style={{textAlign:"center",fontWeight:"700",fontSize:25,color:"#FFFFFF"}}>Forgot Password?</Text>
            <Text style={{textAlign:"center",fontSize:14,color:"#FFFFFF",marginTop:8}}>Please enter your Mobile number so we can send you a verification code</Text></View>
            <TextInput
            style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF",color:"#FFFFFF",fontSize:18 }}
            placeholder="+91"
              placeholderTextColor="#FFFFFF"
              keyboardType="numeric"
            onChangeText={(e)=>{setUserphone({...userphone,phone:e})
          setUserNotFound(false)
          }}
          />
                         {userNotFound && <Text style={{color:'yellow'}}>User Not Found</Text>}

             <TouchableOpacity
             disabled={loading ? true : false}
          style={{
            width: "100%",
            backgroundColor: loading ? "#D9D9D9" : "#FFFFFF",
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

export default ForgotPassword