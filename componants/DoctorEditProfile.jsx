import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useMemo } from 'react'
import UserContext from './Context/userContext'
import { useNavigation } from '@react-navigation/native'
import { axiosClient } from './utils/axiosClient'
import { launchImageLibrary } from 'react-native-image-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChangePassword from './Stacknavigation/ChangePassword'
import RadioGroup from 'react-native-radio-buttons-group';



const DoctorEditProfile = () => {
  const img2 = "https://www.webhopersaustralia.com/wp-content/uploads/2021/06/web-design-Gold-Coast.jpg"
  const { userLogIn, setUserLogin } = useContext(UserContext);
  const [userImg, setUserImg] = useState(userLogIn?.user?.imgurl || img2)
  let [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation()
  const [userAccount, setuserAccount] = useState({
    name: userLogIn?.user?.nameOfTheDoctor,
    qulification: userLogIn?.user?.qulification,
    speciality: userLogIn?.user?.speciality,
    yearOfExprience: userLogIn?.user?.yearOfExprience,
    email: userLogIn?.user?.email,
    phone: userLogIn?.user?.phone,
    connsultationFee: userLogIn?.user?.connsultationFee,
    location: userLogIn?.user?.location,
    description: userLogIn?.user?.description,
    acceptAppointments: userLogIn?.user?.acceptAppointments,
    img: userLogIn?.user?.imgurl

  })
  const [loading,setloading]=useState(false)

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
    setloading(true)
    const formdata = new FormData()
    formdata.append("nameOfTheDoctor", userAccount?.name)
    formdata.append("qulification", userAccount?.qulification)
    formdata.append("speciality", userAccount?.speciality)
    formdata.append("yearOfExprience", userAccount?.yearOfExprience)
    formdata.append("email", userAccount?.email)
    formdata.append("phone", userAccount?.phone)
    formdata.append("connsultationFee", userAccount?.connsultationFee)
    formdata.append("description", userAccount?.description)
    formdata.append("acceptAppointments", userAccount?.acceptAppointments)
    formdata.append("location", userAccount?.location)
    formdata.append("image", img.uri ? img : userAccount?.img)

    try {

      const result = await axiosClient.put(`/v2/editDoctorfile/${userLogIn?.user?._id}`, formdata, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result.data.result);
      if (result.data.status === 'ok') {
        setUserLogin({ ...userLogIn, user: result.data.result })
        await AsyncStorage.setItem('data', JSON.stringify(result.data.result))
        setloading(false)
        navigation.navigate("Profile")
      }
    } catch (error) {
      console.log(error.message)
    }

  }



  const radioButtons = useMemo(() => ([
    {
      id: 'bySlot', // acts as primary key, should be unique and non-empty string
      label: 'bySlot',
      value: 'option1'
    },
    {
      id: 'byToken',
      label: 'byToken',
      value: 'option2'
    }
  ]), []);



  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
    {
      loading  ? <ActivityIndicator size={"large"}/> : (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={{ paddingTop: 10, paddingHorizontal: 16, backgroundColor: "#FFFFFF" }}>
            <View>
              <Text style={{ color: "black", fontSize: 20, fontWeight: "600", paddingVertical: 10 }}>
                Edit Profile
              </Text>
            </View>
  
            <View style={{ borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-evenly", gap: 5 ,}}>
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
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Doctor's Name</Text>
                <TextInput placeholder="First Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20,}}
                  value={userAccount?.name}
                  onChangeText={(e) => setuserAccount({ ...userAccount, name: e })} />
              </View>
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Doctor Qualification</Text>
                <TextInput placeholder="First Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20,}}
                  value={userAccount?.qulification}
                  onChangeText={(e) => setuserAccount({ ...userAccount, qulification: e })} />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Doctor Speciality</Text>
                <TextInput placeholder="speciality" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.speciality}
                  onChangeText={(e) => setuserAccount({ ...userAccount, speciality: e })} />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Year Of Exprience</Text>
                <TextInput
                  inputMode='numeric'
                  keyboardType='number-pad'
                  placeholder="yearOfExprience" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.yearOfExprience?.toString()}
                  onChangeText={(e) => setuserAccount({ ...userAccount, yearOfExprience: e })} />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Email Id</Text>
                <TextInput
                  inputMode='email'
                  placeholder="Emailid" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black',  backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.email}
                  onChangeText={(e) => setuserAccount({ ...userAccount, email: e })} />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Phone</Text>
                <TextInput
                  inputMode='numeric'
                  keyboardType='number-pad'
                  placeholder="Phone" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.phone?.toString()}
                  onChangeText={(e) => setuserAccount({ ...userAccount, phone: e })} />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>ConnsultationFee</Text>
                <TextInput
                  inputMode='numeric'
                  keyboardType='number-pad'
                  placeholder="connsultationFee" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }} value={userAccount?.connsultationFee?.toString()}
                  onChangeText={(e) => setuserAccount({ ...userAccount, connsultationFee: e })}
                />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Location</Text>
                <TextInput placeholder="Location" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.location}
                  onChangeText={(e) => setuserAccount({ ...userAccount, location: e })}
                />
              </View>
  
              <View>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Description</Text>
                <TextInput placeholder="Description" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                  value={userAccount?.description}
                  onChangeText={(e) => setuserAccount({ ...userAccount, description: e })} />
              </View>
  
             <View>
             <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Appointment Status</Text>
  
              <Text style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12,paddingVertical: 8, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, justifyContent:'center'}}>
                    <RadioGroup
                  radioButtons={radioButtons}
                  onPress={(text)=>{setuserAccount({...userAccount,acceptAppointments:text})}}
                  selectedId={userAccount?.acceptAppointments}
                  layout='row'
                  labelStyle={{color:'#383838',}}
                  accessibilityLabel='#383838'
                />
              </Text>
              </View>
              <View style={{ direction: "flex", gap: 6, paddingVertical: 12 }}>
                <TouchableOpacity onPress={savechanges}>
                  <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Save Changes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChangePassword}>
                  <View style={{ borderWidth: 1, borderColor: "gray", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
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
   
    </>
  )
}

export default DoctorEditProfile

const styles = StyleSheet.create({})