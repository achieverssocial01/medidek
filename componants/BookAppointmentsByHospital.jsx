import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import UserContext from './Context/userContext';
import { axiosClient } from './utils/axiosClient';

const Height = Dimensions.get('screen').height;

const BookAppointmentsByHospital = () => {

  const {userLogIn,doctorDetail} = useContext(UserContext);
  const navigation = useNavigation();
  const [dates, setDates] = useState([]);
  const [selecteddate, setselecteddate] = useState({
    currentDate: moment().format("YYYY-MM-DD"),
    index:0,
  });
  const [slotLoading, setSlotsLoading] = useState(false);
  const [isfocus, setisfocusg] = useState(false);
  const [slotData, setSlotData] = useState([]);
  const [error, setError] = useState(false);
  const [field, setField] = useState('Select Timing');

  const [inputValue, setInputValue] = useState({
    name:  '',
    age: '',
    gender:  '',
    phone:'',
    email: userLogIn?.user?.email || '',
    AppointmentNotes: '',
    appointmentDate: selecteddate.currentDate,
    AppointmentTime:'',
    doctorid: doctorDetail?._id,
    userid: userLogIn?.user?._id,
    role: userLogIn?.user?.role,
  });

  const getWeekDates = () => {
    const monthStart = moment().startOf('day');
    const monthsDates = [];
    for (let i = 0; i < 7; i++) {
      const date = monthStart.clone().add(i, 'days');
      monthsDates.push({
        day: date.format('ddd').toUpperCase(),
        date: date.format('DD').toUpperCase(),
        month: date.format('MMM').toUpperCase(),
        year: date.format('YYYY').toUpperCase(),
      });
    }
    setDates(monthsDates);
  };
  useEffect(() => {
    getWeekDates();
  }, []);

  const handleSelectedDate = (item, index) => {
    setselecteddate({
      ...selecteddate,
      index,
      currentDate: moment(
        `${item.year}-${item.month}-${item.date}`,
        'YYYY-MMM-DD',
      ).format('YYYY-MM-DD'),
    });
  };

useEffect(()=>{
   getAvailableSlots()
},[selecteddate?.currentDate])

  const getAvailableSlots = async () => {
    try {
      setSlotsLoading(true);
      const response = await axiosClient.get(
        `/v2/getAvailbleSlotsForAnUser/${doctorDetail?._id}/${selecteddate.currentDate}`,
      );
      if (response.data.status === 'ok') {
        setSlotsLoading(false);
        setSlotData(response?.data?.result);
        if(response?.data?.result?.length==1){
          setField(response.data.result[0])
        }
        else{
          setField("Select Timing");
        }
        return;
      }
    } catch (error) {
      setSlotsLoading(false);
      console.log(error);

    }
  };


  const handleSubmit = async () => {
    if (
      !inputValue.name ||
      !inputValue.age ||
      !inputValue.gender ||
      !inputValue.phone ||
      !inputValue.AppointmentNotes ||
      !selecteddate.currentDate ||
      !inputValue.AppointmentTime 

    ) {
      return setError(true);
    }
    try {
      const response = await axiosClient.post('/v2/bookAppointment', {
        doctorid:inputValue?.doctorid,
        userid:inputValue?.userid,
        name:inputValue?.name,
        age:inputValue?.age,
        gender:inputValue?.gender,
        phone:inputValue?.phone,
        AppointmentNotes:inputValue?.AppointmentNotes,
        appointmentDate:inputValue?.appointmentDate,
        AppointmentTime:inputValue?.AppointmentTime,
        role:inputValue?.role
      });
      console.log(response.data);
      if (response?.data?.status === 'ok') {
        Alert.alert('appointment succesfull');
        navigation.navigate('Home');
      } else {
        Alert.alert(" Your Appointment Already book for this Date  " +inputValue?.appointmentDate)  
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Item = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleSelectedDate(item, index)}
        style={{
          width: 50,
          height: 55,
          backgroundColor: selecteddate.index === index ? '#1F51C6' : '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          marginLeft: 7,
        }}>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
            textAlign: 'center',
          }}>
          {item.day}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
          }}>
          {item.date}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
          }}>
          {item.month}
        </Text>
      </TouchableOpacity>
    );
  };

  const Timing = ({item}) => {
    return (
      <Text style={styles().label}>
        {item.startTime} - {item.endTime}
      </Text>
    );
  };

  return (
    <View style={styles(Height).book}>
      <View >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Select Date
        </Text>
        <FlatList
          data={dates}
          renderItem={({item, index}) => <Item item={item} index={index} />}
          horizontal
          style={styles().dateCardWraper}
        />
      </View>
      {error && !selecteddate.currentDate && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          Please Choose Date
        </Text>
      )}
  
      <Dropdown
        style={styles().dropdown}
        placeholderStyle={styles().placeholderStyle}
        selectedTextStyle={styles().selectedTextStyle}
        inputSearchStyle={styles().inputSearchStyle}
        data={slotData}
        renderItem={item => <Timing item={item} />}
        value={inputValue?.AppointmentTime}
        maxHeight={300}
        placeholder={inputValue?.AppointmentTime ? inputValue?.AppointmentTime :field}
        onFocus={() => setisfocusg(true)}
        onBlur={() => setisfocusg(true)}
        searchPlaceholder="Search..."
        onChange={item => setInputValue({...inputValue,AppointmentTime:`${item.startTime} - ${item.endTime}`})}
      />
      {error && !inputValue?.AppointmentTime && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          Please Select Time
        </Text>
      )}
      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold', marginTop: 20,}}>
          Enter Details
        </Text>
        <View style={styles().formdata}>
          <TextInput
            style={styles().textinputs}
            placeholder="name"
            value={inputValue?.name}
            onChangeText={e => setInputValue({...inputValue, name: e})}
          />
          {error && !inputValue.name && (
            <Text style={{color: 'red'}}>Please Enter Name</Text>
          )}
          <TextInput
            placeholder="age"
            style={styles().textinputs}
            value={inputValue?.age}
            keyboardType="numeric"
            onChangeText={e => setInputValue({...inputValue, age: e})}
          />
          {error && !inputValue.age && (
            <Text style={{color: 'red'}}>Please Enter Age</Text>
          )}
          <TextInput
            placeholder="gender"
            style={styles().textinputs}
            value={inputValue?.gender}
            onChangeText={e => setInputValue({...inputValue, gender: e})}
          />
          {error && !inputValue.gender && (
            <Text style={{color: 'red'}}>Please Enter Gender</Text>
          )}
          <TextInput
            placeholder="phone"
            style={styles().textinputs}
            value={inputValue.phone}
            keyboardType="numeric"
            onChangeText={e => setInputValue({...inputValue, phone: e})}
          />
          {error && !inputValue.phone && (
            <Text style={{color: 'red'}}>Please Enter Phone</Text>
          )}
          <TextInput
            placeholder="appointment notes"
            style={styles().textinputs}
            value={inputValue.AppointmentNotes}
            onChangeText={e =>
              setInputValue({...inputValue, AppointmentNotes: e})
            }
          />
          {error && !inputValue.AppointmentNotes && (
            <Text style={{color: 'red'}}>Please Enter Appointment Notes</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles().submitButton}>
            <Text style={{color: 'white', textAlign: 'center', fontWeight:'600', fontSize:15}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookAppointmentsByHospital;

const styles = Height =>
  StyleSheet.create({
    dateCardWraper: {
      flexDirection: 'row',
      // gap:8,
      marginVertical: 20,
marginLeft:-8
    },
    dateTextStyle: {
      fontSize: 10,
      // color:"blue"
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#1F51C6',
      borderRadius: 10,
      padding: 1,
      // width:"50%",
      // marginLeft:"auto"
    },
    placeholderStyle: {
      fontSize: 15,
      textAlign: 'center',
      color: 'black',
    },
    selectedTextStyle: {
      fontSize: 16,
      textAlign: 'center',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      textAlign: 'center',
    },
    label: {
      zIndex: 999,
      textAlign: 'center',
      paddingHorizontal: 8,
      fontSize: 15,
      color: '#4c4863',
    },
    submitButton: {
      padding: 15,
      backgroundColor: '#1F51C6',
      // color:'white',
      borderRadius: 30,
      width: '80%',
      marginTop: 20,
    },
    formdata: {
      gap: 8,
      color: 'red',
      flexDirection: 'column',
      // justifyContent:'center',
      alignItems: 'center',
    },
    textinputs: {
      width: '100%',
      height: 50,
      borderRadius: 10,
      borderBottomColor: 'gray',
      margin: 2,
      backgroundColor: '#fbfbfb',
    },
    book: {
      gap: 10,
      margin: 10,
      height: Height,
      flexWrap: 'wrap',
      backgroundColor: '#DCE3F6',
    },
  });






