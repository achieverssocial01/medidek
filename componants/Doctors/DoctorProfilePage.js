import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import UserContext from '../Context/userContext';
import { axiosClient } from '../utils/axiosClient';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';


const windowwidth = Dimensions.get('window').width
const windowheight = Dimensions.get('window').height



const DoctorProfilePage = props => {
  const { doctorid } = props.route.params;
  const [doctordetail, setdoctordetail] = useState({});
  const [hospitallist, sethospitallist] = useState([]);
  const navigation = useNavigation();
  const { userLogIn } = useContext(UserContext);

  const getdoctordetail = async () => {
    if (userLogIn?.token) {
      const response = await axiosClient.get(`/v2/singledoctor/${doctorid}`);
      if (response.data.status === 'ok') {
        setdoctordetail(response.data.result);
        const docid = response?.data?.result?.doctorid;
        try {
          const hospitalresponse = await axiosClient.get(
            `/v2/multipleloginprofile/${docid}`,
          );
          if (hospitalresponse.data?.status === 'ok') {
            sethospitallist(hospitalresponse?.data?.result);
          } else {
            console.log(hospitalresponse?.data?.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigation.navigate('loginWithEmail');
    }
  };

  useEffect(() => {
    getdoctordetail();
  }, [doctorid]);


  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }



  return (
    <ScrollView>
      <View style={{ padding: 3, margin: 2, height: windowheight, gap: 7 }}>
        <View style={styles.doctorCardStyle}>
          <Image
            source={{ uri: doctordetail?.imgurl ? doctordetail?.imgurl : "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba" }}
            width={100}
            height={100}
            style={{ borderRadius: 100, objectFit: 'contain', }}
          />
          <View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>
              Dr. {doctordetail?.nameOfTheDoctor}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838',width:"100%" }}>{doctordetail?.speciality}</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#383838' }}>
              {/* Rating {doctordetail?.reviews?.length} */}
              <AirbnbRating
                showRating={false}
                ratingCount={5}
                // defaultRating={3}
                size={20}
                onFinishRating={doctordetail?.reviews?.length}
                isDisabled={true}
                style={{ justifyContent: 'center' }}
              />
            </Text>
          </View>
        </View>

        <View >
          <View>
            <Text style={styles.hospitaltitle}>Doctor Availability in Hospitals</Text>
          </View>
          <ScrollView>
          {hospitallist.length > 0 ?
            hospitallist.map(item => (
            <View key={item._id} style={{ flexDirection: 'column', zIndex: 0, margin: 4, padding: 5, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, padding: 10 }}>
                    <Image
                      source={{ uri: item?.imgurl ? item?.imgurl : "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba" }}

                      width={100} height={100} style={{ borderRadius: 600, objectFit: "contain" }} />
                  </View>
                  <View style={{ flex: 2, padding: 10 }} >
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>Hospital :- {item?.hospitalId?.nameOfhospitalOrClinic ? item?.hospitalId?.nameOfhospitalOrClinic : "Owner"}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>Dr. {item?.nameOfTheDoctor}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>{item?.speciality}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>{item?.location}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838' }}>{item?.connsultationFee}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#383838', }}>
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
                  <TouchableOpacity style={{ backgroundColor: '#1F51C6', borderRadius: 30, justifyContent: 'center', width: '100%', }} onPress={() =>
                    navigation.navigate('Book', {
                      doctorDetail: item,
                    })
                  }>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', padding: 10, textAlign: "center", }}>Book Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )) : (
              <View style={styles.doctorStyle}>
                <Image
                  source={{ uri: "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba" }}
                  width={100}
                  height={100}
                  style={{ borderRadius: 100 }}
                />
                <View style={styles.hospitaltext}>
                  <Text style={styles.title}>Hospital is Loading....</Text>
                </View>
              </View>
            )
          }
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default DoctorProfilePage;

const styles = StyleSheet.create({
  doctorCardStyle: {
    flexDirection: 'row',
    backgroundColor: '#DCE3F6',
    padding: 24,
    width: '100%',
    height: '40',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    gap: 18,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '600',
    color: 'black',
  },
  HospitalCardStyle: {
    flexDirection: 'column',
    backgroundColor: '#DCE3F6',
    // padding: 24,
    width: '100%',
    marginTop: 16,
    // height: 50,
    // display: "flex",
    // alignItems:"center",
    gap: 8,
    // flex: 1,
  },
  hospitaltitle: {
    color: '#383838',
    padding: 15,
    marginTop:10,
    fontSize: 17,
    width: '100%',
    fontWeight: '600',
  },
  doctorStyle: {
    flexDirection: 'row',
    backgroundColor: '#DCE3F6',
    padding: 22,
    width: '100%',
    marginTop: 6,
    marginLeft: 15,
    // height:"",
    // flex:1,
    alignItems: 'center',
    position: 'fixed',
    gap: 8,
  },
  btn: {
    width: '60%',
    color: 'white',
    marginTop: 12,
    marginLeft: 8,
    fontWeight: '700',
  },
  btntitle: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: '#1F51C6',
    borderRadius: 10,
  },
  hospitaltext: {
    marginLeft: 18,
    flex: 2,
    flexWrap: 'wrap',
  },
});
