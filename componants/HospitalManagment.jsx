import { StyleSheet, Text, View,ScrollView,TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from './Context/userContext'
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconz from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown'
import { axiosClient } from './utils/axiosClient';


const HospitalManagment = () => {
  const [doctors,setdoctors] =useState([1,2])
  const {userLogIn} =useContext(UserContext)
  const [show, setshow] = useState(false)
  const [counter, setcounter] = useState(0)
  const [isfocus, setisfocusg] = useState(false);
  const [SelectedStatus, setSelectedStatus] = useState("Doctors")
  const status = [
    "Doctors",
     "Staff"
  ]
  const getalldoctorsInHospital= async ()  =>
  {
    const res = await axiosClient.get(`/v2/getAlldoctor/${userLogIn?.user?._id}`)
    console.log(res.data.status);
    if(res.data.status == "ok"){
      setdoctors(res.data.result)
    }
    else if(res.data.status == "error"){
      Alert.alert("Error in Fetching Doctor Details")
    }
  }


  useEffect(()=>{
    getalldoctorsInHospital();
  },[])




  const StatusDropdown = (item) => {
    return (
      <Text style={styles.label}>{item.item}</Text>
    )
  }
  const StatusDropdown2 = (item) => {
    return (
     <Text style={styles.label2}>{item.item}</Text>
    )
  }

  const setdropdown = (i) => {
    setshow(!show)
    setcounter(i + 1)
  }



  return (
    <ScrollView>
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ gap: 10, flexDirection: "column", paddingTop: 20 }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Dropdown
          data={status}
          renderItem={item => <StatusDropdown item={item} />}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          searchPlaceholder="Search..."
          iconColor='white'
          iconStyle={{ width: 40, height: 30 }}
          onChange={item => setSelectedStatus(item)}
          placeholder={SelectedStatus ? SelectedStatus : "select"}
          value={SelectedStatus}
          maxHeight={300}
          onFocus={() => setisfocusg(true)}
          onBlur={() => setisfocusg(true)}
        />
      </View>




      {
        
        doctors.length > 0 ? 
        
        doctors.map((item, index) => (
          <TouchableOpacity key={item._id} style={{ backgroundColor: "#DCE3F6", marginTop: 10 }} onPress={() => setdropdown(index)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{margin:12,fontWeight:800,fontSize:20, color:'#383838'}}>{item?.nameOfTheDoctor}</Text>
              <Icon name="caret-down" size={45} color='#383838' style={{margin:10}} />
            </View>
            {
              index + 1 == counter && show && (
                <View style={{ backgroundColor: "white", marginTop: 10 }} >
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginHorizontal: 20, padding:10, borderBottomWidth:1, borderBottomColor:'#D9D9D9'}}>
              <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}> Name:{item?.nameOfTheDoctor}</Text>
                  <Text style={{fontSize:15, fontWeight:'600', color: "#383838" }}>{item?.speciality}</Text>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"space-between", marginHorizontal: 20, padding:10, borderBottomWidth:1, borderBottomColor:'#D9D9D9'}}>
                  <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}>Contact No:{item?.phone}</Text>
                  <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}>uid:{item?.doctorid}</Text>
                  </View>
                  <View style={{flexDirection:"row", padding:16, borderBottomColor:'#D9D9D9', justifyContent:'center', gap:8}}>
                    <TouchableOpacity style={{flexDirection:"row", backgroundColor:'#1F51C6', paddingHorizontal:50, borderRadius:30, height:40,width:178, justifyContent:'center', alignItems:'center'}}>
                 <Iconz name="edit" size={15} color='#FFFFFF' style={{margin:10}} />
                  <Text style={{fontSize:15, fontWeight:'600', color: "#FFFFFF", marginLeft:-5}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:"row", backgroundColor:'#B92612', paddingHorizontal:50,borderRadius:30, height:40,width:178, justifyContent:'center', alignItems:'center'}}>
              <Icons name="delete" size={15} color='#FFFFFF' style={{margin:10}} />
                  <Text style={{fontSize:15, fontWeight:'600', color: "#FFFFFF" ,textAlign:'center', marginLeft:-5}}>Remove</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              )
            }
          </TouchableOpacity>
        ))
        : 
        <View>
          <Text style={{textAlign:"center",fontSize:15,fontWeight:"600",color:'#3838383'}}>No Appointments Found For This Date
          </Text>
          <Text style={{color:"#1F51C6",fontWeight:"bold",fontSize:20,textAlign:"center"}}>19-01-2024</Text>

          </View>
        
        
       
      }







    </View>
  </ScrollView>
  )
}

export default HospitalManagment

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: 'white',
    borderBlockColor: "black",
    borderRadius: 30,
    padding: 1,
    paddingVertical: 10,
    margin: 14,
    width: "50%",
    backgroundColor: "#1F51C6",
    color: "white"
    // marginLeft:"auto"
  },
  dropdown2: {
    width: "35%",
    marginTop:-7,
    flex:2
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: "700",
    textAlign: "center",
    marginLeft: 6,
    marginTop: -4
  },
  placeholderStyle2: {
    fontSize: 15,
    color: 'green',
    fontWeight: "700",
    textAlign: "center",
    marginLeft: 20,
    marginTop: -4
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    textAlign: 'center',
  },
 
  label: {
    zIndex: 999,
    fontWeight: "600",
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius:4,
    lineHeight: 35,
    width: "100%",
    color: '#1F51C6',
    backgroundColor: "#DCE3F6"

  },
  label2: {
    fontWeight: "600",
    fontSize: 15,
    borderRadius:5,
    lineHeight: 22,
    width: "100%",
    textAlign:"center",
 
  },

});