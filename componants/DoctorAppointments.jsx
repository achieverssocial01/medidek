import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { axiosClient } from './utils/axiosClient';
import UserContext from './Context/userContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';


const DoctorAppointments = () => {
  const [item, setitem] = useState({})
  const [show, setshow] = useState(false)
  const [counter, setcounter] = useState(0)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [appointmentstatus, setappointmentstatus] = useState("");
  const [isfocus, setisfocusg] = useState(false);
  const statusdata = ["missed", "pending", "completed"]
  const { userLogIn, setUserLogin } = useContext(UserContext);
  const [currentdate, setcurrenctDate] = useState(moment().format("YYYY-MM-DD"))
  const [appointments, setappointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-GB'));
  const navigation =useNavigation();
  const[loading,setloading]=useState(false)

  const [SelectedStatus, setSelectedStatus] = useState("Pending Appointments")
  const status = [
    "Pending Appointments",
    "Completed Appointments",
    "Missed Appointments"
  ]



  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleConfirm = (date) => {
    const formatteddate = moment(date).format("YYYY-MM-DD")
    setcurrenctDate(formatteddate);
    hideDatePicker();
  };


  const getappointments = async () => {
    setloading(true)
    if (SelectedStatus == "Pending Appointments") {
      const result = await axiosClient.get(`/v2/getPendingAppoinmentForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      const resul = await axiosClient.get(`/v2/getPendingAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
        setloading(false)
      }
      else {
        Alert.alert("something went wrong")
        setloading(false)
      }
    }
    else if (SelectedStatus == "Completed Appointments") {
      const result = await axiosClient.get(`/v2/getCompletedAppoinmentForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      const resul = await axiosClient.get(`/v2/getCompletedAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
        setloading(false)
      }
      else {
        Alert.alert("something went wrong")
        setloading(false)

      }
    }
    else {
      const result = await axiosClient.get(`/v2/getMissedAppoinmentForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      const resul = await axiosClient.get(`/v2/getMissedAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
        setloading(false)

      }
      else {
        Alert.alert("something went wrong")
        setloading(false)
      }
    }
  }


  useFocusEffect(
    useCallback(() => {
      getappointments()
    }, [SelectedStatus, currentdate])
  );


  const updatestatus = async (item,text) => {
    const result = await axiosClient.put(`/v2/updateUserAppointmentStatus/${text?._id}`, {
      status: item
    })
    const resul = await axiosClient.put(`/v2/updateAppointmentByTokenUserAppointmentStatus/${text?._id}`, {
      status: item
    })
    console.log(result)
    if(result?.data?.status == "ok"){
      getappointments()
      navigation.navigate("Appointments")
    }
  }





  const Timing = (item) => {
    return (
      <View >
        <Text>{item.name}</Text>
        <Text>{item.ContactNo}</Text>
        <Text>{item.Date}</Text>
      </View>
    )
  }


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
          <View>
            <TouchableOpacity onPress={showDatePicker}>
              <View style={{ width: "100%", borderRadius: 3, paddingHorizontal: 12, color: 'black', paddingVertical: 14 }} >
                <Text style={{ color: "white", fontWeight: "900", backgroundColor: '#1F51C6', width: 'content', padding: 10, borderRadius: 20 }}>{currentdate}</Text>
              </View>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}

            />
          </View>
        </View>




        {
          loading ? 
          <ActivityIndicator size={"large"} style={{height:90}}/> : 
          appointments.length > 0 ? 
          appointments.map((item, index) => (
            <TouchableOpacity key={item._id} style={{ backgroundColor: "#DCE3F6", marginTop: 10 }} onPress={() => setdropdown(index)}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{margin:12,fontWeight:800,fontSize:20, color:'#383838'}}>{item.name}</Text>
                <Icon name="caret-down" size={45} color='#383838' style={{margin:10}} />
              </View>
              {
                index + 1 == counter && show && (
                  <View style={{ backgroundColor: "white", marginTop: 10 }} >
                    <View style={{flexDirection:"row",justifyContent:"space-between", marginHorizontal: 20, padding:10, borderBottomWidth:1, borderBottomColor:'#D9D9D9'}}>
                <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}> Name:{item.name}</Text>
                    <Text style={{fontSize:15, fontWeight:'600', color: "#383838" }}>Gender:{item.gender}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between", marginHorizontal: 20, padding:10, borderBottomWidth:1, borderBottomColor:'#D9D9D9'}}>
                    <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}>Contact No:{item.phone}</Text>
                    <Text style={{fontSize:15, fontWeight:'600',color:'#383838'}}>Age:{item.age}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between", marginHorizontal: 20, padding:10, borderBottomWidth:1, borderBottomColor:'#D9D9D9'}}>
                    <Text style={{fontSize:15, fontWeight:'600', color: "#383838" , flex:3 }}>Date:{moment(item.appointmentDate).format("YYYY-MM-DD")}</Text>
                    <Text style={{fontSize:15, fontWeight:'600', color: "#383838" ,textAlign:'center', marginRight: -25,  flex:1}}>Status:</Text>
                    <Dropdown
                      style={styles.dropdown2}
                      placeholderStyle={styles.placeholderStyle2}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemContainerStyle={{ backgroundColor:'#DCE3F6'}}
                      data={statusdata}
                      value={item.status}
                      disable={item.status == "completed" ? true :false}
                      placeholder={item.status}
                      renderItem={item => <StatusDropdown2 item={item} />}
                      onChange={text => updatestatus(text,item)}
                    />
                    </View>
                    {
                      item?.status == "completed" && (
                                <TouchableOpacity style={{ backgroundColor: "#1F51C6", borderRadius:30, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                <Icon name="upload" size={25} color='white' style={{margin:10}} />
                      <Text style={{ color: "white", textAlign: 'center', fontSize: 15,fontWeight: '600' }}>Upload Prescription</Text>
                    </TouchableOpacity>
                      )
                    }
            
                  </View>
                )
              }
            </TouchableOpacity>
          ))



          
          : 
          <View>
            <Text style={{textAlign:"center",fontSize:15,fontWeight:"600",color:'#383838'}}>No Appointments Found For This Date
            </Text>
            <Text style={{color:"#1F51C6",fontWeight:"bold",fontSize:20,textAlign:"center"}}>{currentdate}</Text>

            </View>
          
          
         
        }







      </View>
    </ScrollView>
  )
}

export default DoctorAppointments

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