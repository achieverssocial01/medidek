import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import HospitalProfile from './HospitalProfile';
import HospitalManagment from './HospitalManagment';
import UserContext from './Context/userContext';
import AllDoctorsOfHospital from './AllDoctorsOfHospital';
import AppointmentsPageForHospital from './AppointmentsPageForHospital';
import ViewHospitalProfile from './ViewHospitalProfile';
import HospitalEditProfile from './HospitalEditProfile';
const Drawer = createDrawerNavigator();
const MasterDrawer = () => {
    const {userLogIn} =useContext(UserContext)
  return (
    <Drawer.Navigator initialRouteName='Home'
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
            <Text style={{fontSize:20,color:"#FFFFFF"}}>{userLogIn?.user?.nameOfhospitalOrClinic}</Text>
          </View>
          <DrawerItemList {...props}/>
        </View>
      )
    }}
    screenOptions={{
      drawerStyle:{
        backgroundColor:"#FFFFF",
        width:220,
      },
      headerTintColor:"#FFFFFF",
      headerStyle:{
        backgroundColor:'#1F51C6',
        // shadowColor:"blue",
        elevation:20
      },
      drawerLabelStyle:{
        fontSize:20,
      },
      drawerActiveBackgroundColor:'#FFFFFF',
      drawerActiveTintColor:'#1F51C6',
      drawerInactiveTintColor:"#FFFFFF"
    }}

    >
   
    <Drawer.Screen name="Home" component={HospitalProfile}
    // options={{
    //   headerTransparent:true,
    //   headerTitle: '',
    //   headerTintColor:'#383838'
    // }}
     
    />
    <Drawer.Screen name="Managmeent" component={HospitalManagment} />
    <Drawer.Screen name="Profile" component={ViewHospitalProfile} />
    <Drawer.Screen name="EditProfile" component={HospitalEditProfile} />
    <Drawer.Screen name ="Doctors" component={AllDoctorsOfHospital}/>
    <Drawer.Screen name="Appointments" component={AppointmentsPageForHospital} />

  </Drawer.Navigator>
  )
}

export default MasterDrawer

const styles = StyleSheet.create({})