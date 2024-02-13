import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Searchdoctor from './Searchdoctor';
import SelectDoctor from './Selectdoctor';
import DoctorsProfile from './Doctorprofiledata';
import Conformation from './Conformation';
import AppointmentBookingforDoctor from './AppointmentBookingforDoctor';
import AllHospitalsRoute from '../AllHospitalsRoute';
const Stack = createNativeStackNavigator()
function StacknavigationForDoctor() {
    return <Stack.Navigator initialRouteName='Searchdoctor' screenOptions={{
        headerShown: true,
        headerTitleAlign: "center"
    }} >
        <Stack.Screen name="Searchdoctor" component={Searchdoctor} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerTitle: "Find Doctor" }} />
        <Stack.Screen name="SelectDoctor" component={AllHospitalsRoute} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerTitle: "Find Hospital" }} />
        <Stack.Screen name="DoctorsProfile" component={DoctorsProfile} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerTitle: " Doctors Profile" }} />
        <Stack.Screen name="Conformation" component={Conformation} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerTitle: "Confirmation" }} />
        <Stack.Screen name="AppointmentBookingforDoctor" component={AppointmentBookingforDoctor} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerTitle: "Book Appointment" }} />
    </Stack.Navigator>

}


export default StacknavigationForDoctor

// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'

// const StacknavigationForDoctor = () => {
// const [touch, setTouch] = useState(1)

//  const handleTouch=(i)=>{
// setTouch(i)
//  }

//   return (
//     <View style={{ margin: 5 }}>
//       <TouchableOpacity>
//       </TouchableOpacity>
//       <Text style={{ fontSize: 24, fontWeight: '700', color: '#383838' }}>Appointment Tracking</Text>
//       <View style={{flexDirection:'row', gap:45, marginVertical:15, marginHorizontal:10}}>
//       <TouchableOpacity style={{ backgroundColor: touch==0 ? '#1F51C6' :null, borderRadius: 30, justifyContent: 'center', paddingVertical: 14,width:'25%' }} onPress={()=>handleTouch(0)}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color:  touch==0 ? '#FFFFFF' : '#706D6D', textAlign: 'center' }}>Upcoming</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ backgroundColor:touch==1 ? '#1F51C6' :null, borderRadius: 30, justifyContent: 'center', paddingVertical: 14,width:'25%' }}  onPress={()=>handleTouch(1)}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: touch==1 ? '#FFFFFF' : '#706D6D', textAlign: 'center' }}>Completed</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ backgroundColor:touch==2 ? '#1F51C6' :null, borderRadius: 30, justifyContent: 'center', paddingVertical: 14,width:'25%' }}  onPress={()=>handleTouch(2)}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color:  touch==2 ? '#FFFFFF' : '#706D6D', textAlign: 'center' }}>Canceled</Text>
//           </TouchableOpacity>
//       </View>




//       <View style={{borderColor:'#D9D9D9', borderWidth:1, borderRadius:10, padding:10}}>
//         <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', width:'100%' }}>
//           <View style={{margin:10}}>
//             <Image source={{ uri: "https://th.bing.com/th/id/OIP.c17XAqg6srb_lo1ElbyJSgAAAA?rs=1&pid=ImgDetMain" }}
//               style={{ width: 57, height: 57, objectFit: 'contain', borderRadius: 60 }}
//             />
//           </View>
//           <View style={{ padding: 10, width:'75%' }}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: '#383838', }}> Appointment with Dr. Shashwat Magarkar</Text>
//             <Text style={{ fontSize: 13, fontWeight: '600', color: '#706D6D' }}>Date: 10/10/2023</Text>
//           </View>
//         </View>
//         <View>
//           <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', paddingVertical: 14 }} onPress={()=>setTouch(2)}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' }}>Reschedule</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }

// export default StacknavigationForDoctor

// const styles = StyleSheet.create({})


