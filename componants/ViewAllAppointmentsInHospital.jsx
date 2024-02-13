import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Alert ,ScrollView} from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { axiosClient } from './utils/axiosClient';
import UserContext from './Context/userContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';


const ViewAllAppointmentsInHospital = () => {
  const [item, setitem] = useState({})
  const [show, setshow] = useState(false)
  const [counter, setcounter] = useState(0)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [appointmentstatus, setappointmentstatus] = useState("");
  const [isfocus, setisfocusg] = useState(false);
  const statusdata = ["Pending", "Completed", "Missed"]
  const { userLogIn, setUserLogin } = useContext(UserContext);
  const [currentdate, setcurrenctDate] = useState(moment().format("YYYY-MM-DD"))
  const [appointments, setappointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-GB'));
const navigation = useNavigation()

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
    if (SelectedStatus == "Pending Appointments") {
      const result = await axiosClient.get(`/v2/getAllAppointmentsForPerticularHospital/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
      }
      else {
        Alert.alert("something went wrong")
      }
    }
    else if (SelectedStatus == "Completed Appointments") {
      const result = await axiosClient.get(`/v2/getCompleteAppointmentsForHospital/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
    
      }
      else {
        Alert.alert("something went wrong")
      }
    }
    else {
      const result = await axiosClient.get(`/v2/getMissedAppointmentsForHospital/${userLogIn?.user?._id}/${currentdate}`)
      if (result.data.status == "ok") {
        setappointments(result.data.result)
      }
      else {
        Alert.alert("something went wrong")
      }
    }
  }


  useFocusEffect(
    useCallback(() => {
      getappointments()
    }, [SelectedStatus, currentdate])
  );


  const updatestatus = async () => {
    const result = await axiosClient.put(`/v2/updateUserAppointmentStatus/${userLogIn?.user?._id}`, {
      status: appointmentstatus
    })
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
                      placeholder={item.status ? item.status : "select find"}
                      renderItem={item => <StatusDropdown2 item={item} />}
                      onChange={item => setappointmentstatus(item)}
                    />
                    </View>

                    <TouchableOpacity style={{ backgroundColor: "#1F51C6", borderRadius:30, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                <Icon name="upload" size={25} color='white' style={{margin:10}} />
                      <Text style={{ color: "white", textAlign: 'center', fontSize: 15,fontWeight: '600' }}>Upload Prescription</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            </TouchableOpacity>
          ))



          
          : 
          <View>
            <Text style={{textAlign:"center",fontSize:15,fontWeight:"600",color:'#3838383'}}>No Appointments Found For This Date
            </Text>
            <Text style={{color:"#1F51C6",fontWeight:"bold",fontSize:20,textAlign:"center"}}>{currentdate}</Text>

            </View>
          
          
         
        }







      </View>
    </ScrollView>
  )
}

export default ViewAllAppointmentsInHospital

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

