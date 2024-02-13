import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import LogOutPopUp from './Stacknavigation/AppointmentPopup/LogoutPopUp';

const DoctorLogout = () => {
  const [showLogOutPop, setShowLogOutPop] = useState(false);
  const OpenPopUp = () => {
    setShowLogOutPop(!showLogOutPop);
  };
  return (
    <View>
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
                    source={require('./Assets/logout.png')}></Image>
                </View>
                <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
                  Log Out
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {showLogOutPop ? <LogOutPopUp OpenPopUp={OpenPopUp}  /> : null}
    </View>
  )
}

export default DoctorLogout

const styles = StyleSheet.create({})