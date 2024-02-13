import { StyleSheet, Text, View} from 'react-native'
import React, { useContext, useState } from 'react'
import UserContext from './Context/userContext'
import OnlineAppointmentsByHospital from './OnlineAppointmentsByHospital'
import TokenAppointmentsByHospital from './TokenAppointmentsByHospital'

const DoctorAppointmentSettingByHospital = () => {
  const {doctorDetail} = useContext(UserContext)
  return (
    <View>
      {
         doctorDetail?.acceptAppointments === "bySlot" ? 
         
          <OnlineAppointmentsByHospital/>
         : 
         <TokenAppointmentsByHospital/>
      }
    </View>
  )
}

export default DoctorAppointmentSettingByHospital
