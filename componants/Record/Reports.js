import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, Image, TouchableOpacity,  ScrollView,Button, Alert, Modal, ActivityIndicator} from "react-native";
import { axiosClient } from "../utils/axiosClient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import Pinchable from 'react-native-pinchable';

import UserContext from "../Context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageViewer from "react-native-image-zoom-viewer"
const Reports = (props) => {
    const [record, setRecord] = useState([]);
    const [img, setImage] = useState({
        uri: "",
        name: "",
        filename: "",
        type: "",
      });
    const {userLogIn} =useContext(UserContext);
    const [isupload,setisupload] =useState(false);
    const [modalvisible,setmodalvisible]=useState(false)
    const [isloading,setisloading]=useState(false)
    

   const navigation =useNavigation();

    const checkdata =async()=>{
        const token = await AsyncStorage.getItem("patienttoken");
        if(!token){
         return  navigation.navigate("loginWithEmail") 
        }
      }
    
      useFocusEffect(
        useCallback(() => {
          // Function to check if the user is logged in by verifying the presence of a toke
      //     if(!userLogIn?.token){
      //       navigation.navigate("loginWithEmail")
      //  }
           checkdata()
          // Call the function to check user login status when the component is focuse
        }, [])
      );




    const SelectImage = async () => {

        const options = {
          mediaType: "photo",
          durationLimit: 10,
          quality: 1,
          noData: true,
          allowsEditing: true,
          maxWidth: 500,
          maxHeight: 500
        }
        const Images = await launchImageLibrary(options)
        // console.log(Images.assets[0])
        setImage({
          ...img,
          uri: Images.assets[0].uri,
          name: Images.assets[0].fileName,
          filename: Images.assets[0].fileName,
          type: Images.assets[0].type
        })
      }
    const uploadimages = async ()=>{

    try {
        const formdata = new FormData();

        formdata.append("image",img)
        
        var headers = {
            'Content-Type': 'multipart/form-data'
          };
          setisupload(true)
        const result = await axiosClient.post(`/v2/uploadRecord/${userLogIn?.user?._id}`,formdata,{ headers:headers})
        if(result.data.status ==="ok"){
            setisupload(false)
            getAllRecords();
            setImage({...img,uri:"",name:"",filename:"",type:""})
        }
    } catch (error) {
     console.log(error)   
    }
    }

    const getAllRecords = async () => {
      setisloading(true)
        try {
            const result = await axiosClient.get(`/v2/getRecordOfPatient/${userLogIn?.user?._id}`);
            if(result.data.status==="ok"){
                setRecord(result.data.result);
                setisloading(false)
            }
            else{
                Alert.alert("No Data available");
            }
     
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

   useEffect(()=>{
      getAllRecords()
   },[])


     function renderItem() {
    return (
<>

      <Modal visible={modalvisible} animationType='slide' transparent={true}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{ backgroundColor: 'dce3f6', padding: 5, width: '100%', }}>
         <Image source={{uri:'https://wallup.net/wp-content/uploads/2019/10/309991-tulips-many-flowers.jpg'}} width={400} height={600}/>
          <TouchableOpacity style={{padding:15}} onPress={()=>setmodalvisible(false)}>
            <Text>close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </>
     )
   }




    return (
        <View style={{ paddingHorizontal: 6, paddingVertical: 16, flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 8, display: "flex", flexDirection: "row", justifyContent: "space-between", borderRadius: 10 }}>
                <View>
                    <Text style={{ color: "#383838", fontWeight: "600", fontSize: 16 }}>Upload Medical Report</Text>
                    <Text style={{ color: "#706D6D", fontWeight: "600", fontSize: 16 }}>Save all your medical records</Text>
                    <Text style={{ color: "#706D6D", fontWeight: "600", fontSize: 16 }}>in one place</Text>
                </View>
                <TouchableOpacity onPress={() => SelectImage()} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <View style={{ backgroundColor: "#1F51C6", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, gap: 9 }}>
                        <Text style={{color:"#FFFFFF",fontWeight:"700"}}>Upload</Text>
                        <Image source={require("../Assets/Group-760.png")} />
                    </View>

                </TouchableOpacity>

               
            </View>
             {
                    img.uri && !isupload && <View style={{ backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, gap: 9 }}>
                    <Image source={{uri:img.uri}} width={100} height={100} />
                     <Button 
                    onPress={uploadimages}
                    title="Upload Image"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                     />
                </View>
                }
    {
       isloading ? (
        <ActivityIndicator size="large" color="#1F51C6" /> 
    ) 
        :     
            record.length > 0 ? (
                <>
                    <Text style={{ color: "#000000", fontWeight: "500", fontSize: 16 }}>Your Records</Text>
                    <ScrollView horizontal>
                      <View style={{flexDirection: 'row', gap:10,flexWrap:"wrap", justifyContent:"center" }}>
                        
                        {

                        record.map((item,i)=>(
                        
                                !modalvisible ? 
                            
                    <TouchableOpacity onPress={()=>setmodalvisible(true)}>
                                <Image style={{borderRadius:5}} source={{uri:item.imgurl}} width={100} height={100}/>
                        </TouchableOpacity>
                         :
                         <TouchableOpacity style={{padding:15}} onPress={()=>setmodalvisible(false)}>
                         <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                         <View style={{ backgroundColor: 'dce3f6', padding: 5, width: '100%', }}>
                        <Image source={{uri:record[i]?.imgurl}} width={400} height={600}/>
                         </View>
                       </View>
                         </TouchableOpacity>
                            
                        ))
                    } 
                    
                    </View>
                    </ScrollView>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {/* You can add a message here for when there are no records */}
                    <Image source={require("../Assets/Medical-illustration.png")} style={{ marginLeft: 10 }}></Image>
                </View>
            )}
        </View>
    );
};

export default Reports;
