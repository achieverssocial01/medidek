import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions ,
TextInput,BackHandler,Alert

} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { axiosClient } from './utils/axiosClient'
import UserContext from './Context/userContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/FontAwesome"
import Icons from "react-native-vector-icons/Ionicons"
import Iconz from "react-native-vector-icons/Entypo"
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowwidth = Dimensions.get('window').width
const windowheight = Dimensions.get('window').height

const HospitalProfile = () => {
  const { userLogIn,setdoctorDetail } = useContext(UserContext)
  const navigation = useNavigation()
  const [doctors, setdoctors] = useState([]);
  const [showmodal,setshowmodal]=useState(false)
  const [doctorid,setdoctorid]=useState('')
  const [error,seterror]=useState('')


  const checkdata = async () => {
    const token = await AsyncStorage.getItem("hospitaltoken");
    if (!token) {
      return navigation.navigate("Signup")
    }
  }
 
  
  const backAction =()=>{
    Alert.alert("Hold on!","Are you sure you want to exit this app ?",[
      {
        text:"Cancel",
        onPress:()=>null,
        style:"cancel"
      },
      {
        text:"yes",
        onPress:()=>BackHandler.exitApp()
      }
    ])
    return true;
  }

 useFocusEffect(
    useCallback(() => {
      checkdata()
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)
      return () => backHandler.remove()
    }, [])
  );

  const getalldoctors = async () => {
    const res = await axiosClient.get(`/v2/getAlldoctor/${userLogIn?.user?._id}`)
    setdoctors(res?.data?.result)
  }
  const submitDoctorid =async()=>{
    if(!doctorid){
      seterror("pls enter field")
      return ;
    }
    const res = await axiosClient.post(`/v2/getdoctorinfo`,{
      doctorid:doctorid,
      hospitalId:userLogIn?.user?._id
    })
    if(res.data.status=='error'){
         seterror(res.data.message)
    }
    else{
      setdoctorDetail(res?.data?.result)
      setshowmodal(false)
      navigation.navigate("AddDoctorByHospital")
    }
  }

 useEffect(()=>{
    getalldoctors()
 },[userLogIn?.user?._id]) 
  return (
   <ScrollView>
        <View style={{ marginHorizontal: 5, width: windowwidth, height: windowheight, backgroundColor: "#FFFFFF" }}>
        <View style={{ width: windowwidth }}>
          <Text style={{ margin: 8, fontSize: 18, fontWeight: '700', color: '#383838' }}>Our Doctors</Text>
          <ScrollView horizontal >
            <View style={{ flexDirection: 'row', gap: 8, }}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', }}>
                <View style={{ borderWidth: 1, borderColor: '#D9D9D9', width: 150, height: 150, alignItems: "center", justifyContent: "center" }}>
                  <TouchableOpacity onPress={()=>navigation.navigate("getdoctorid")}>
                    <Icon name="plus" size={45} color='#1F51C6' />
                  </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#383838', padding: 5 }}>Add Doctors</Text>
              </View>
              {
                doctors?.length > 0 && doctors.map((doctor) => (
  
                  <View key={doctor?._id} style={{ borderWidth: 1, borderColor: '#D9D9D9' }}>
                    <TouchableOpacity>
                      <View style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', width: 150, height: 150 }}>
                        <Image
                          source={{
                            uri: doctor.imgurl
                              ? doctor.imgurl
                              : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                          }}
                          width={110}
                          height={110}
                          style={{ borderRadius: 100, objectFit: 'contain', borderColor: '#DCE3F6', borderWidth: 2 }}
  
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 5 }}>Dr: {doctor?.nameOfTheDoctor}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 1 }}>Speciality:{"\n"} {doctor?.speciality}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 1 }}>Experience: {doctor?.yearOfExprience} Years</Text>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{ backgroundColor: "#1F51C6", borderRadius: 25, width: '80%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, marginLeft: '8%', marginVertical: 15 }}
            onPress={() => navigation.navigate('Doctors')}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}>View All Doctors</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ margin: 8, fontSize: 18, fontWeight: '700', color: '#383838' }}>Our Staff</Text>
          <ScrollView horizontal >
            <View style={{ flexDirection: 'row', gap: 7 }}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', }}>
                <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: 150, height: 150, alignItems: "center", justifyContent: "center" }}>
                  <Icon name="plus" size={45} color='#1F51C6' />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#383838', padding: 5 }}>Add Staff</Text>
              </View>
              {
                doctors?.length > 0 && doctors.map((doctor) => (
                  <View key={doctor?._id} style={{ borderWidth: 1, borderColor: '#D9D9D9' }}>
                    <TouchableOpacity>
                      <View style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', width: 150, height: 150, }}>
                        <Image
                          source={{
                            uri: doctor.imgurl
                              ? doctor.imgurl
                              : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                          }}
                          width={110}
                          height={110}
                          style={{ borderRadius: 100, objectFit: 'contain', borderColor: '#DCE3F6', borderWidth: 2 }}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 5 }}>Dr: Sudha Sahu</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 1, flexWrap: 'wrap', }}>Speciality: {"\n"} Mental Specialist</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', padding: 1 }}>Experience: 12 Years</Text>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          <TouchableOpacity style={{ backgroundColor: "#1F51C6", borderRadius: 25, width: '80%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, marginLeft: '8%', marginVertical: 12 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "600" }}>View All Staff</Text>
          </TouchableOpacity>
          <View>
          </View>
        </View>
      </View>
      
    
   
   </ScrollView>
  )
}

export default HospitalProfile

const styles = StyleSheet.create({})