import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Alert,BackHandler } from 'react-native'
import React, { Children, useCallback, useContext, useEffect, useState } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import { VictoryPie, VictoryContainer, VictoryTooltip } from "victory-native"
import { Svg } from "react-native-svg"
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons';
import * as  Progress from 'react-native-progress';
import moment from 'moment';
import { axiosClient } from './utils/axiosClient';
import UserContext from './Context/userContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



const DoctorDashboard = () => {
  const [value, setvalue] = useState(20);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const { userLogIn } = useContext(UserContext)
  const [pendingappointment, setpendingappointment] = useState([])
  const [completedappointment, setcompletedappointment] = useState([])
  const [missedappointment, setmissedappointment] = useState([])
  const [piechart, setpiechart] = useState({ cancelled: 100, completed: 100, pending: 100 })
  const [showappointments, setshowappointments] = useState("pending")




  const [totalPatient, settotalpatient] = useState(0)
  const [todaysAppointment, settodaysAppointment] = useState({
    completed: 0,
    total: 0
  })





  const [futureAppointment, setfutureappointment] = useState(0)



  const checkdata = async () => {
    const token = await AsyncStorage.getItem("doctortoken");
    if (!token) {
      return navigation.navigate("Signup")
    }
  }
  useFocusEffect(
    useCallback(() => {
      checkdata()
    }, [])
  );

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
      const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)
      return () => backHandler.remove()
    }, [])
  );


  const apicall = async () => {
    try {
      const res = await axiosClient(`/v2/getPendingAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res2 = await axiosClient(`/v2/getPiChartDataForAppointmentByToken/${userLogIn?.user?._id}/${selectedDate}/piChart`)
      const res3 = await axiosClient(`/v2/getCompletedAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res4 = await axiosClient(`/v2/getMissedAppoinmentByTokenForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res5 = await axiosClient(`/v2/todaysAppointementByToken/${userLogIn?.user?._id}/${selectedDate}/todaysAppointment`)
      const res6 = await axiosClient(`/v2/totalPatient/${userLogIn?.user?._id}/${selectedDate}/totalPatient`)
      const res7 = await axiosClient(`/v2/futureAppointmentForAppointmentByToken/${userLogIn?.user?._id}/futureAppointment`)
      const res8 = await axiosClient(`/v2/multipleloginprofile/${userLogIn?.user?.doctorid}`)
      setpendingappointment(res?.data?.result)
      setcompletedappointment(res3?.data?.result)
      settotalpatient(res6?.data?.result)
      setmissedappointment(res4?.data?.result)
      settodaysAppointment({
        ...todaysAppointment,
        completed: res5?.data?.result?.completeAppointments,
        total: res5?.data?.result?.totalAppointments
      })
      setpiechart({
        ...piechart,
        cancelled: res2?.data?.result?.cancelled,
        completed: res2?.data?.result?.completed,
        pending: res2?.data?.result?.pending,
      })
      setfutureappointment(res7?.data?.result)

    } catch (error) {
      Alert.alert("Something Went Wrong")
    }
  }

  const Slotapicall = async () => {
    try {
      const res = await axiosClient(`/v2/getPendingAppoinmentForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res2 = await axiosClient(`/v2/getPiChartData/${userLogIn?.user?._id}/${selectedDate}/piChart`)
      const res3 = await axiosClient(`/v2/getCompletedAppoinmentForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res4 = await axiosClient(`/v2/getMissedAppoinmentForDoctor/${userLogIn?.user?._id}/${selectedDate}`)
      const res5 = await axiosClient(`/v2/todaysAppointement/${userLogIn?.user?._id}/${selectedDate}/todaysAppointment`)
      const res6 = await axiosClient(`/v2/totalPatient/${userLogIn?.user?._id}/${selectedDate}/totalPatient`)
      const res7 = await axiosClient(`/v2/futureAppointment/${userLogIn?.user?._id}/futureAppointment`)
      const res8 = await axiosClient(`/v2/multipleloginprofile/${userLogIn?.user?.doctorid}`)
      setpendingappointment(res?.data?.result)
      setcompletedappointment(res3?.data?.result)
      setmissedappointment(res4?.data?.result)
      settodaysAppointment({
        ...todaysAppointment,
        completed: res5?.data?.result?.completeAppointments,
        total: res5?.data?.result?.totalAppointments
      })
      setpiechart({
        ...piechart,
        cancelled: res2?.data?.result?.cancelled,
        completed: res2?.data?.result?.completed,
        pending: res2?.data?.result?.pending,
      })
      settotalpatient(res6?.data?.result)
      setfutureappointment(res7?.data?.result)

    } catch (error) {
      Alert.alert("Something Went Wrong");
    }



  }




  useEffect(() => {
    {
      userLogIn?.user?.acceptAppointments ?
        Slotapicall() :
        apicall()
    }

  }, [userLogIn?.user?._id, selectedDate])


  const updateappointmentstatus = async (status) => {
    const res = await axiosClient.put(`/v2/updateUserAppointmentStatus/${userLogIn?.user?._id}`, {
      remark: "by doctor",
      status: status
    })
    console.log(res);
  }



  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"))
    hideDatePicker();
  };


  return (
    <ScrollView>
      <View style={{ paddingHorizontal:5 }}>
        <View style={{ gap: 10, flexDirection: "column", paddingTop: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft:10, color:'#383838' }}>Dashboard</Text>
            <View>
              <TouchableOpacity onPress={showDatePicker}>
                <View style={{ width: "100%", borderRadius: 3, paddingHorizontal: 12, color: 'black', paddingVertical: 14 }} >
                  <Text style={{ color: "white", fontWeight: "900", backgroundColor: '#1F51C6', width: 'content', padding: 10, borderRadius: 20 }}>{selectedDate}</Text>
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
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1, gap: 5 }}>
              <Icon name="bed-pulse" size={40} color="#1F51C6" />
              <Text style={{ fontSize: 15, fontWeight: 'bold',color:'#383838' }}>Total {"\n"} Patient</Text>
            </View>


            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold',color:'#383838' }}>{totalPatient}</Text>
              <Progress.Bar progress={1} width={200} height={10} color='#1F51C6' unfilledColor='#FFFFFF' borderRadius={30} />
            </View>

          </View>


          <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1, gap: 5 }}>
              <Icons name="today" size={50} color="#1F51C6" />

              <Text style={{ fontSize: 15, fontWeight: 'bold' ,color:'#383838'}}>Today's {"\n"} Appointments</Text>
            </View>


            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold',color:'#383838' }}>{todaysAppointment.completed}/{todaysAppointment.total}</Text>
              <Progress.Bar progress={0.3} width={200} height={10} color='#1F51C6' unfilledColor='#FFFFFF' borderRadius={30} />
            </View>

          </View>


          <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1, gap: 5 }}>
              <Icons name="watch-later" size={50} color="#1F51C6" />

              <Text style={{ fontSize: 15, fontWeight: 'bold',color:'#383838' }}> Future {"\n"} Appointments</Text>
            </View>


            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold',color:'#383838' }}>{futureAppointment}</Text>
              <Progress.Bar progress={0.3} width={200} height={10} color='#1F51C6' unfilledColor='#FFFFFF' borderRadius={30} />
            </View>

          </View>
        </View>



        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <TouchableOpacity onPress={() => setshowappointments("pending")} style={{ backgroundColor: "#1F51C6", flex: 1, padding: 15, borderRadius: 10 }}>
            <Text style={{ color: "#FFFFFF", fontWeight: '800', fontSize: 15 }}>Upcoming Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setshowappointments("completed")} style={{ backgroundColor: "#1F51C6", flex: 1, padding: 15, marginLeft: 2, borderRadius: 10 }}>
            <Text style={{ color: "#FFFFFF", fontWeight: '800', fontSize: 15 }}>Completed  Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setshowappointments("missed")} style={{ backgroundColor: "#1F51C6", flex: 1, padding: 15, marginLeft: 2, borderRadius: 10 }}>
            <Text style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 15 }}>Missed Appointments</Text>
          </TouchableOpacity>

        </View>

        <View>
          {
            <View>
              {
                showappointments == "pending"
                  ? (
                    pendingappointment.length > 0 ?
                      (
                        pendingappointment.map((item, i) => (
                          <View key={item._id} style={{ backgroundColor: '#DCE3F6' }}>
                            <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                              <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 }}>
                                <Text style={{ backgroundColor: "blue", width: 25, height: 25, color: "white", borderRadius: 20, textAlign: "center" }}>{i + 1}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '500',color:'#383838' }}>{item.name}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700',color:'#383838' }}>{moment(item.appointmentDate).format("YYYY-MM-DD")}</Text>
                              </View>
                              <TouchableOpacity onPress={() => updateappointmentstatus("cancelled")} style={{ height: 30, width: 30, backgroundColor: "red", borderRadius: 100, justifyContent: "center", alignItems: "center", margin: 12 }}>
                                <Image source={require("./Assets/cross.png")} style={{ width: "30%", height: "20%", padding: 5 }} resizeMode="contain"></Image>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => updateappointmentstatus("completed")} style={{ height: 30, width: 30, backgroundColor: "green", borderRadius: 100, justifyContent: "center", alignItems: "center", margin: 12 }}>
                                <Image source={require("./Assets/Right.png")} style={{ width: "30%", height: "20%", padding: 5 }} resizeMode="contain"></Image>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))
                      ) : (
                        <View style={{ backgroundColor: '#DCE3F6' }}>
                          <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                            <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 }}>
                              <Text style={{ color: "black", fontSize: 15, fontWeight: "600" ,color:'#383838'}}>No
                                <Text style={{ color: "#1F51C6", marginHorizontal: 5 }}> Upcoming </Text>
                                Appointmnets Found</Text>
                            </View>
                          </View>
                        </View>
                      )
                  ) : ("")
              }
            </View>
          }
          {
            <View>
              {
                showappointments == "completed" ?
                  (
                    completedappointment.length > 0 ?
                      (
                        completedappointment.map((item, i) => (
                          <View key={item._id} style={{ backgroundColor: '#DCE3F6' }}>
                            <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                              <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 }}>
                                <Text style={{ backgroundColor: "blue", width: 25, height: 25, color: "white", borderRadius: 20, textAlign: "center" }}>{i + 1}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '500',color:'#383838' }}>{item.name}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700',color:'#383838' }}>{moment(item.appointmentDate).format("YYYY-MM-DD")}</Text>
                              </View>
                              <TouchableOpacity disabled style={{ height: 30, width: 30, backgroundColor: "green", borderRadius: 100, justifyContent: "center", alignItems: "center", margin: 12 }}>
                                <Image source={require("./Assets/Right.png")} style={{ width: "30%", height: "20%", padding: 5 }} resizeMode="contain"></Image>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))
                      ) : (
                        <View style={{ backgroundColor: '#DCE3F6' }}>
                          <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                            <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 ,color:'#383838'}}>
                              <Text style={{ color: "black", fontSize: 15, fontWeight: "600",color:'#383838' }}>No
                                <Text style={{ color: "#A1E18A" }}> Completed </Text>
                                Appointments Found</Text>
                            </View>
                          </View>
                        </View>
                      )
                  ) : ("")
              }
            </View>
          }
          {
            <View>
              {
                showappointments == "missed" ?
                  (

                    missedappointment.length > 0 ? (
                      missedappointment.map((item) => (
                        <View key={item?._id} style={{ backgroundColor: '#DCE3F6' }}>
                          <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                            <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 }}>
                              <Text style={{ backgroundColor: "blue", width: 25, height: 25, color: "white", borderRadius: 20, textAlign: "center" }}>1</Text>
                              <Text style={{ fontSize: 15, fontWeight: '500',color:'#383838' }}>{item.name}</Text>
                              <Text style={{ fontSize: 15, fontWeight: '700',color:'#383838' }}>{moment(item.appointmentDate).format("YYYY-MM-DD")}</Text>
                            </View>
                            <TouchableOpacity onPress={() => updateappointmentstatus("pending")} style={{ height: 30, width: 30, backgroundColor: "red", borderRadius: 100, justifyContent: "center", alignItems: "center", margin: 12 }}>
                              {/* <Image source={require("./Assets/cross.png")} style={{ width: "30%", height: "20%", padding: 5 }} resizeMode="contain"></Image> */}
                              <Icon name="timetable" size={50} color="#1F51C6" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateappointmentstatus("completed")} style={{ height: 30, width: 30, backgroundColor: "green", borderRadius: 100, justifyContent: "center", alignItems: "center", margin: 12 }}>
                              <Image source={require("./Assets/Right.png")} style={{ width: "30%", height: "20%", padding: 5 }} resizeMode="contain"></Image>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))
                    ) : (
                      <View style={{ backgroundColor: '#DCE3F6' }}>
                        <View style={{ backgroundColor: "white", shadowColor: "black", elevation: 20, flexDirection: "row", margin: 15, borderRadius: 10 }}>
                          <View style={{ flex: 3, flexDirection: "row", padding: 15, gap: 5 }}>
                            <Text style={{ color: "black", fontSize: 15, fontWeight: "600" ,color:'#383838'}}>No
                              <Text style={{ color: "#F45843", marginHorizontal: 5}}> Missed </Text>
                              Appointments Found</Text>
                          </View>
                        </View>
                      </View>
                    )
                  ) : (
                    ""
                  )
              }
            </View>
          }

        </View>


        <View >
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 10,color:'#383838' }}>Appointment Status</Text>
          <View style={{ backgroundColor: '#DCE3F6', justifyContent: 'center' }}>
            <Text style={{color:'red',fontWeight:"800"}}>if all value 30 this means you have 0 appointments</Text>
            <Svg>

              <VictoryPie
                data={[
                  { x: piechart.cancelled > 0 ?piechart.cancelled :30 , y: piechart.cancelled > 0 ?piechart.cancelled :30},
                  { x: piechart.completed >0 ? piechart.completed :30 , y: piechart.completed >0  ? piechart.completed :30  },
                  { x: piechart.pending  > 0 ? piechart.pending:30, y:  piechart.pending  > 0 ? piechart.pending:30}
                ]}
                // labelComponent={<VictoryTooltip active />}
                radius={130}
                colorScale={["#1F51C6", "#A1E18A", "#F45843"]}
                labelRadius={({ innerRadius }) => innerRadius + 40}

                style={{ labels: { fill: "white", fontSize: 17, fontWeight: 'bold' } }}
              />

            </Svg>
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default DoctorDashboard

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#DCE3F6",
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'space-between'
  },
});