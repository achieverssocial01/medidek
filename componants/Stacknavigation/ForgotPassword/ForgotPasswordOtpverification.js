import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert, ImageBackground } from "react-native";
// import { useRecoilValue } from "recoil";
// import { UserEmailForResetThePassword } from "../../Recoil/Atom";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordOtpverification = ({ route }) => {
  // const { id } = route.params;

  // const email = useRecoilValue(UserEmailForResetThePassword);

  const navigation = useNavigation();

  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [Otp, setOtp] = useState(["", "", "", "", "", ""]); // Initialize OTP state with empty strings

  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else {
      // If the user is in the last input field, you can add logic to trigger an action,
      // such as submitting the OTP.
      // For example: props.navigation.navigate("tabbord");
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      // If the user presses the Backspace key in an empty input box, clear the input
      if (Otp[index] === "") {
        const newOtp = [...Otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current.focus();
      } else {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleOtpChange = (text, index) => {
    // Update the OTP state with only one character
    const newOtp = [...Otp];
    newOtp[index] = text.charAt(0);
    setOtp(newOtp);

    if (text) {
      // Automatically move to the next input field if there is input
      focusNextInput(index);
    }
  };

  const VerifyOtp = async () => {
    navigation.navigate("ResetPassword")
    // const result = await axiosClient.post("varifyOtpForResetPassword", { email: email, otp: Number(Otp.join("")) });
    // console.log(result.data, { email: email, otp: Number(Otp.join("")) });
    // if (result.data.statusCode === 200) {
    //   Alert.alert("Verification done. Now reset password");
    //   navigation.navigate("ResetPassword", { id: id });
    // } else {
    //   Alert.alert("Invalid Otp");
    // }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>

      {/* <ImageBackground source={require('../../Assets/BackgroundImg.png')} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} > */}

        <View style={{ backgroundColor: "#1F51C6", alignItems: "center", width: "100%", paddingVertical: 30, paddingHorizontal: 18, borderRadius: 9, gap: 6 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Verification Code</Text>
          <Text style={{ fontSize: 12, textAlign: "center", paddingHorizontal: 6 }}>We have sent the code verification to your Mobile Number</Text>
          <View style={{ flexDirection: "row", gap: 6, marginVertical: 8 }}>
            {inputRefs.map((ref, index) => (
              <TextInput
                key={index}
                ref={ref}
                style={{ backgroundColor: "white", flex: 1, color: "black", borderRadius: 5 }}
                textAlign={'center'}
                keyboardType="numeric"
                value={Otp[index]} // Set the value of the input field to the corresponding OTP digit
                onChangeText={(text) => handleOtpChange(text, index)} // Handle OTP changes
                onKeyPress={(e) => handleKeyPress(e, index)}
                maxLength={1} // Allow only one character per input
              />
            ))}
          </View>

          <TouchableOpacity style={{ width: "100%", backgroundColor: "#FFFFFF", paddingVertical: 10, borderRadius: 25, alignItems: "center" }}
            onPress={VerifyOtp}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>Continue</Text>
          </TouchableOpacity>
        </View>
      {/* </ImageBackground> */}

    </View>
  );
};

export default ForgotPasswordOtpverification;
