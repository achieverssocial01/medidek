import { useContext, useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"

import { axiosClient } from "../utils/axiosClient"
import UserContext from "../Context/userContext";




const ChangePassword = (props) => {

    const [userPassword, setuserPassword] = useState({ password: "" })
    const [userConfirmPassword, setuserConfirmPassword] = useState({ password: "" })
    const [olduserPassword, setolduserPassword] = useState({ password: "" })
    const [passwordNotMatched, setPasswordNotMatched] = useState(false)
    const [incorrectPassword, setIncorrectPassword] = useState(false)
const {userLogIn,role} = useContext(UserContext)
    // const [userProfile, setuserProfile] = useRecoilState(Userdata)

    // const changePassword = async (e) => {
    //     e.preventDefault();
    //     console.log(oldPassword, newPassword, confirmPassword);
    //     if (!oldPassword || !newPassword || !confirmPassword) {
    //         return setError(true);
    //     }

    //     if (newPassword !== confirmPassword) {
    //         setError(true);
    //         return setPasswordNotMatch(true);
    //     }
    //     console.log("hello bccc");
    //     setLoading(true);
    //     try {
    //         console.log("hii bccc");

    //         const response = await axiosClient.put(
    //             `/v2/changepassword/${user?._id}`,
    //             {
    //                 oldpassword: oldPassword,
    //                 newpassword: newPassword,
    //                 role: "PATIENT",
    //             }
    //         );
    //         if (response.status === "ok") {
    //             setChangePasswordDialog(false);
    //             setLoading(false);
    //             return toast.success("password Changed successfully");
    //         } else if (
    //             response.status === "error" &&
    //             response.statusCode === 409
    //         ) {
    //             setLoading(false);
    //             setLoading(false);
    //             return setWrongPassword(true);
    //         }
    //     } catch (error) {
    //         // setOldPassword("");
    //         // setNewPassword("");
    //         // setConfirmPassword("");
    //         setError(true);
    //         setLoading(false);
    //         setWrongPassword(error.message);
    //     }
    // };

    const changePassword = async () => {

        if (userConfirmPassword.password !== userPassword.password) {
            return setPasswordNotMatched(true)
        }
        else {
            try {
                const response = await axiosClient.put(`/v2/changepassword/${userLogIn?.user?._id}`,{oldpassword:olduserPassword.password,newpassword:userConfirmPassword.password, role: role})
                if(response.data.statusCode === 409){
               return setIncorrectPassword(true)
              }
                if (response.data.status === "ok") {
                    Alert.alert("Successfully update !!")
                    props.handleChangePassword()
                }
                else {
                    Alert.alert("not updated")
                
                }

            } catch (error) {
                console.log(error.message)
            }
        }



    }
    return (
        <>
            <View style={{ backgroundColor: "#000000D1", height: "100%", width: "100%", position: "absolute", top: 0, display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
                <View style={{ backgroundColor: "#FFFFFF", padding: 20, borderWidth: 1, width: "100%", borderRadius: 5 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ color: "#383838", fontWeight: "600" }}>Change Password</Text>
                        <Text style={{ color: "#383838" }} onPress={() => props.handleChangePassword()}>X</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#D9D9D9", width: "100%", marginVertical: 14 }}></View>

                    <View style={{ width: "100%", paddingHorizontal: 6 }}>
                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} >Enter Old Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9"
                                onChangeText={(e) => setolduserPassword({ ...olduserPassword, password: e })}
                            ></TextInput>
                            
                            {incorrectPassword && <Text style={{color:'red'}}>Old Passwod Is Incorrect</Text>}
                               
                        </View>

                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} >Enter New Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9" onChangeText={(e) => setuserPassword({ ...userPassword, password: e })}></TextInput>
                            {passwordNotMatched && <Text style={{color:'red'}}>Password Does Not Matched</Text>}
                        </View>

                        <View>
                            <Text style={{ color: "#383838", fontWeight: "600" }} > Confirm New  Password <Text style={{ color: "#EA4335" }}>*</Text></Text>
                            <TextInput style={{ borderColor: "#D9D9D9", borderWidth: 1, paddingHorizontal: 9, borderRadius: 5, color: "black" }} placeholder="Password" placeholderTextColor="#D9D9D9"
                                onChangeText={(e) => setuserConfirmPassword({ ...userConfirmPassword, password: e })}
                            ></TextInput>
                        </View>

                        <TouchableOpacity onPress={changePassword}>
                            <View style={{
                                backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12
                                , display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color:"#FFFFFF"}}>Change Password</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.handleChangePassword()}>

                            <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    )
}



export default ChangePassword