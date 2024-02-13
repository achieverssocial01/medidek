import { StyleSheet, Text, View,FlatList,TouchableOpacity, ScrollView } from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import moment from 'moment';

import DropDown from './DropDown';


const TokenAppointments = () => {
    
  return (
   <>
   <View>
    <ScrollView>
   <DropDown/>
   </ScrollView>
   </View>
  </>
  )
}

export default TokenAppointments




