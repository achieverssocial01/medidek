import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useContext, useState, useMemo } from 'react'
import UserContext from './Context/userContext'
import { useNavigation } from '@react-navigation/native'
import { axiosClient } from './utils/axiosClient'
import { launchImageLibrary } from 'react-native-image-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChangePassword from './Stacknavigation/ChangePassword'
import RadioGroup from 'react-native-radio-buttons-group';



const AddDoctorByHospital = () => {
  const img2 = "https://www.webhopersaustralia.com/wp-content/uploads/2021/06/web-design-Gold-Coast.jpg"
  const { userLogIn, setUserLogin,doctorDetail,setdoctorDetail } = useContext(UserContext);
  const [userImg, setUserImg] = useState(userLogIn?.user?.imgurl || img2)
  const navigation = useNavigation()
  const [DoctorDetail, setDoctorDetail] = useState({
    name: doctorDetail?.nameOfTheDoctor,
    qulification: doctorDetail?.qulification,
    speciality: doctorDetail?.speciality,
    yearOfExprience: doctorDetail?.yearOfExprience,
    email: doctorDetail?.email,
    phone: doctorDetail?.phone,
    connsultationFee: doctorDetail?.connsultationFee,
    location: doctorDetail?.location,
    description: doctorDetail?.description,
    acceptAppointments: doctorDetail?.acceptAppointments,
    doctorid:doctorDetail?.doctorid,
    img: doctorDetail?.imgurl
  })

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
    formdata.append("nameOfTheDoctor", DoctorDetail?.name)
    formdata.append("qulification", DoctorDetail?.qulification)
    formdata.append("speciality", DoctorDetail?.speciality)
    formdata.append("yearOfExprience", DoctorDetail?.yearOfExprience)
    formdata.append("email", DoctorDetail?.email)
    formdata.append("phone", DoctorDetail?.phone)
    formdata.append("connsultationFee", DoctorDetail?.connsultationFee)
    formdata.append("description", DoctorDetail?.description)
    formdata.append("acceptAppointments", DoctorDetail?.acceptAppointments)
    formdata.append("location", DoctorDetail?.location)
    formdata.append("image", img.uri ? img : DoctorDetail?.img)

    try {

      const result = await axiosClient.put(`/v2/addDoctor/${userLogIn?.user?._id}`, formdata, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result.data.result);
      if (result.data.status === 'ok') {
        // setUserLogin({ ...userLogIn, user: result.data.result })
        // await AsyncStorage.setItem('data', JSON.stringify(result.data.result))
        navigation.navigate("Home")
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




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ paddingTop: 10, paddingHorizontal: 16, backgroundColor: "#FFFFFF" }}>
          <View>
            <Text style={{ color: "black", fontSize: 20, fontWeight: "600", paddingVertical: 10 }}>
              Add Doctor
            </Text>
          </View>

          <View style={{ borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-evenly", gap:  9, backgroundColor:'#FFFFFF'}}>
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
                value={DoctorDetail?.name}
                editable={false}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, name: e })} />
            </View>
            
            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Doctor Qualification</Text>
              <TextInput placeholder="Doctor Qualifiction" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20,}}
                value={DoctorDetail?.qulification}
                editable={false}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, qulification: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Doctor Speciality</Text>
              <TextInput placeholder="speciality" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.speciality}
                editable={false}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, speciality: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Year Of Exprience</Text>
              <TextInput
                inputMode='numeric'
                keyboardType='number-pad'
                placeholder="yearOfExprience" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.yearOfExprience?.toString()}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, yearOfExprience: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Email Id</Text>
              <TextInput
                inputMode='email'
                editable={false}
                placeholder="Emailid" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black',  backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.email}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, email: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Phone</Text>
              <TextInput
                inputMode='numeric'
                keyboardType='number-pad'
                placeholder="Phone" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.phone?.toString()}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, phone: e })} />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>ConnsultationFee</Text>
              <TextInput
                inputMode='numeric'
                keyboardType='number-pad'
                placeholder="connsultationFee" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }} 
                value={DoctorDetail?.connsultationFee?.toString()
                }
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, connsultationFee: e })}
              />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Location</Text>
              <TextInput placeholder="Location" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.location}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, location: e })}
              />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Description</Text>
              <TextInput placeholder="Description" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={DoctorDetail?.description}
                onChangeText={(e) => setDoctorDetail({ ...DoctorDetail, description: e })} />
            </View>
           <View>
           <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600" }}>Appointment Status</Text>

            <Text style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12,paddingVertical: 8, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, justifyContent:'center'}}>
                  <RadioGroup
                radioButtons={radioButtons}
                onPress={(text)=>{setDoctorDetail({...DoctorDetail,acceptAppointments:text})}}
                selectedId={DoctorDetail?.acceptAppointments}
                layout='row'
              />
            </Text>
            </View>

            <View style={{ direction: "flex", gap: 6, paddingVertical: 12 }}>
              <TouchableOpacity onPress={savechanges}>
                <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Save Changes</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddDoctorByHospital

const styles = StyleSheet.create({})