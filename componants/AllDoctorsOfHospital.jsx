import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import UserContext from './Context/userContext'
import { axiosClient } from './utils/axiosClient'

const AllDoctorsOfHospital = () => {
  const navigation = useNavigation()
  const [doctors, setdoctors] = useState([1, 2, 3])
  const { userLogIn,setdoctorDetail,doctorDetail } = useContext(UserContext)

  const getalldoctors = async () => {
    const res = await axiosClient.get(`/v2/getAlldoctor/${userLogIn?.user?._id}`)
    setdoctors(res.data.result)
  }


  const gotoDoctorAppointments =(doctor)=>{
    setdoctorDetail(doctor)
    navigation.navigate('DoctorAppointmentsInHospital')
  }





  useFocusEffect(
    useCallback(() => {
      getalldoctors()
    }, [userLogIn?.user?._id])
    );
    const windowheight = Dimensions.get('window').height;
  return (
    <View style={{backgroundColor:'#FFFFFF', margin: 5,height:windowheight}}>
       {
        doctors?.length > 0 && doctors.map((doctor)=>(
          <View key={doctor?._id} style={{borderWidth:2, borderColor:'#D9D9D9', justifyContent:'center', margin:15, paddingHorizontal:5,paddingVertical: 20}}>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between', }}>
            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: doctor?.imgurl
                      ? doctor?.imgurl
                      : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                  }}
                  width={80}
                  height={80}
                ></Image>
              </TouchableOpacity>
            </View>
            
            <View style={{flex:2}}>
              <Text style={{fontSize:17, fontWeight:'700', color:'#383838'}}>Dr. {doctor?.nameOfTheDoctor }</Text>
              <Text style={{fontSize:15, fontWeight:'500', color:'#383838'}}>{doctor?.speciality}</Text>
              <Text style={{fontSize:15, fontWeight:'500', color:'#383838'}}>Rating: {doctor?.reviews?.length}</Text>
            </View>
          </View>
  
          <TouchableOpacity 
          style={{ backgroundColor: "#1F51C6", borderRadius: 25, width: '80%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, marginLeft: '8%', marginVertical: 10 }}
         onPress={()=>gotoDoctorAppointments(doctor)}
         >
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}>View Appointment</Text>
          </TouchableOpacity>
        </View>
        ))
       }
    </View>
  )
}

export default AllDoctorsOfHospital

const styles = StyleSheet.create({})