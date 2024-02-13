import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {axiosClient} from '../utils/axiosClient';
import UserContext from '../Context/userContext';
import {useNavigation} from '@react-navigation/native';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

const Book = ({route}) => {
  const {doctorDetail} = route.params;
  const {userLogIn} = useContext(UserContext);
  const navigation = useNavigation();
  const [dates, setDates] = useState([]);

  
  const [selecteddate, setselecteddate] = useState({
    currentDate: moment().format("YYYY-MM-DD"),
    index:0,
  });

  const [time, settime] = useState('');
  const [slotLoading, setSlotsLoading] = useState(false);
  const [isfocus, setisfocusg] = useState(false);
  const [slotData, setSlotData] = useState([]);
  const [error, setError] = useState(false);
  const [field, setField] = useState('Select Timing');
  const [tokenslot,settokenslot]=useState(null)

  const [inputValue, setInputValue] = useState({
    name: userLogIn?.user?.name || '',
    age: userLogIn?.user?.age || '',
    gender: userLogIn?.user?.gender || '',
    phone: userLogIn?.user?.phone || '',
    email: userLogIn?.user?.email || '',
    AppointmentNotes: '',
    appointmentDate:moment().format("YYYY-MM-DD"),
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
    setInputValue({...inputValue,appointmentDate: moment(
      `${item.year}-${item.month}-${item.date}`,
      'YYYY-MMM-DD',
    ).format('YYYY-MM-DD'),})
  };

useEffect(()=>{
   getAvailableSlots()
},[selecteddate?.currentDate])


const getAvailableSlots = async () => {
  try {
     
      setSlotsLoading(true);
      if(doctorDetail?.acceptAppointments === "bySlot"){
        const response = await axiosClient.get(
          `/v2/getAvailbleSlotsForAnUser/${doctorDetail?._id}/${selecteddate?.currentDate}`,
        );

        if (response.data.status === 'ok') {
          setSlotsLoading(false);
          setSlotData(response?.data?.result);
          if(response?.data?.result?.length==1){
            setField(response.data.result[0])
            setInputValue({...inputValue,AppointmentTime:''})
          }
          else{
            setField("Select Timing");
          }
          return;
        }
      }
      else{
        const response= await axiosClient.get(
        `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctorDetail?._id}/${selecteddate?.currentDate}`,
      ); 
      console.log(response.data.result)
      settokenslot(response?.data?.result)
      }
     
      // if (response.data.status === 'ok') {
      //   setSlotsLoading(false);
      //   setSlotData(response?.data?.result);
      //   if(response?.data?.result?.length==1){
      //     setField(response.data.result[0])
      //     setInputValue({...inputValue,AppointmentTime:''})
      //   }
      //   else{
      //     setField("Select Timing");
      //   }
      //   return;
      // }
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
      !selecteddate.currentDate 
    ) {
      return setError(true);
    }
    try {
      if(doctorDetail?.acceptAppointments == "bySlot"){
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
        if (response?.data?.status === 'ok') {
        Alert.alert('appointment succesfull');
        navigation.navigate('Dashbord');
      } else {
        Alert.alert(" Your Appointment Already book for this Date  " +inputValue?.appointmentDate)  
      }
      }
      else{
         const respond= await axiosClient.post('/v2/bookappointmentbytoken', {
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
      })
      if(respond?.data?.status === 'error'){
        Alert.alert(respond?.data?.message)
      }
      else if(respond?.data?.status === 'ok'){
        Alert.alert('appointment succesfull');
        navigation.navigate('Dashbord');
      }
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
          borderRadius: 3,
          marginLeft: 7,
          borderWidth:1,
borderColor:'#D9D9D9'
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
    <ScrollView>
    <View style={styles(Height).book}>
      <View >
        <View style={{flexDirection:"row",justifyContent:"space-between", backgroundColor:'#DCE3F6', borderRadius:5, paddingHorizontal:16, paddingVertical:23}}>
          <View style={{justifyContent:'center'}}>
           <Text
          style={{
            color:'#383838',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
          }}>
         Book Appointment
        </Text>
           <Text
          style={{
            color:'#383838',
            fontSize: 13,
            fontWeight: '700',
            marginTop: 10,
          }}>
        Dr. {doctorDetail?.nameOfTheDoctor}
        </Text>
        </View>
        <Image source={{uri:doctorDetail?.imgurl}} width={70} height={70} borderRadius={100}/>
        </View>
       
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
  
  {
    doctorDetail?.acceptAppointments === "bySlot" ?
    
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

  
  
    : 
    <>
    {/* <Text style={{fontWeight:"800",color:"black",width:"100%"}}>This doctor get appointment by token .You Can Not Select Time </Text> */}
      <View style={{flexDirection:"column",borderRadius:10,justifyContent:"center",paddingLeft:10}}>
      { tokenslot === null &&
      <Text 
         style={{color: 'red', textAlign: 'center',fontSize:20}}
         >
           Doctor Not Available for appointment
         </Text>  
         }
         {
      !tokenslot?.Starttime1 || !tokenslot?.Endtime1 &&
          <Text 
          style={{color: 'red', textAlign: 'center',fontSize:25,}}
   >
Doctor Not Available for appointment
   </Text>
         }

    
         <View style={{flexDirection:"row",gap:8,flexWrap:"wrap", marginTop:10,}}>
          {
 tokenslot?.Starttime1 && tokenslot?.Endtime1  ? 
 <Text 
 style={{color: '#FFFFFF', textAlign: 'center',fontSize:13,backgroundColor:"#1F51C6",borderRadius:3,paddingVertical:15.5, paddingHorizontal:9,}}
 >
 {tokenslot?.Starttime1} - {tokenslot?.Endtime1}
 </Text>:""
          }

          {
          tokenslot?.Starttime2 && tokenslot?.Endtime2  && 
          <Text 
          style={{color: '#FFFFFF', textAlign: 'center',fontSize:13,backgroundColor:"#1F51C6",borderRadius:3,paddingVertical:15.5, paddingHorizontal:9,}}
    >
  {tokenslot?.Starttime2}-{tokenslot?.Endtime2}
    </Text>
          }
       
     {
      tokenslot?.Starttime3 && tokenslot?.Endtime3 &&
      <Text
      style={{color: '#FFFFFF', textAlign: 'center',fontSize:13,backgroundColor:"#1F51C6",borderRadius:3,paddingVertical:15.5, paddingHorizontal:9,}}
      >
  {tokenslot?.Starttime3}-{tokenslot?.Endtime3}
      </Text> 
     }
        </View>
      </View>
      </>

  }
    
<View style={{marginVertical:16, width:Width, marginHorizontal:-20}}>
    <View style={{
borderStyle: 'dashed',
borderWidth: 1,
borderColor:'#D9D9D9'
}}>
</View>
</View>





      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20, color:'#383838', marginLeft:10}}>
          Enter Details
        </Text>
        <View style={styles().formdata}>
          <View style={{flexDirection:'row',}}>
          <Text style={{fontSize:15, fontWeight:'600', color:'#383838'}}>Name</Text>
          <Text style={{fontSize:15, fontWeight:'600', color:'#EA4335'}}>*</Text>
          
          </View>
          <TextInput
            style={styles().textinputs}
            placeholder="name"
            editable={doctorDetail?.acceptAppointments == "bySlot" ? inputValue?.AppointmentTime ? true :false : tokenslot ==null ? false :true}
            value={inputValue?.name}
            onChangeText={e => setInputValue({...inputValue, name: e})}
          />
         
          {error && !inputValue.name && (
            <Text style={{color: 'red'}}>Please Enter Name</Text>
          )}

<View style={{flexDirection:'row',}}>
          <Text style={{fontSize:15, fontWeight:'600', color:'#383838'}}>Age</Text>
          <Text style={{fontSize:15, fontWeight:'600', color:'#EA4335'}}>*</Text>
          
          </View>
          <TextInput
            placeholder="age"
            style={styles().textinputs}
            editable={doctorDetail?.acceptAppointments == "bySlot" ? inputValue?.AppointmentTime ? true :false :tokenslot ==null ? false :true}
            value={inputValue?.age}
            keyboardType="numeric"
            onChangeText={e => setInputValue({...inputValue, age: e})}
          />
          {error && !inputValue.age && (
            <Text style={{color: 'red'}}>Please Enter Age</Text>
          )}

<View style={{flexDirection:'row',}}>
          <Text style={{fontSize:15, fontWeight:'600', color:'#383838'}}>Gender</Text>
          <Text style={{fontSize:15, fontWeight:'600', color:'#EA4335'}}>*</Text>
          
          </View>
          <TextInput
            placeholder="gender"
            editable={doctorDetail?.acceptAppointments == "bySlot" ? inputValue?.AppointmentTime ? true :false :tokenslot ==null ? false :true}
            style={styles().textinputs}
            value={inputValue?.gender}
            onChangeText={e => setInputValue({...inputValue, gender: e})}
          />
          {error && !inputValue.gender && (
            <Text style={{color: 'red'}}>Please Enter Gender</Text>
          )}

<View style={{flexDirection:'row',}}>
          <Text style={{fontSize:15, fontWeight:'600', color:'#383838'}}>Phone Number</Text>
          <Text style={{fontSize:15, fontWeight:'600', color:'#EA4335'}}>*</Text>
          
          </View>
          <TextInput
            placeholder="phone"
            style={styles().textinputs}
            value={inputValue.phone}
            editable={doctorDetail?.acceptAppointments == "bySlot" ? inputValue?.AppointmentTime ? true :false :tokenslot ==null ? false :true}
            keyboardType="numeric"
            onChangeText={e => setInputValue({...inputValue, phone: e})}
          />
          {error && !inputValue.phone && (
            <Text style={{color: 'red'}}>Please Enter Phone</Text>
          )}

<Text style={{fontSize:15, fontWeight:'600', color:'#383838'}}>Appointments Notes</Text>

          <TextInput
            placeholder="appointment notes"
            style={styles().textinputs}
            value={inputValue.AppointmentNotes}
            onChangeText={e =>
              setInputValue({...inputValue, AppointmentNotes: e})
            }
          />
        </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles().submitButton}>
            <Text style={{color: '#FFFFFF', textAlign: 'center', fontWeight:'600', fontSize:15}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
    </ScrollView>
  );
};

export default Book;

const styles = Height =>
  StyleSheet.create({
    dateCardWraper: {
      flexDirection: 'row',
      // gap:8,
      marginVertical: 20,
// marginLeft:-8,

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
      paddingVertical: 16,
      backgroundColor: '#1F51C6',
      // color:'white',
      borderRadius: 30,
      width: '100%',
     marginBottom:80
    },
    formdata: {
      gap: 8,
      flexDirection: 'column',
      borderWidth:1,
      borderRadius:5,
      borderColor:'#D9D9D9', 
      margin:10, 
      padding:16, 
    },
    textinputs: {
      width: '100%',
      height: 50,
      borderRadius:4,
      backgroundColor: '#D9D9D95E',
      borderWidth:1,
      borderColor:'#D9D9D9',
     color:'#706D6D',
     fontWeight:'500',
     fontSize:13,
     marginTop:-4, 
     marginBottom:8
     
     
    },
    book: {
      // height: Height,
      flexWrap: 'wrap',
      backgroundColor: '#FFFFFF',
      padding:10,
      marginVertical:10
    },
  });
