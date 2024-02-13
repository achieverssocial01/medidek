import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native'
import React, { useContext, useState, useMemo } from 'react'
import UserContext from './Context/userContext'
import { useNavigation } from '@react-navigation/native'
import { axiosClient } from './utils/axiosClient'
import { launchImageLibrary } from 'react-native-image-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RadioGroup from 'react-native-radio-buttons-group';
import ChangePassword from './Stacknavigation/ChangePassword'



const windowwidth = Dimensions.get('window').width;
const windowheight =Dimensions.get('window').height
const HospitalEditProfile = () => {
  const img2 = "https://www.webhopersaustralia.com/wp-content/uploads/2021/06/web-design-Gold-Coast.jpg"
  const { userLogIn, setUserLogin } = useContext(UserContext);
  const [userImg, setUserImg] = useState(userLogIn?.user?.imgurl || img2)
  let [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation()
  const [userAccount, setuserAccount] = useState({
    nameOfhospitalOrClinic: userLogIn?.user?.nameOfhospitalOrClinic,
    hospitalType: userLogIn?.user?.hospitalType,
    enterFullAddress: userLogIn?.user?.enterFullAddress,
    location: userLogIn?.user?.location,
    landmark: userLogIn?.user?.landmark,
    img: userLogIn?.user?.imgurl
  })

  console.log(userLogIn);
  const [img, setImage] = useState({
    uri: "",
    name: "",
    filename: "",
    type: "",
  });
  const SelectImage = async () => {
    const options = {
      mediaType: "photo",
      durationLimit: 10,
      quality: 1,
      noData: true,
      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 500
    }
    const Images = await launchImageLibrary(options)
    setImage({
      ...img,
      uri: Images.assets[0].uri,
      name: Images.assets[0].fileName,
      filename: Images.assets[0].fileName,
      type: Images.assets[0].type
    })
    setUserImg(Images.assets[0].uri)
  }
  const savechanges = async () => {
    const formdata = new FormData()
    formdata.append("nameOfhospitalOrClinic",userAccount?.nameOfhospitalOrClinic)
    formdata.append("hospitalType",userAccount?.hospitalType)
    formdata.append("enterFullAddress",userAccount?.enterFullAddress)
    formdata.append("location",userAccount?.location)
    formdata.append("landmark",userAccount?.landmark)
    formdata.append("image",img.uri ? img : userAccount?.img)

    try {

      const result = await axiosClient.put(`/v2/master/${userLogIn?.user?._id}`, formdata, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      if (result.data.status === 'ok') {
        setUserLogin({ ...userLogIn, user: result.data.result })
        await AsyncStorage.setItem('data', JSON.stringify(result.data.result))
        navigation.navigate("Home")
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }





  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ paddingTop: 10,paddingHorizontal:5,backgroundColor:'#FFFFFF',height:windowheight, margin:5 }}>
          <View>
            <Text style={{ color: "black", fontSize: 20, fontWeight: "600", paddingVertical: 10 }}>
              Edit Profile
            </Text>
          </View>

          <View style={{ borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-evenly", gap: 8,  }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <View style={{ height: 60, width: 60, borderRadius: 30 }}>
                <Image source={{ uri: userImg ? userImg : img.uri }} style={{ width: "100%", height: "100%" }} />
              </View>
              <View style={{ display: "flex", justifyContent: "center" }}>

                <TouchableOpacity onPress={SelectImage}>
                  <Text style={{ color: "#1F51C6", fontWeight: "500" }}>Change Profile Picture</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600",margin:5 }}>Hospital Name</Text>
              <TextInput placeholder="Hospital Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20,}}
                value={userAccount?.nameOfhospitalOrClinic}
                onChangeText={(e) => setuserAccount({ ...userAccount, nameOfhospitalOrClinic: e })} />
            </View>
            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600",margin:5 }}>Hospital Type</Text>
              <TextInput placeholder="Hospital Type" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20,}}
                value={userAccount?.hospitalType}
                onChangeText={(e) => setuserAccount({ ...userAccount, hospitalType: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600",margin:5 }}>EnterFullAddress</Text>
              <TextInput placeholder="enter full address" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.enterFullAddress}
                onChangeText={(e) => setuserAccount({ ...userAccount, enterFullAddress: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600",margin:5 }}>location</Text>
              <TextInput
                inputMode='numeric'
                keyboardType='number-pad'
                placeholder="Location" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.location}
                onChangeText={(e) => setuserAccount({ ...userAccount, location: e })} />
            </View>
            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600",margin:5 }}>Landmark</Text>
              <TextInput
                inputMode='email'
                placeholder="landmark" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black',  backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.landmark}
                onChangeText={(e) => setuserAccount({ ...userAccount, landmark: e })} />
            </View>
            
            <View style={{ direction: "flex", gap: 6, paddingVertical: 12 }}>
              <TouchableOpacity onPress={savechanges}>
                <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Update Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangePassword}>
                <View style={{ borderWidth: 1.5, borderColor: "gray", width: "100%", paddingVertical: 12,marginVertical:10, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25 }}>
                  <Text style={{ color: "#383838", fontSize: 16, fontWeight: '600' }}>Change Password</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {showPassword ? <ChangePassword handleChangePassword={handleChangePassword} /> : null}

    </KeyboardAvoidingView>
  )
}

export default HospitalEditProfile

const styles = StyleSheet.create({})