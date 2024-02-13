import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';
import { Fragment, useCallback, useContext } from 'react';
import { useState, useEffect } from 'react';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import UserContext from '../Context/userContext';
import { axiosClient } from '../utils/axiosClient';
import { category } from '../categories';

const windowwidth = Dimensions.get("window").width;
const Index = props => {

  const navigation = useNavigation();
  const [doctors, setdoctors] = useState([]);
  const [Hopitals, setHospitals] = useState([1, 2, 3]);
  const { userLogIn } = useContext(UserContext);
  const [searchdoctors, setsearchdoctors] = useState([]);

  const checkdata = async () => {
    const token = await AsyncStorage.getItem("patienttoken");
    if (!token) {
      return navigation.navigate("Signup")
    }
  }


  const handleSearchdoctor = async (text) => {
    const res = await axiosClient.get(`/v2/getAllDoctorWithAllQuery?userInput=${text}`)
    // console.log(res?.data?.result)
    setsearchdoctors(res?.data?.result)
  }

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure, want to exit this app ?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "yes",
        onPress: () => BackHandler.exitApp()
      }
    ])
    return true;
  }






  useFocusEffect(
    useCallback(() => {
      checkdata()
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
      return () => backHandler.remove()
    }, [])
  );
  const gethospitalsdata = async () => {
    const res2 = await axiosClient.get('/v2/getHotspitalsDoctorForHomeScreen')
    setHospitals(res2?.data?.result)
  }
  useFocusEffect(
    useCallback(() => {
      gethospitalsdata()
    }, [])
  );

  const getdoctorsdata = async () => {
    const res = await axiosClient.get('/v2/getusergetalldoctors');
    if (res) {
      setdoctors(res?.data?.result);
    } else {
      console.log(res);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getdoctorsdata()
    }, [userLogIn?.user?._id])
  );



  return (
    <>

      <View style={{ paddingHorizontal: 16, flex: 1, backgroundColor: '#ffffff', width: windowwidth , paddingVertical:16}}>

        <View
          style={{
            width: '100%',
            paddingVertical: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              paddingVertical: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Location')}>
              <Image
                source={require('../Assets/location.png')}
                style={{ width: 18, height: 24 }}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Location')}>
              <View
                style={{
                  backgroundColor: '#DCE3F6',
                  width: 100,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{ color: '#383838', fontSize: 16, padding: 4 }}>Location</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            userLogIn?.token ?
              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Profile')}
                  style={{ backgroundColor: '#DCE3F6', borderRadius: 30 }}>
                  <Image
                    source={{
                      uri: userLogIn?.user?.imgurl ? userLogIn?.user?.imgurl :
                        "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba"
                    }}
                    style={{ width: 42, height: 42, borderRadius: 40 }}></Image>
                </TouchableOpacity>
              </View> :
              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('loginWithEmail')}
                  style={{ backgroundColor: '#DCE3F6', borderRadius: 100 }}>
                  <Image
                    source={require('../Assets/question.png')}
                    style={{ width: 48, height: 44, borderRadius: 100 }}></Image>
                </TouchableOpacity>
              </View>
          }

        </View>


        <ScrollView >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              borderRadius: 30,
              paddingHorizontal: 16,
              backgroundColor: "#DCE3F6",
              marginVertical:13
            }}
          >
            <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
            <TextInput
              placeholder="Search Doctors"
              onChange={(text) => handleSearchdoctor(text)}
              placeholderTextColor="#706D6D"
              style={{ color: "#706D6D", width: '100%', fontWeight:'600' , fontSize:13}}
            />
          </View>

          <View>
            <View style={{gap:2,marginVertical:10}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#383838',
                }}>
                Feeling Sick?
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#706D6D',
                }}>
                Treat symptoms with top specialities
              </Text>
            </View>

            {
              searchdoctors.length > 0 ? (
                <View style={{
                  gap: 10,
                  flexWrap: 'wrap',
                  width: windowwidth,
                  flexDirection: 'row',
                  marginVertical: 15,
                }}>
                  {searchdoctors.length > 0 ?
                    searchdoctors.map((item, i) => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() =>
                          navigation.navigate('DoctorProfilePage', {
                            doctorid: item._id,
                          })
                        }
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: 'center',
                          width: "43%"
                        }}
                      >
                        <Image
                          source={{
                            uri: item.imgurl
                              ? item.imgurl
                              : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                          }}
                          style={{ height: 100, width: 100, borderRadius: 20 }}></Image>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 16,
                            marginTop: 9,
                            color: '#383838',
                          }}>
                          {item.nameOfTheDoctor}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 13,
                            color: '#706D6D',
                          }}>
                          Exprience : {item.yearOfExprience} years
                        </Text>
              
                      </TouchableOpacity>
                    )) : (
                      <View>
                        <Text style={{ color: "blue", fontSize: 15, fontWeight: '600', textAlign: "center" }}>Doctor is Loading</Text>
                      </View>
                    )
                  }
                </View>
              ) : (
                <></>
              )




            }

            <View>
{/* 
              <View style={{
                width: "100%", height: 120, backgroundColor: "#DCE3F6", display: "flex", alignItems: "center", borderRadius: 5,
                shadowColor: 'gray', elevation: 7, opacity: 0.8, shadowRadius: 5, flexDirection: "row", marginBottom: 5, paddingRight: 10, justifyContent: 'center'
              }}>
                <ScrollView horizontal>
                  {
                    category.map((item) => (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => navigation.navigate('Category', {
                          category: item.key
                        })}
                        style={{ justifyContent: "center", alignItems: "center", }}>
                        <Image source={item?.image} style={{ width: 80, height: 80 }} />
                        <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12, textAlign: 'center', height: 40 }}>{item.key}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View> */}


