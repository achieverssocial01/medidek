import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"



const LogOutPopUp = ({OpenPopUp}) => {

    const navigation=useNavigation()

    const checkdata =async()=>{
        const token = await AsyncStorage.getItem("patienttoken");
        const token1 = await AsyncStorage.getItem("doctortoken");
        const token2 = await AsyncStorage.getItem("hospitaltoken");
        if(!token && !token1 && !token2 ){
         return  navigation.navigate("Signup") 
        }
      }
    
      useFocusEffect(
        useCallback(() => {
           checkdata()
        }, [])
      )
      
    const LogOut = async ()=>{
        const token = await AsyncStorage.getItem("patienttoken");
    const token1 = await AsyncStorage.getItem("doctortoken");
    const token2 = await AsyncStorage.getItem("hospitaltoken");
    if(token){
      await AsyncStorage.removeItem("patienttoken")
      OpenPopUp()
      return  navigation.navigate("Signup") 
    }
    else if(token1){
        await AsyncStorage.removeItem("doctortoken")
        OpenPopUp()
        return  navigation.navigate("Signup") 
    }
    else if(token2){
        await AsyncStorage.removeItem("hospitaltoken")
        OpenPopUp()
        return  navigation.navigate("Signup") 
    }
    else{
        OpenPopUp()
      return  navigation.navigate("Signup") 
    }
     
    }
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                 <View style={{width:"100%",height:40,justifyContent:"center",alignItems:"center",marginVertical:10}}>
                   
                      <TouchableOpacity onPress={OpenPopUp}>
                      <View style={{height:40,width:40,borderWidth:1,borderRadius:20,borderColor:"#FFFFFF",justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#FFFFFF"}}>X</Text>
                        </View>
                        </TouchableOpacity>
                    
                 </View>
                <View style={{width:"100%",backgroundColor:"#FFFFFF",borderTopRightRadius:10,borderTopLeftRadius:10,paddingHorizontal:16,paddingVertical:24,position:"relative"}}>
                   
                    <Text style={{color:"#383838",fontWeight:"700",fontSize:24}}>Confirm LogOut</Text>
                    <Text style={{color:"#706D6D",fontWeight:"600",fontSize:13}}>Are you sure you want to proceed?</Text>

                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
                <TouchableOpacity style={{ backgroundColor: "#D9D9D9", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
                 onPress={OpenPopUp}
                >
                    <View >
                        <Text style={{ fontWeight: "600", fontSize: 16 ,color:"#383838" }}>Cancel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: "#1F51C6", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
                onPress={LogOut}
                >
                    <View >
                        <Text style={{ fontWeight: "600", fontSize: 16,color:"#FFFFFF" }}>Confirm</Text>
                    </View>
                </TouchableOpacity>
            </View>
                </View>
           
            </View>
        </>
    )
}



export default LogOutPopUp