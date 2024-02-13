import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { axiosClient } from './utils/axiosClient';
import UserContext from './Context/userContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const windowwidth = Dimensions.get('window').width
const windowheight = Dimensions.get('window').height


const DoctorAppointmentInHospital = () => {
const navigation = useNavigation()
  const { userLogIn,setdoctorDetail,doctorDetail } = useContext(UserContext)
  const [onlinependingappointments,setonlinependinappointments]=useState([])
  const [Tokenpendingappointments,setTokenpendinappointments]=useState([])
  console.log(onlinependingappointments,Tokenpendingappointments)
 const getpendingappointment =async()=>{
      const res = await axiosClient.get(`/v2/getPendingAppointmentForDoctor/${doctorDetail?._id}`)
      console.log("pending appointment",res?.data?.result)
      setonlinependinappointments(res?.data?.result[0])
      setTokenpendinappointments(res?.data?.result[1])
  }
 useEffect(()=>{
    getpendingappointment()
 },[doctorDetail?._id])
  const windowheight = Dimensions.get('window').height;
  return (
    <View style={{ margin: 5, backgroundColor: '#FFFFFF', height: windowheight }}>
      <View style={{}}>
        <View style={{ backgroundColor: '#DCE3F6', borderRadius: 5, justifyContent: 'center', margin: 5, paddingHorizontal: 5, paddingVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: userLogIn?.user?.imgurl
                      ? userLogIn?.user?.imgurl
                      : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                  }}
                  width={70}
                  height={70}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>Dr{doctorDetail?.nameOfTheDoctor}</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#383838' }}>{doctorDetail?.speciality}</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#383838' }}>Rating: {doctorDetail?.reviews?.length}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#15B912", borderRadius: 25, width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, marginVertical: 10 }}
          onPress={() => navigation.navigate("BookAppointmentsByHospital")}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#1F51C6", borderRadius: 25, width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, }}
          onPress={() => navigation.navigate("DoctorAppointmentSettingByHospital")}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}>Change Setting</Text>
        </TouchableOpacity>
      </View>








      <View style={{ marginVertical: 15, flexDirection: "column", borderWidth:1.5, borderColor:'#D9D9D9', margin:5, height:windowheight,marginVertical:16,flex:1}}>
        <View style={{flex:5}}>
          <Text style={{ color: '#FFFFFF', backgroundColor: '#1F51C6', fontSize: 17, fontWeight: '700', padding: 15, borderRadius: 3 }}>Upcoming Appointments</Text>
         <ScrollView>
          {
            onlinependingappointments?.length == 0 && Tokenpendingappointments?.length ==0 ? 
            <View style={{ backgroundColor: '#DCE3F6',  borderRadius: 5, marginHorizontal: 10, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#383838', margin: 10,textAlign:"center" }}>No Appointment Found</Text>
          </View> 
           : 
            onlinependingappointments?.length > 0 && onlinependingappointments.map(()=>(
                     <View style={{ backgroundColor: '#DCE3F6', flexDirection: 'row', borderRadius: 5, marginHorizontal: 15, marginVertical: 10, paddingVertical: 15, paddingHorizontal: 10, }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', borderRadius: 50, backgroundColor: '#1F51C6', width: 40, height: 40, textAlign: 'center', paddingTop: 7 }}>1</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', margin: 10 }}>Appointment At</Text>
          </View>
            ))
          }
          {
            Tokenpendingappointments?.length > 0 && Tokenpendingappointments.map(()=>(
                     <View style={{ backgroundColor: '#DCE3F6', flexDirection: 'row', borderRadius: 5, marginHorizontal: 15, marginVertical: 10, paddingVertical: 15, paddingHorizontal: 10, }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', borderRadius: 50, backgroundColor: '#1F51C6', width: 40, height: 40, textAlign: 'center', paddingTop: 7 }}>1</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', margin: 10 }}>Appointment At</Text>
          </View>
            ))
          }
          </ScrollView>
          </View>
   

        <View  style={{flex:1}}>
          <TouchableOpacity
            style={{ backgroundColor: "#1F51C6", borderRadius: 25, width: '80%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, marginLeft: '8%', }}
            onPress={() => navigation.navigate("ViewAllAppointmentsInHospital")}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}> View All</Text>
          </TouchableOpacity>
        </View>
      </View>





    </View>

  )
}

export default DoctorAppointmentInHospital

const styles = StyleSheet.create({})