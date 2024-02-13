import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dashbord from './Dashbord';
import CompletedAppointment from './CompletedAppointment';
import CancelAppointment from './CancelAppointment';
import { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

function DashboardTopTabNavigation() {


  const navigation =useNavigation();

 

  const checkdata =async()=>{
    const token = await AsyncStorage.getItem("patienttoken");
    if(!token){
     return  navigation.navigate("loginWithEmail") 
    }
  }

  useFocusEffect(
    useCallback(() => {
 
       checkdata()
      // Call the function to check user login status when the component is focuse
    }, [])
  );




  return (
    <Tab.Navigator   screenOptions={{
      tabBarLabelStyle: { fontSize: 13,fontWeight:"500" },
      tabBarActiveTintColor: '#1F51C6',
      tabBarInactiveTintColor: '#706D6D',
     
    }}>
      <Tab.Screen name="UpcomingAppointment" component={Dashbord} options={{title:"Upcoming"}} />
      <Tab.Screen name="CompletedAppointment" component={CompletedAppointment} options={{title:"Completed"}} />
      <Tab.Screen name="CancelAppointment" component={CancelAppointment}      options={{title:"Cancelled"}}  />
    </Tab.Navigator>
  );
}

export default DashboardTopTabNavigation