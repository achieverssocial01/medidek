import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { axiosClient } from '../../utils/axiosClient';
import UserContext from '../../Context/userContext';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountpage = () => {
  const { role, setrole, setConfirm, confirm } = useContext(UserContext);
  const [userAccount, setuserAccount] = useState({
    email: '',
    phone: '',
    password: '',
    rol: role,
  });
  const [error, seterror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const timeoutRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAlraadyExist, setIsAlraadyExist] = useState(false);
  const [otpverification, setotpverification] = useState(false)
  const [otpInput, setOtpInput] = useState("")


  const CreateUser = async () => {
    try {
      if (
        !userAccount.phone ||
        !userAccount.email ||
        !userAccount.password ||
        !userAccount.email.includes('@') ||
        !userAccount.rol
      ) {
        seterror(true);
        return;
      }
      setIsLoading(true);
      const response = await axiosClient.post('/v2/isUserExist', userAccount);
      if (response.data && response.data.result) {
        console.log('User Already exist');
        setIsLoading(false);
        return setIsAlraadyExist(true);
      } else {
        const mobile = '+91' + userAccount.phone;
        const respond = await auth().signInWithPhoneNumber(mobile)
        alert('OTP has been sent! Please verify')
        setIsLoading(false)
        setConfirm(respond)
        setotpverification(true);
      }
    }
    catch (error) {
      console.log(error);
    } finally {
      // Enable the button and hide loader after 20 seconds
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 20000);
    }
  };

  const checkdata = async () => {

    const token = await AsyncStorage.getItem("patienttoken");
    const token1 = await AsyncStorage.getItem("doctortoken");
    const token2 = await AsyncStorage.getItem("hospitaltoken");
    if (token) {
      return navigation.navigate("tabbord")
    }
    else if (token1) {
      return navigation.navigate("DoctorDashboard")
    }
    else if (token2) {
      return navigation.navigate("MasterDashboard")
    }
    else {
      return;
    }

  }


  useFocusEffect(
    useCallback(() => {
      checkdata()
    }, [])
  );

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const submitOtp = async () => {
    try {
      const response = await confirm?.confirm(otpInput)
      alert('Your number is verified')
      const respond = await axiosClient.post(
        '/v2/userCreation',
        userAccount,
      );
      if (respond?.data?.status === 'ok') {
        setuserAccount(
          (userAccount.email = ''),
          (userAccount.phone = ''),
          (userAccount.password = ''),
        );
        navigation.navigate('loginWithEmail');
      }
    } catch (error) {
      console.log('Invalid code')
    }
    setOtpInput('')
  }

  return (
    <>
      {
        !otpverification ?
          (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
              }}>
              <View
                style={{
                  backgroundColor: '#1F51C6',
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingVertical: 14,
                  paddingHorizontal: 15,
                  gap: 6,
                }}>
                <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>
                  Create Account
                </Text>
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#FFFFFF',
                      color: '#FFFFFF',
                      fontSize: 20,
                    }}

                    placeholder='+91'
                    value={userAccount.phone}
                    placeholderTextColor="#FFFFFF"
                    inputMode='numeric'
                    onChangeText={e => setuserAccount({ ...userAccount, phone: e })}
                    keyboardType="numeric"
                    editable={!isLoading} // Disable input field when loading
                  ></TextInput>
                  {error && !userAccount.phone && (
                    <Text style={{ color: 'yellow' }}>Please enter number</Text>
                  )}
                  {isAlraadyExist && (
                    <Text style={{ color: 'yellow' }}>
                      This number or email is already exist
                    </Text>
                  )}
                </View>
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#FFFFFF',
                      color: '#FFFFFF',
                      fontSize: 20,
                    }}
                    placeholder="Email Address"
                    value={userAccount.email}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={e => setuserAccount({ ...userAccount, email: e })}
                    editable={!isLoading}></TextInput>
                  {error && !userAccount.email && !userAccount.email?.includes('@') && (
                    <Text style={{ color: 'yellow' }}>Please enter email</Text>
                  )}
                  {error && userAccount.email && !userAccount.email?.includes('@') && (
                    <Text style={{ color: 'yellow' }}>Please enter email</Text>
                  )}
                </View>
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#FFFFFF',
                      color: '#FFFFFF',
                      fontSize: 20,
                    }}
                    placeholder="Password"
                    value={userAccount.password}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={e => setuserAccount({ ...userAccount, password: e })}
                    editable={!isLoading}
                    secureTextEntry={isPasswordVisible}
                  />
                  <TouchableOpacity onPress={setIsPasswordVisible}>
                    {isPasswordVisible ? (
                      <Text
                        style={{
                          padding: 0,
                          marginTop: -32,
                          marginLeft: 'auto',
                          marginRight: 20,
                        }}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        {' '}
                        <Icon name="eye-slash" size={15} color="white" />
                      </Text>
                    ) : (
                      <Text
                        style={{
                          padding: 0,
                          marginTop: -32,
                          marginLeft: 'auto',
                          marginRight: 20,
                        }}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Icon name="eye" size={15} color="white" />
                      </Text>
                    )}
                  </TouchableOpacity>

                  {error && !userAccount.password && (
                    <Text style={{ color: 'yellow' }}>Please enter password</Text>
                  )}
                </View>


                <View style={{ width: '100%' }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                    By continuing, you agree to Medidek’s Terms of Service & Privacy
                    Policy
                  </Text>
                </View>


                <View style={{ width: '100%', gap: 4 }}>
                  <TouchableOpacity onPress={CreateUser} disabled={isLoading}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#FFFFFF',
                        paddingVertical: 10,
                        borderRadius: 14,
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>
                        {isLoading ? 'Loading...' : 'Continue'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                  <View style={{ width: '100%', alignItems: 'center',flexDirection:"row", justifyContent:'center' }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '400' }}>
                      Already have an Account?
                    </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('loginWithEmail')}
                  disabled={isLoading}>
                    <View style={{backgroundColor:'#FFFFFF', borderRadius:10, padding:5, margin:3,opacity:0.8}}>
                    <Text style={{ color: 'blue', fontSize: 15, fontWeight: '700',marginHorizontal:10, padding:3, textDecorationStyle:"solid",textDecorationColor:"blue",textDecorationLine:"underline"}}>
                      Login
                    </Text>
                    </View>
                </TouchableOpacity>
                  </View>
              </View>
            </View>
          )
          :
          (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
              <View style={{ backgroundColor: "#1F51C6", alignItems: "center", width: "100%", padding: 14, borderRadius: 9, gap: 30 }}>
                <View style={{ width: "100%", alignItems: "center", gap: 5 }}>
                  <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>Enter OTP</Text>
                </View>


                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholderTextColor={'#FFFFFF'}
                    style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", fontSize: 15, fontWeight: '700', color: '#FFFFFF' }} placeholder='Enter Your OTP'
                    onChangeText={(value) => setOtpInput(value)}
                    secureTextEntry={true} />
                </View>
                <View style={{ width: "100%" }}>
                  <TouchableOpacity style={{ width: "100%", backgroundColor: "#FFFFFF", paddingVertical: 10, borderRadius: 25, alignItems: "center" }} onPress={() => submitOtp()}>
                    <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
      }

    </>

  );
};

export default CreateAccountpage;
