import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosClient =axios.create({
    // baseURL:"https://mehrhospitality.com"
    baseURL:"https://medidekdemobackend.onrender.com"
   
})
axiosClient.interceptors.request.use(async (request) => {
    const token = await AsyncStorage.getItem("patienttoken");
    const token1 = await AsyncStorage.getItem("doctortoken");
    const token2 = await AsyncStorage.getItem("hospitaltoken");
    if(token){
 request.headers["Authorization"] = `Bearer ${token}`;
    return request;
    }
    else if(token1){
 request.headers["Authorization"] = `Bearer ${token1}`;
    return request;
    }
    if(token2){
 request.headers["Authorization"] = `Bearer ${token2}`;
    return request;
    }
    else{
        request.headers["Authorization"] = `Bearer ${token}`;
        return request;   
    }
   

});
