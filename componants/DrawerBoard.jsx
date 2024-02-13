import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import DoctorProfile from './DoctorProfile';
import DoctorAppointments from './DoctorAppointments';
import DoctorEditProfile from './DoctorEditProfile';
import AppointmnetSetting from './AppointmnetSetting';
import DoctorLogout from './DoctorLogout';
import DoctorDashboard from './DoctorDashboard';
import EditAppointment from './EditAppointment';
import UserContext from './Context/userContext';

const Drawer = createDrawerNavigator();
const DrawerBoard = () => {
  const {userLogIn} =useContext(UserContext)
  return (
    <Drawer.Navigator initialRouteName='Dashboard'
    drawerContent={(props)=>{
      return (
        <View style={{flex:1,backgroundColor:"#1F51C6"}}>
          <View
           style={{
            width:"90%",
            height:150,
            backgroundColor:"#1F51C6",
            justifyContent:"flex-start",
            alignItems:"center",
            borderBottomWidth:1,
            borderBottomColor:"#1F51C6",
            padding:10,
            marginTop:10
           }}
          >
           <Image source={{ uri: userLogIn?.user?.imgurl }} style={{ width: "45%", height: "60%", borderRadius:60,objectFit:'contain' }} />
            <Text style={{fontSize:20,color:"#FFFFFF",fontWeight:"700"}}>{userLogIn?.user?.nameOfTheDoctor}</Text>
          </View>
          <DrawerItemList {...props}/>

        </View>
      )
    }}
    screenOptions={{
      drawerStyle:{
        backgroundColor:"#FFFFF",
        width:200,
      },
      headerTintColor:"#FFFFFF",
      headerStyle:{
        backgroundColor:'#1F51C6',
        // shadowColor:"blue",
        elevation:20
      },
      drawerLabelStyle:{
        fontSize:20
      },
      drawerActiveBackgroundColor:'#FFFFFF',
      drawerActiveTintColor:'#1F51C6',
      drawerInactiveTintColor:"#FFFFFF"
    }}

    >
    <Drawer.Screen name="Dashboard" component={DoctorDashboard} 
    />
    <Drawer.Screen name="Profile" component={DoctorProfile} />
    <Drawer.Screen name="Appointments" component={DoctorAppointments} />
    <Drawer.Screen name="EditProfile" component={DoctorEditProfile} />
    <Drawer.Screen name="ScheduleAppointment" component={AppointmnetSetting} />
    {/* <Drawer.Screen name ="Logout" component={DoctorLogout}/> */}
    <Drawer.Screen name ="EditAppointment" component={EditAppointment}
    options={
      {
        drawerLabel: ()=> null,
        drawerActiveBackgroundColor:'#1F51C6',
      }
      }

      
    />
  </Drawer.Navigator>
  )
}

export default DrawerBoard

const styles = StyleSheet.create({})