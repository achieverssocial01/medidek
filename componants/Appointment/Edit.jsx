import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import moment from 'moment'
import { Dropdown } from "react-native-element-dropdown"
import { axiosClient } from '../utils/axiosClient'
import UserContext from '../Context/userContext'
import { useNavigation } from '@react-navigation/native'



const Edit = ({ inputValue,setInputValue,setedit, appointmentId ,setShowAppointment}) => {
    const navigation = useNavigation()
    const [dates, setDates] = useState([])
    const userday = moment(inputValue.appointmentDate).format("DD")
            const userindex = dates.findIndex((obj) => obj.date === userday);
   
    const [time, settime] = useState("");
    const [slotLoading, setSlotsLoading] = useState(false)
    const [isfocus, setisfocusg] = useState(false)
    const [slotData, setSlotData] = useState([])
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)
     const [selecteddate, setselecteddate] = useState({
        currentDate: "",
        index:userindex,
    })


  


    const getWeekDates = () => {
        const monthStart = moment().startOf("day");
        const monthsDates = [];
        for (let i = 0; i < 7; i++) {
            const date = monthStart.clone().add(i, "days");
            monthsDates.push({
                day: date.format("ddd").toUpperCase(),
                date: date.format("DD").toUpperCase(),
                month: date.format("MMM").toUpperCase(),
                year: date.format("YYYY").toUpperCase(),
            });
        }
        setDates(monthsDates);
    };
  

    const selectindex =()=>{
        if(inputValue.appointmentDate){
            const userday = moment(inputValue.appointmentDate).format("DD")
            const userindex = dates.findIndex((obj) => obj.date === userday);
            setselecteddate({...selecteddate,index:userindex})
        }
    }


  useEffect(() => {
        getWeekDates();
        selectindex();
    }, [])

    const handleSelectedDate = (item, index) => {
console.log(item)
        setselecteddate({ ...selecteddate, index, currentDate: moment(`${item.year}-${item.month}-${item.date}`, "YYYY-MMM-DD").format("YYYY-MM-DD") })
        setInputValue({ ...inputValue, appointmentDate: moment(`${item.year}-${item.month}-${item.date}`, "YYYY-MMM-DD").format("YYYY-MM-DD") })

        // getAvailableSlots();
    }

    useEffect(() => {
        getAvailableSlots();
    }, [selecteddate.currentDate])

    const getAvailableSlots = async () => {
        try {
            setSlotsLoading(true);
            const response = await axiosClient.get(
                `/v2/getAvailbleSlotsForAnUser/${inputValue?.doctorid}/${selecteddate.currentDate}`
            );
            if (response.data.status === "ok") {
                setSlotsLoading(false);
                setSlotData(response.data.result);
                
                return;
            }
        } catch (error) {
            setSlotsLoading(false);
            console.log(error.message);
        }
    };

    const handleEditAppointment = async () => {
        if (
            !inputValue.name ||
            !inputValue.age ||
            !inputValue.gender ||
            !inputValue.phone ||
            !inputValue.AppointmentNotes ||
            !inputValue.AppointmentTime ||
            !inputValue.appointmentDate
        ) {
            return setError(true);
        }
        try {
            const response = await axiosClient.put(
                `/v2/editAppointment/${appointmentId}`,
                {
                    AppointmentNotes:inputValue?.AppointmentNotes,
                    AppointmentTime:inputValue?.AppointmentTime,
                    age:inputValue?.age,
                    appointmentDate:inputValue?.appointmentDate,
                    doctorid:inputValue?.doctorid,
                    gender:inputValue?.gender,
                    name:inputValue?.name,
                    phone:inputValue?.phone,
                    status:inputValue?.status,
                    userid:inputValue?.userid
                }
            );
            if (response.data.status === 'ok') {
                Alert.alert("appointment succesfull")
                setedit(false)
                setShowAppointment(false)
                navigation.navigate('UpcomingAppointment')
            }
            else {
                ToastAndroid.show('Appintment alread', ToastAndroid.SHORT);
                setedit(false)
                setShowAppointment(false)
                navigation.navigate('UpcomingAppointment')
            }
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }

        // console.log("api call ho gyi", inputValue);
    }


    // console.log(slotData);
    // useEffect(() => {
    //     getAvailableSlots();
    // }, [bookingAppointmentDetails.appointmentDate]);

    const Item = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => handleSelectedDate(item, index)} style={
                {
                    width: 50,
                    height: 55,
                    backgroundColor: selecteddate.index === index ? "#0000FF" : "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    marginLeft: 7,
                }}>
                <Text style={{
                    fontSize: 10,
                    color: selecteddate.index == index ? "#ffffff" : "#383838",
                }}>{item.day}</Text>
                <Text style={{
                    fontSize: 10,
                    color: selecteddate.index == index ? "#ffffff" : "#383838",
                }}>{item.date}</Text>
                <Text style={{
                    fontSize: 10,
                    color: selecteddate.index == index ? "#ffffff" : "#383838",
                }}>{item.month}</Text>
            </TouchableOpacity>

        )
    }

    const Timing = ({ item }) => {
        return (

            <Text style={styles.label}>{item.startTime} - {item.endTime} </Text>

        )
    }


    return (
        <View style={{ gap: 10 }}>
            <FlatList
                data={dates}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
                horizontal
                style={styles.dateCardWraper}
            />

            {
                error && !selecteddate.currentDate && <Text style={{ color: "red" }}>Please Choose Date</Text>
            }

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={slotData}
                renderItem={(item) => <Timing item={item} />}
                value={inputValue.AppointmentTime}
                //   valueField={time}
                maxHeight={300}
                //   labelField="index"
                //   valueField="startTime"
                placeholder={inputValue.AppointmentTime ? inputValue.AppointmentTime : "select data"}
                onFocus={() => setisfocusg(true)}
                onBlur={() => setisfocusg(true)}
                searchPlaceholder="Search..."
                onChange={(item) => setInputValue({...inputValue, AppointmentTime: `${item.startTime} - ${item.endTime}`})}

            />
            {
                error && !time && <Text style={{ color: "red" }}>Please Select Time</Text>
            }
            <ScrollView >
                <View style={styles.formdata}>
                    <TextInput placeholder='name' value={inputValue.name} onChangeText={(e) => setInputValue({ ...inputValue, name: e })} />
                    {
                        error && !inputValue.name && <Text style={{ color: "red" }}>Please Enter Password</Text>
                    }
                    <TextInput placeholder='age' value={inputValue.age}
                     keyboardType="numeric"
                     onChangeText={(e) => setInputValue({ ...inputValue, age: e })} />
                    {
                        error && !inputValue.age && <Text style={{ color: "red" }}>Please Enter Age</Text>
                    }
                    <TextInput placeholder='gender' value={inputValue.gender} onChangeText={(e) => setInputValue({ ...inputValue, gender: e })} />
                    {
                        error && !inputValue.gender && <Text style={{ color: "red" }}>Please Enter Gender</Text>
                    }
                    <TextInput placeholder='phone' value={inputValue.phone}
                     keyboardType="numeric"
                        onChangeText={(e) => setInputValue({ ...inputValue, phone: e })} />
                    {
                        error && !inputValue.phone && <Text style={{ color: "red" }}>Please Enter Phone</Text>
                    }
                    <TextInput placeholder='appointment notes' value={inputValue.AppointmentNotes} onChangeText={(e) => setInputValue({ ...inputValue, AppointmentNotes: e })} />
                    {
                        error && !inputValue.AppointmentNotes && <Text style={{ color: "red" }}>Please Enter Appointment Notes</Text>
                    }
                    <TouchableOpacity onPress={handleEditAppointment} style={styles.submitButon} >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Edit Appointment</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

export default Edit

const styles = StyleSheet.create({
    dateCardWraper: {
        flexDirection: "row",
        // gap:8,
        marginTop: 20
    },
    dateTextStyle: {
        fontSize: 10,
        // color:"blue"
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        padding: 1,
        // width:"50%",
        // marginLeft:"auto"
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center"
    },
    selectedTextStyle: {
        fontSize: 16,
        textAlign: "center"
    },
    //   iconStyle: {
    //     width: 20,
    //     height: 20,
    //   },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        textAlign: "center"
    },
    label: {
        zIndex: 999,
        textAlign: "center",
        paddingHorizontal: 8,
        fontSize: 15,
    },
    submitButon: {
        padding: 10,
        backgroundColor: 'blue',
        // color:'white',
        borderRadius: 5,

    },
    formdata: {
        gap: 8,
        "placeholder": {
            color: "red"
        },
    }

})
