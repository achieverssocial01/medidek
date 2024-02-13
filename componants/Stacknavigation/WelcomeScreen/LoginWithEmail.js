import React, { useCallback, useContext,  useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { axiosClient } from "../../utils/axiosClient";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UserContext from "../../Context/userContext";


const windowheight= Dimensions.get("window").height;

const LoginWithEmail = (props) => {


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const navigation = useNavigation()
  const {userLogIn, setUserLogin,role} =useContext(UserContext)
  const [user, setUser] = useState({ email: "", password: "", role: role});

  

  const FindUser = async () => {
    try {
      if (!user.email || !user.password || !user.role || !user.email.includes("@")) {
        setError(true);
        return;
      }
      setLoading(true)
      const result = await axiosClient.post("/v2/FindUserByNameAndPassword", user)
      if (result.data.statusCode === 403) {
        setLoading(false)
        setWrongPassword(true)
      }
      else if (result.data.statusCode === 404) {
        setLoading(false)
        setInvalidEmail(true)
      }
      else if(result?.data?.status === "ok"){
        if(result?.data?.result?.ispatient){
          await AsyncStorage.setItem("patienttoken", result.data.result.accessToken)
          await AsyncStorage.setItem("data", JSON.stringify(result.data.result.ispatient))
          setUserLogin({...userLogIn,user:result.data.result.ispatient,token:result.data.result.accessToken})
          return  navigation.navigate("tabbord")
        }
        if(result?.data?.result?.isdoctor){
          await AsyncStorage.setItem("doctortoken", result.data.result.accessToken)
          await AsyncStorage.setItem("data", JSON.stringify(result.data.result.isdoctor))
          setUserLogin({...userLogIn,user:result.data.result.isdoctor,token:result.data.result.accessToken})
          return  navigation.navigate("DoctorDashboard")
        }
        if(result?.data?.result?.ishospital){
          await AsyncStorage.setItem("hospitaltoken", result.data.result.accessToken)
          await AsyncStorage.setItem("data", JSON.stringify(result.data.result.ishospital))
          setUserLogin({...userLogIn,user:result.data.result.ishospital,token:result.data.result.accessToken})
          return navigation.navigate("MasterDashboard")
          
        }
      }
    } catch (error) {
       Alert.alert("Something Went wrong",error?.message)
    }
  };


  const checkdata =async()=>{
    
    const token = await AsyncStorage.getItem("patienttoken");
    const token1 = await AsyncStorage.getItem("doctortoken");
    const token2 = await AsyncStorage.getItem("hospitaltoken");
    if(token){
     return  navigation.navigate("tabbord")
    }
    else if(token1){
      return  navigation.navigate("DoctorDashboard") 
    }
    else if(token2){
      return  navigation.navigate("MasterDashboard") 
    }
  
  }

  useFocusEffect(
    useCallback(() => {
       checkdata()
    }, [])
  );

  return (
    <>
    {
      loading ? 
      <View style={{justifyContent:"center",alignItems:"center",height:windowheight}}>
      <ActivityIndicator size={"large"}/>
      </View> : (
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
          <View
            style={{
              backgroundColor: "#1F51C6",
              alignItems: "center",
              width: "100%",
              paddingVertical: 8,
              paddingHorizontal: 14,
              gap: 12,
              borderRadius: 9,
  
            }}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
                Welcome Back!
              </Text>
              <View
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  gap: 4,
                  flexDirection: "row",
                }}
              >
  
                <TouchableOpacity
                  style={{
                    flex: 1 / 2,
                    borderRadius: 20,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: "#383838", fontWeight: "500" }}>
                    Login With Email
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <View style={{ width: "100%" }}>
              <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", color: "#FFFFFF", fontSize: 20 }}
                placeholder="Email"
                placeholderTextColor="#FFFFFF"
                onChangeText={(e) =>{ setUser({ ...user, email: e })
                  setInvalidEmail(false)
              }}
              />
              {
                invalidEmail && <Text style={{ color: 'yellow' }}>* User Does Not Exist</Text>
              }
              {
                error && user.email && !user.email?.includes("@") && <Text style={{ color: "yellow" }}>Please Enter Valid Email</Text>
              }
              {
                error && !user.email && <Text style={{ color: "yellow" }}>Please Enter Email</Text>
              }
            </View>
  
            <View style={{ width: "100%" }}>
              <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", color: "#FFFFFF", fontSize: 20 }}
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                onChangeText={(e) =>{ setUser({ ...user, password: e })
                setWrongPassword(false)
              }}
                secureTextEntry={isPasswordVisible}
              />
              <TouchableOpacity
                onPress={setIsPasswordVisible}
              >
                {
                  isPasswordVisible ?
                    <Text style={{ padding: 0, marginTop: -32, marginLeft: "auto", marginRight: 20 }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}> <Icon name="eye-slash" size={15} color="white" /></Text>
                    :
                    <Text style={{ padding: 0, marginTop: -32, marginLeft: "auto", marginRight: 20 }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}> <Icon name="eye" size={15} color="white" /></Text>
  
                }
              </TouchableOpacity>
              {
                wrongPassword && <Text style={{ color: 'yellow' }}>* Incorrect Password</Text>
              }
              {
                error && !user.password && <Text style={{ color: "yellow" }}>Please enter password</Text>
              }
  
            </View>
  
            <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
              <Text style={{ color: '#DCE3F6', fontSize: 15 }}>Remember me</Text>
  
  
              <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Forgot Password ?</Text>
              </TouchableOpacity>
  
  
            </View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: loading ? "#D9D9D9":"#FFFFFF",
                paddingVertical: 10,
                borderRadius: 25,
                alignItems: "center",
              }}
              onPress={FindUser}
              disabled={loading ? true : false}
            >
              <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
            </TouchableOpacity>
  
            
                  <View style={{ width: '100%', alignItems: 'center',flexDirection:"row", justifyContent:'center' }}>
                      <Text style={{ color: 'white', fontSize: 12, fontWeight: '400' }}>
                      Do not have Account 
                      </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('createAccountpage')}
                    disabled={loading}>
                      <View style={{backgroundColor:'#FFFFFF', borderRadius:10, padding:5, margin:3,opacity:0.8}}>
                      <Text
                       style={{ color: 'blue', fontSize: 15, fontWeight: '700',marginHorizontal:10, padding:3, textDecorationStyle:"solid",textDecorationColor:"blue",textDecorationLine:"underline"}}
                       >
                        SignUp
                      </Text>
                      </View>
                  </TouchableOpacity>
                    </View>
          </View>
        {/* </ImageBackground> */}
  
      </View>
      )
    }
   
    </>
  );
};

export default LoginWithEmail;
