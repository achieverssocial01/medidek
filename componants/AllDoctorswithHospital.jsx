import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { axiosClient } from './utils/axiosClient'
import Autocomplete from 'react-native-autocomplete-input'
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect, useNavigation } from '@react-navigation/native'


const windowwidth = Dimensions.get('window').width
const windowheight = Dimensions.get('window').height


const AllDoctorswithHospital = (props) => {
  const { HospitalId } = props.route.params;
  const [HospitalWithDoctors, setHospitalWithDoctor] = useState(null)
  const [film, setfilm] = useState({})
  const navigation =useNavigation();
  const HospitalImage = "https://th.bing.com/th/id/OIP.srOi0rWyzaTxy08bryY9qwHaFG?rs=1&pid=ImgDetMain"
  const DoctorImage = "https://www.bing.com/th?id=OIP.wR3_FR1I1u9vpxuuFIxmqQHaLP&w=135&h=206&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"


  const getDoctorswithHospitalId = async () => {
    // /getHospitalByIdAndTheirsDoctors/:hospitalId
    const res = await axiosClient.get(`/v2/getHospitalByIdAndTheirsDoctors/${HospitalId}`)
    setHospitalWithDoctor(res.data.result)
  }
  useFocusEffect(
    useCallback(() => {
      getDoctorswithHospitalId()
    }, [])
  )
  console.log(HospitalWithDoctors?.doctors);



  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }



  return (
    <View>
      <ScrollView>

        <View style={{ padding: 3, margin: 2, height: windowheight, gap: 5 }}>

          <View style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 2, borderRadius: 5, backgroundColor: "#DCE3F6" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10,marginLeft:5 }}>
                <Image source={{ uri: HospitalWithDoctors?.imgurl ? HospitalWithDoctors?.imgurl : HospitalImage }} width={130} height={130} style={{ borderRadius: 20, objectFit: 'contain' }} />
              </View>
              <View style={{ flex: 2, padding: 15, gap: 5 }} >
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', textAlign: 'center' }}>    {HospitalWithDoctors?.nameOfhospitalOrClinic}</Text>
                <Text style={{ fontSize: 15, fontWeight: '500', color: '#383838', textAlign: 'center' }}>{HospitalWithDoctors?.location}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', textAlign: 'center' }}>
                  {/* Rating : */}
                  <AirbnbRating
                    showRating={false}
                    ratingCount={5}
                    // defaultRating={3}
                    size={20}
                    onFinishRating={ratingCompleted}
                    isDisabled={true}
                    style={{ justifyContent: 'center' }}
                  />
                </Text>
              </View>
            </View>

            {/* <View style={{ padding: 5, flexDirection: 'row', justifyContent: "center" }}>
              <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }} onPress={() => navigation.navigate("Book")}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>Book Appointment</Text>
              </TouchableOpacity>
            </View> */}
          </View>




          {
            HospitalWithDoctors?.doctors?.length > 0 ? HospitalWithDoctors?.doctors.map((item) => (
              <View>
                <Text style={{ color: '#383838', padding: 15, marginTop: 10, fontSize: 17, width: '100%', fontWeight: '600', }}>Doctor Availvailty in Hospitals</Text>

                <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
                      <Image source={{ uri: DoctorImage }} width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
                    </View>
                    <View style={{ flex: 2, padding: 10 }} >
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Dr.{item?.nameOfTheDoctor}</Text>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Expr:{item?.yearOfExprience}</Text>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Sp:{item?.speciality}</Text>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>Loc:{item?.location?.toLowerCase()}</Text>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838', }}>
                        {/* Rating : */}
                        <AirbnbRating
                          showRating={false}
                          ratingCount={5}
                          // defaultRating={3}
                          size={20}
                          onFinishRating={ratingCompleted}
                          isDisabled={true}

                        />
                      </Text>
                    </View>
                  </View>

                  <View style={{ padding: 5, flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }}  onPress={() => navigation.navigate("Book", {
                      doctorDetail: item,
                    })}>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>Book Appointment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
              :
              (
                <View>
                  <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838', textAlign: 'center' }}>No Doctors Found, In This Hospital</Text>
                </View>
              )
          }
        </View>






      </ScrollView>
    </View>
  )
}

export default AllDoctorswithHospital

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
})