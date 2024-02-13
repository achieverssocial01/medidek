import {View, Text, Image, TextInput, TouchableOpacity, Linking} from 'react-native';
import LogOutPopUp from './AppointmentPopup/LogoutPopUp';
import {useState, useContext} from 'react';
import UserContext from '../Context/userContext';
import { useNavigation } from '@react-navigation/native';

const Profile = props => {
  const [showLogOutPop, setShowLogOutPop] = useState(false);
  const OpenPopUp = () => {
    setShowLogOutPop(!showLogOutPop);
  };
  const {userLogIn} = useContext(UserContext);

  return (
    <>
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            paddingVertical: 30,
          }}>
          <View
            style={{
              width: 106,
              height: 106,
              borderRadius: 53,
              backgroundColor: '#DCE3F6',
              borderRadius: 30,
            }}>
            <Image
              style={{height: '100%', width: '100%',borderRadius:20}}
              source={{
                uri: userLogIn?.user?.imgurl ? userLogIn?.user?.imgurl  :"https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba"
              }}
            />
          </View>
          <Text style={{color: '#383838', fontSize: 24}}>
            {userLogIn?.user?.name}
          </Text>
        </View>

        <View style={{display: 'flex', gap: 8}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfileUser')}>
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 12,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 6,
                borderColor: '#D9D9D9',
                borderRadius: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View>
                  <Image
                    style={{height: 16, width: 16}}
                    source={require('../Assets/edit-icon.png')}></Image>
                </View>
                <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
                  EditProfile
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 16, width: 16, tintColor: '#383838'}}
                  source={require('../Assets/arrow.png')}></Image>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Dashbord')}>
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 12,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 6,
                borderColor: '#D9D9D9',
                borderRadius: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View>
                  {/* <Image></Image> */}
                  <Image
                    style={{height: 18, width: 18}}
                    source={require('../Assets/appointment.png')}></Image>
                </View>
                <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
                  View Appointments
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 16, width: 16, tintColor: '#383838'}}
                  source={require('../Assets/arrow.png')}></Image>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderWidth: 1,
              paddingVertical: 12,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 6,
              borderColor: '#D9D9D9',
              borderRadius: 5,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <View>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('../Assets/help.png')}></Image>
              </View>
              {/* <TouchableOpacity onPress={()=>{Linking.openURL("https://www.medidek.in/")}}> */}
              <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
                Privacy Policy
              </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => setShowLogOutPop(!showLogOutPop)}>
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 12,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 6,
                borderColor: '#D9D9D9',
                borderRadius: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View>
                  <Image
                    style={{height: 18, width: 18}}
                    source={require('../Assets/logout.png')}></Image>
                </View>
                <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
                  Log Out
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View>
                            <Image style={{ height: 16, width: 16 }} source={require("../Assets/delete.png")}></Image>
                        </View>
                        <Text style={{ fontSize: 15, color: "#B92612", fontWeight: "500" }}>Delete Account</Text>
                    </View>

                </View> */}
        </View>

        <View
          style={{
            flex: 1,
            margin: 0,
            alignItems: 'center',
            position: 'relative',
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#1F51C6'}}>Copyright @ medidek</Text>
            </View>
          </View>
        </View>
      </View>
      {showLogOutPop ? <LogOutPopUp OpenPopUp={OpenPopUp}  /> : null}
    </>
  );
};

export default Profile;
