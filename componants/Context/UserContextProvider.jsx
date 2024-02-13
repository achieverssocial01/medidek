import React, { useState, useEffect } from "react"
import UserContext from "./userContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

const userContextProvider = ({ children }) => {
    
    const [userLogIn, setUserLogin] = useState({
        user: null,
        token: ""
    })
  const [confirm, setConfirm] = useState()
  const [doctorDetail,setdoctorDetail]=useState(null)
  const [role,setrole]=useState("")
  const [values,setvalues]=useState({
    Endtime1:"",
    Endtime2:"",
    Endtime3:"",
    Starttime1:"",
    Starttime2:"",
    Starttime3:""
  })
  const [values2,setvalues2]=useState({
    Endtime1:"",
    Endtime2:"",
    Endtime3:"",
    Starttime1:"",
    Starttime2:"",
    Starttime3:""
  })
  const [selecteddate, setselecteddate] = useState({
    currentDate: moment().format("YYYY-MM-DD"),
    index: 0,
  });
    
    useEffect(()=>{
        const userData = async()=>{
            const user = await AsyncStorage.getItem("data")
            const token = await AsyncStorage.getItem("patienttoken")
            const token1 = await AsyncStorage.getItem("doctortoken");
            const token2 = await AsyncStorage.getItem("hospitaltoken");
            if(user && token){
                const data = JSON.parse(user)
                setUserLogin({...userLogIn, user:data, token})
            }
           else if(user && token1){
                const data = JSON.parse(user)
                setUserLogin({...userLogIn, user:data, token})
            }
           else if(user && token2){
                const data = JSON.parse(user)
                setUserLogin({...userLogIn, user:data, token})
            }
        }
        userData();
    },[])
    return (
        <UserContext.Provider value={{ userLogIn, setUserLogin,setConfirm,confirm,role,setrole,values,setvalues,
            doctorDetail,setdoctorDetail,values2,setvalues2,selecteddate, setselecteddate
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default userContextProvider;
