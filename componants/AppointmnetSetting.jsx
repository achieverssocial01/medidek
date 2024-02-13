import { StyleSheet, Text, View,TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import OnlineAppointments from './OnlineAppointments'
import TokenAppointments from './TokenAppointments'
import UserContext from './Context/userContext'

const ww = Dimensions.get("window").width;
const AppointmnetSetting = () => {
  const {userLogIn} =useContext(UserContext)
  return (
    <View style={{width:ww}}>
      {
         userLogIn?.user?.acceptAppointments === "bySlot" ? 
         
          <OnlineAppointments/> 
         : 
         <TokenAppointments/>
      } 
    </View>
  )
}

export default AppointmnetSetting

const styles = StyleSheet.create({})