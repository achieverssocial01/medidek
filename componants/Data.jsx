import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import UserContext from './Context/userContext'

const Data = () => {
  const {userLogIn,values,setvalues} =useContext(UserContext)
    const navigation =useNavigation();
    return (
        <View style={{gap:15}}>
        {
            values?.Endtime1 && values?.Starttime1 &&
            <View>
            <Text style={{ fontSize: 15, fontWeight: '700', paddingTop: 30, marginLeft: 30,color:'#383838' }}>Slot 1</Text>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: "80%", marginLeft: '10%' }}>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Text style={{ fontSize: 15, padding: 10,color:'#383838' }}>Start Time :</Text>
                    <Text style={{ fontSize: 18, fontWeight:"900", fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10,color:'#383838'}}>  {values?.Starttime1}</Text>
                </View>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Text style={{ fontSize: 15, padding: 10,color:'#383838' }}>End Time :</Text>
                    <Text style={{ fontSize: 18,color:'#383838',fontWeight:"900", fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10 }}> { values?.Endtime1}</Text>
                </View>
            </View>
        </View>
        }
       {
        values?.Endtime2 && values?.Starttime2 &&
        <View>
        <Text style={{ fontSize: 15, fontWeight: '700', paddingTop: 20, marginLeft: 30,color:'#383838' }}>Slot 2</Text>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: "80%", marginLeft: '10%', }}>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={{ fontSize: 15, padding: 10,color:'#383838' }}>Start Time :</Text>
                <Text style={{ fontWeight:"900", fontSize: 18,color:'#383838', fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10 }}>{values?.Starttime2}</Text>
            </View>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={{ fontSize: 15, padding: 10 ,color:'#383838'}}>End Time :</Text>
                <Text style={{ fontWeight:"900", fontSize: 18,color:'#383838', fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10 }}> {values?.Endtime2}</Text>
            </View>
        </View>
     </View>
       }
       {
         values?.Endtime3 && values?.Starttime3 && <View>
         <Text style={{ fontSize: 15, fontWeight: '700', paddingTop: 20, marginLeft: 30,color:'#383838' }}>Slot 3</Text>
         <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: "80%", marginLeft: '10%' }}>
             <View style={{ flexDirection: 'column', padding: 10 }}>
                 <Text style={{ fontSize: 15, padding: 10 ,color:'#383838'}}>Start Time :</Text>
                 <Text style={{fontWeight:"900", fontSize: 18,color:'#383838', fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10 }}>{values?.Starttime3}</Text>
             </View>
             <View style={{ flexDirection: 'column', padding: 10 }}>
                 <Text style={{ fontSize: 15, padding: 10,color:'#383838' }}>End Time :</Text>
                 <Text style={{ fontWeight:"900",fontSize: 18,color:'#383838', fontFamily: '800', paddingVertical:15 , borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, textAlign: "center", padding: 10 }}>{values?.Endtime3}</Text>
             </View>
         </View>
     </View>
       }
        <TouchableOpacity onPress={()=>navigation.navigate("EditAppointment")} style={{ backgroundColor: '#1F51C6', height: 50, borderRadius: 25, justifyContent: "center",margin:20}}>
            <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 19, fontWeight: '800' }}>Edit Setting</Text>
        </TouchableOpacity>
     </View>
    )
}

export default Data

const styles = StyleSheet.create({})