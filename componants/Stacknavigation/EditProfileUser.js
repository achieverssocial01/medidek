import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import ChangePassword from "./ChangePassword";

import { axiosClient } from "../utils/axiosClient";
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../Context/userContext";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";


const windowheight = Dimensions.get('window').height
const windowwidth = Dimensions.get('window').width

const Genders = ["Male", "Female", "Other"]


const EditProfileUser = () => {

  const { userLogIn, setUserLogin } = useContext(UserContext);
  const [userImg, setUserImg] = useState(userLogIn?.user?.imgurl)

  let [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation()
  const [userAccount, setuserAccount] = useState({
    name: userLogIn?.user?.name,
    email: userLogIn?.user?.email,
    dateOfBirth: userLogIn?.user?.dateOfBirth,
    phone: userLogIn?.user?.phone,
    gender: userLogIn?.user?.gender
  })
  const [img, setImage] = useState({
    uri: "",
    name: "",
    filename: "",
    type: "",
  });



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
    setImage({
      ...img,
      uri: Images.assets[0].uri,
      name: Images.assets[0].fileName,
      filename: Images.assets[0].fileName,
      type: Images.assets[0].type
    })
    setUserImg(Images.assets[0].uri)
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const dateOfBirthofUser = `${day}-${month}-${year}`;

    console.log("Date of Birth: ", dateOfBirthofUser);
    setuserAccount((prev) => {
      return { ...prev, dateOfBirth: dateOfBirthofUser }
    })

    hideDatePicker();
  };


  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 2;

  const saveChages = async () => {
    const formdata = new FormData()
    formdata.append('name', userAccount.name)
    formdata.append('email', userAccount.email)
    formdata.append('dateOfBirth', userAccount.dateOfBirth)
    formdata.append('phone', userAccount.phone)
    formdata.append('image', img.uri ? img : userImg)
    formdata.append('gender', userAccount.gender)
    var headers = {
      'Content-Type': 'multipart/form-data',
    };


    try {
      const result = await axiosClient.put(`/v2/updateuserpatient/${userLogIn?.user?._id}`, formdata, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      if (result.data.status === 'ok') {
        setUserLogin({ ...userLogIn, user: result.data.result })
        await AsyncStorage.setItem('data', JSON.stringify(result.data.result))
        navigation.navigate("Profile")
      }
      else {
        Alert.alert("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 16, backgroundColor: "#FFFFFF", height: windowheight }}>
          <View>
            <Text style={{ color: "#383838", fontSize: 20, fontWeight: "600", paddingVertical: 10 }}>
              Edit Profile
            </Text>
          </View>

          <View style={{ borderWidth: 1, height: 600, borderColor: "#D9D9D9", borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-evenly", gap: 5 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <View style={{ height: 60, width: 60, borderRadius: 30 }}>
                <Image source={{ uri: userImg ? userImg : img.uri }} style={{ width: "100%", height: "100%" }} />
              </View>

              <View style={{ display: "flex", justifyContent: "center" }}>
                {/* <Text style={{ color: "#D9D9D9", fontWeight: "700" }}>Pick a picture </Text>
                <Text style={{ color: "#D9D9D9", fontWeight: "700" }}>from your Phone</Text> */}
                <TouchableOpacity onPress={SelectImage}>
                  <Text style={{ color: "#1F51C6", fontWeight: "500" }}>Change Profile Picture</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "100%", height: 1, backgroundColor: "#D9D9D9", marginVertical: 6 }}></View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600", margin: 5 }}>Full Name</Text>
              <TextInput placeholder="First Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.name}
                onChangeText={(e) => setuserAccount({ ...userAccount, name: e })} />
            </View>

            {/* <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Last Name</Text>
              <TextInput placeholder="Last Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black' }} />
            </View> */}
            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600", margin: 5 }}>Update Email Address</Text>
              <TextInput placeholder="Update Email Address" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.email}
                onChangeText={(e) => setuserAccount({ ...userAccount, email: e })}
              />
            </View>
            <View>



              {/* date section start */}

              <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600", margin: 5 }}>Add Birth date</Text>
                <View style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }} >
                  <Text style={{ color: "#383838", marginVertical: 13 }}>{userAccount?.dateOfBirth}</Text>
                </View>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              {/* date section end */}
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600", margin: 5 }}>Add Mobile Number</Text>
              <TextInput placeholder="Add Mobile Number" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }} value={userAccount?.phone}
                onChangeText={(e) => setuserAccount({ ...userAccount, phone: e })}
              />
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "600", margin: 5 }}>Gender</Text>

              <TextInput placeholder="First Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', backgroundColor: "white", shadowColor: "black", elevation: 20, }}
                value={userAccount?.gender}
                onChangeText={(e) => setuserAccount({ ...userAccount, gender: e })} />
                {/* <Dropdown
                data={Genders}
                renderItem={item => <StatusDropdown item={item} />}
                onChange={()=>}
                /> */}
            </View>

            <View style={{ direction: "flex", gap: 6, paddingVertical: 12 }}>
              <TouchableOpacity onPress={saveChages}>
                <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Save Changes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangePassword}>
                <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                  <Text style={{ color: "#383838", fontSize: 15, fontWeight: '700' }}>Change Password</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {showPassword ? <ChangePassword handleChangePassword={handleChangePassword} /> : null}
      {/* <View style={{position:"absolute",height:"100%" ,width:"100%",backgroundColor:"white",justifyContent:"center"}}>
        <CalenderPicker />
      </View> */}

    </KeyboardAvoidingView>
  );
};

export default EditProfileUser;