<View style={{ width: "100%", height: 241, backgroundColor: "#DCE3F6", display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flex: 1 }}>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/diabetesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Diabetes</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/Fever.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Fever</Text>
                            </View>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/pregnancynew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Pregnancy</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bp.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bp</Text>
                            </View>

                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flex: 1 }} >

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bonesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bones</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/eyesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Eyes</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/toothachenew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Toothache</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bodyachenew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bodyache</Text>
                            </View>

                        </View>
                    </View>


              <TouchableOpacity

                onPress={() => navigation.navigate('Doctors', {
                  screen: 'Searchdoctor',
                  params: { value: 'AllCategories' },
                })}>
                <View
                  style={{
                    backgroundColor: '#1F51C6',
                    paddingVertical: 16,
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{ fontWeight: '600', fontSize: 16, color: '#ffffff' }}>
                   Book Appointment
                  </Text>
                </View>
              </TouchableOpacity>
            </View>





            <View >
              <Text style={{fontSize:18, fontWeight:'700', color:'#383838',  paddingTop:10, paddingBottom:6}}>Find Doctors</Text>
              <View
                style={{
                  gap: 15,
                  flexWrap: 'wrap',
                  width: windowwidth,
                  flexDirection: 'row',
                  margin: 10,
                }}
              >
                {
                  doctors.length > 0 ?
                    doctors.slice(0, 4).map((item, i) => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() =>
                          navigation.navigate('DoctorProfilePage', {
                            doctorid: item._id,
                          })
                        }
                        style={{
                          flexDirection: "column",
                          // alignItems: "center",
                          justifyContent: 'center',
                          width: "43%",
                          
                        }}
                      >
                        <Image
                          source={{
                            uri: item.imgurl
                              ? item.imgurl
                              : 'https://th.bing.com/th/id/R.307c588a1e7b89889034e195d8e16d43?rik=wamzqu6ozFnjjw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f210000%2fvelka%2fdoctor-1490804643Rfi.jpg&ehk=xVsfwkQ4RsL0lPNklpn0uYssY%2fJJqHho%2bhw1KPmGMXU%3d&risl=&pid=ImgRaw&r=0',
                          }}
                          style={{ height: 200, width: 200, borderRadius:5, objectFit: 'contain' }} />
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 16,
                            marginTop: 9,
                            color: '#383838',
                          }}>
                          {item.nameOfTheDoctor}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 13,
                            color: '#706D6D',
                          }}>
                          {item.speciality}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 13,
                            color: '#706D6D',
                          }}>
                          Exprience : {item.yearOfExprience} years
                        </Text>
                        
                      </TouchableOpacity>
                    )) : (
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: windowwidth }}>
                        <ActivityIndicator size='large' color='#1F51C6' />
                      </View>
                    )
                }
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Doctors', {
                  screen: 'Searchdoctor',
                  params: { value: 'AllDoctors' },
                })}>
                <View
                  style={{
                    backgroundColor: '#1F51C6',
                    paddingVertical: 16,
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{ fontWeight: '600', fontSize: 16, color: '#ffffff' }}>
                    Find Doctors
                  </Text>
                </View>
              </TouchableOpacity>
            </View>








            <View>
              <Text style={{fontSize:18, fontWeight:'700', color:'#383838', paddingTop:19, paddingBottom:6}}>Hospitals  near you</Text>
              <View style={{
                gap: 12,
                flexWrap: 'wrap',
                width: windowwidth,
                flexDirection: 'row',
                columnGap:15,
              }}>
                {Hopitals.length > 0 ?
                  Hopitals.slice(0, 4).map((item, i) => (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() =>
                        navigation.navigate('AllDoctorswithHospital', {
                          HospitalId: item._id,
                        })
                      }
                      style={{
                        flexDirection: "column",
                        // alignItems: "center",
                        width: "46%",
                        borderRadius: 5,
                        paddingVertical: 10,

                      }}
                    >
                      <Image
                        source={{
                          uri: item?.imgurl ? item?.imgurl :
                            "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba"
                        }}
                        style={{ height: 200, width: 200, borderRadius: 5, marginTop: 5, objectFit: 'contain' }}></Image>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 16,
                          marginTop: 5,
                          color: '#383838',
                        }}>
                        {item?.nameOfhospitalOrClinic}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 13,
                          color: '#706D6D',
                        }}>
                        {item?.location}
                      </Text>

                    </TouchableOpacity>
                  )) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: windowwidth }}>
                      <ActivityIndicator size='large' color='#1F51C6' />
                    </View>
                  )
                }
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Doctors', {
                  screen: 'SelectDoctor',
                  // params: { value: 'AllHospitals' },
                })}>
                <View
                  style={{
                    backgroundColor: '#1F51C6',
                    paddingVertical: 16,
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginBottom:16
                  }}>
                  <Text
                    style={{ fontWeight: '700', fontSize: 15, color: '#FFFFFF' }}>
                    View  All 
                  </Text>
                </View>
              </TouchableOpacity>

            </View>


            {/* <View>
              <View style={{
                gap: 10,
                marginVertical: 15,
              }}>
                {Hopitals.length > 0 ?
                  Hopitals.slice(0, 4).map((item, i) => (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() =>
                        navigation.navigate('AllDoctorswithHospital', {
                          HospitalId: item._id,
                        })}
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        padding:2
                      }}
                    >

                      <ImageBackground source={{ uri: item?.imgurl ? item?.imgurl : "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba" }}
                                   blurRadius={0.3}
                                   style={{ height: 250, width: '100%', borderRadius: 5,objectFit:'contain', }}
                      >
                        <ScrollView >
                          <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: "center", height: 200, gap: 5, }}>
                            {
                              item?.doctors?.length > 0 && item?.doctors?.map((data) => (
                                <Image
                                  key={data._id}
                                  source={{ uri: data?.imgurl ? data?.imgurl : "https://d26dtlo3dcke63.cloudfront.net/67c30e16c91a42ff9f30f84959a0ce1be155b24d8bbe14583d51cbfcc430fdba" }}
                                  style={{ height: 80, width: '30%', borderRadius: 20, objectFit: 'contain', }}>
                                </Image>
                              ))
                            }
                          </View>
                        </ScrollView>

                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 17,
                            marginVertical: 2,
                            color: '#FFFFFF',
                            textAlign: 'center'
                          }}>
                          {item?.nameOfhospitalOrClinic}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 15,
                            marginBottom: 2,
                            color: '#F5F5F5',
                            textAlign: 'center'
                          }}>
                          {item?.location}
                        </Text>
                      </ImageBackground>

                    </TouchableOpacity>
                  )) : (
                    <View style={{justifyContent:'center', alignItems:'center', width:windowwidth}}>
                    <ActivityIndicator size='large' color='#1F51C6' />
                  </View>
                  )
                }
              </View>

              <TouchableOpacity

                onPress={() => navigation.navigate('Doctors', {
                  screen: 'Searchdoctor',
                  params: { value: 'AllHospitalWithDoctors' },
                })}
              >
                <View
                  style={{
                    backgroundColor: '#1F51C6',
                    paddingVertical: 12,
                    marginVertical: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{ fontWeight: '700', fontSize: 15, color: '#ffffff' }}>
                    View  All Hospitals with Doctors
                  </Text>
                </View>
              </TouchableOpacity>

            </View> */}
          </View>
        </ScrollView>
      </View>


    </>
  );
};

export default Index;


