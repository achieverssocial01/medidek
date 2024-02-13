import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import UserContext from './Context/userContext';
import { axiosClient } from './utils/axiosClient';
import Data2 from './Data2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DropDown2 = () => {




  const [dates, setDates] = useState([]);
  const { userLogIn,values2,setvalues2,selecteddate, setselecteddate } = useContext(UserContext)
  // const [] = useState({
  //   currentDate: moment().format("YYYY-MM-DD"),
  //   index: 0,
  // });








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



  useEffect(() => {
    getWeekDates();
  }, []);



  const Item = ({ item, index }) => {
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
          borderWidth: 1,
          borderColor: '#D9D9D9',
          gap: 1,
        }}>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
            textAlign: 'center',
            fontWeight: "800"
          }}>
          {item.day}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
            fontWeight: "800"
          }}>
          {item.date}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: selecteddate.index === index ? '#ffffff' : '#383838',
            fontWeight: "800"
          }}>
          {item.month}
        </Text>
      </TouchableOpacity>

    );
  };





  const [isfocus, setisfocusg] = useState(false);
  const [time, settime] = useState('');
  const [slotDurationTime, setSlotDurationTime] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [field, setField] = useState('Select Timing');
  const [numOfStartTimes, setNumOfStartTimes] = useState(0);
  const [save, setsave] = useState(false)



  const [slotDuration, setSlotDuration] = useState("15 min");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimes, setEndTimes] = useState([]);

  const [startTime2, setStartTime2] = useState("");
  const [startTimes2, setStartTimes2] = useState([]);
  const [endTime2, setEndTime2] = useState("");
  const [endTimes2, setEndTimes2] = useState([]);

  const [startTime3, setStartTime3] = useState("");
  const [startTimes3, setStartTimes3] = useState([]);
  const [endTime3, setEndTime3] = useState("");
  const [endTimes3, setEndTimes3] = useState([]);
  const [reload, setreload] = useState(false);

 
  const [data, setdata] = useState(false);
  const [isdata, setisdata] = useState(false)







  const getdatewisedata = async () => {
    const res = await axiosClient.get(`v2/getSlotDetailForDoctorForPerticularDate/${userLogIn?.user?._id}/${selecteddate?.currentDate}`);
    if (res.data?.status == "ok" && res.data?.result !== null) {
      setvalues2({
        ...values2,
        Endtime1: res.data?.result?.Endtime1,
        Endtime2: res.data?.result?.Endtime2,
        Endtime3: res.data?.result?.Endtime3,
        Starttime1: res.data?.result?.Starttime1,
        Starttime2: res.data?.result?.Starttime2,
        Starttime3: res.data?.result?.Starttime3
      })
      setisdata(true)
      setdata(true)
    }
    else {
      setvalues2({})
      setisdata(false)
      setdata(true)
    }
  }
  useEffect(() => {
    getdatewisedata()
  }, [selecteddate?.currentDate])











  const slotDurations = [15, 30, 45, 60];

  const generateStartTimes = () => {
    const timestamps = [];
    const totalMinutesInDay = 24 * 60;

    for (
      let minute = 0;
      minute < totalMinutesInDay;
      minute += slotDuration
    ) {
      const hour = Math.floor(minute / 60);
      const minutePart = minute % 60;

      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minutePart.toString().padStart(2, "0");

      const timestamp = `${formattedHour}:${formattedMinute}`;
      timestamps.push(timestamp);
    }

    return timestamps;
  };



  const startTimes = generateStartTimes();

  useEffect(() => {

    const start = new Date(`2023-01-01T${startTime}:00`);
    userLogIn?.user?.acceptAppointments === "bySlot" ? (
      start.setMinutes(start.getMinutes() + slotDuration)
    ) : (
      start.setMinutes(start.getMinutes() + "00")
    )
    const generatedEndTimes = [];
    let currentTime = new Date(`2023-01-01T${startTime}:00`);

    while (currentTime < new Date(`2023-01-01T11:59:00`)) {
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      generatedEndTimes.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          formatMatcher: "basic",
        })
      );
    }
    setEndTimes(generatedEndTimes);
  }, [slotDuration, startTime]);






  useEffect(() => {
    const start = new Date(`2023-01-01T${startTime3}:00`);
    start.setMinutes(start.getMinutes() + slotDuration);
    const generatedEndTimes3 = [];
    let currentTime = new Date(`2023-01-01T${startTime3}:00`);
    while (currentTime < new Date(`2023-01-01T11:59:00`)) {
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      generatedEndTimes3.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    setEndTimes3(generatedEndTimes3);

  }, [startTime3, numOfStartTimes === 2]);






  useEffect(() => {
    const start = new Date(`2023-01-01T${startTime2}:00`);
    start.setMinutes(start.getMinutes() + slotDuration);
    const generatedEndTimes2 = [];
    let currentTime = new Date(`2023-01-01T${startTime2}:00`);
    while (currentTime < new Date(`2023-01-01T11:59:00`)) {
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      generatedEndTimes2.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    setEndTimes2(generatedEndTimes2);


  }, [startTime2, numOfStartTimes === 1]);






  useEffect(() => {
    const start = new Date(`2023-01-01T${endTime2}:00`);
    start.setMinutes(start.getMinutes() + slotDuration);

    const genratedStartTimes3 = [];
    let currentTime = new Date(`2023-01-01T${endTime2}:00`);
    while (currentTime < new Date(`2023-01-01T11:59:00`)) {
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      genratedStartTimes3.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    setStartTimes3(genratedStartTimes3);
  }, [endTime2, numOfStartTimes === 2]);





  useEffect(() => {
    const start = new Date(`2023-01-01T${endTime}:00`);

    start.setMinutes(start.getMinutes() + slotDuration);
    const genratedStartTimes2 = [];
    let currentTime = new Date(`2023-01-01T${endTime}:00`);
    while (currentTime < new Date(`2023-01-01T11:59:00`)) {
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      genratedStartTimes2.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }

    setStartTimes2(genratedStartTimes2);

  }, [endTime, numOfStartTimes === 1]);







  const Timing = ({ item }) => {
    return (
      <Text style={styles.label}>
        {item} min
      </Text>
    );
  };

  const saved = async () => {
    const res = await axiosClient.post("/v2/creatSlotForDoctor", {
      slotduration: slotDuration,
      Starttime1: startTime,
      Endtime1: endTime,
      Starttime2: startTime2,
      Endtime2: endTime2,
      Starttime3: startTime3,
      Endtime3: endTime3,
      isholiday: false,
      date: selecteddate?.currentDate,
      doctorid: userLogIn?.user?._id
    })
    if (res.data.status == "ok") {
      getdatewisedata()
      setStartTime("")
      setEndTime("")
      setStartTime2("")
      setEndTime2("")
      setStartTime3("")
      setEndTime3("")
      setreload(true)
    }
    else {
      Alert.alert("something went wrong")
    }
  }


  return (

    <>

      <ScrollView>
        <View style={{ backgroundColor: "#FFFFFF", width: windowWidth, height: windowHeight }}>

          <KeyboardAvoidingView>

            <ScrollView automaticallyAdjustKeyboardInsets={true}>
              <View style={{ backgroundColor: "#FFFFFF" }}>
                <FlatList
                  data={dates}
                  renderItem={({ item, index }) => <Item item={item} index={index} />}
                  horizontal
                  style={styles.dateCardWraper}
                />
              </View>
            </ScrollView>

            {
              isdata && data ?
                <Data2 values={values2} />
                :
                <View style={{ margin: 15 }}>
                  <>
                    <Text style={{ fontWeight: "900", fontSize: 15, padding: 5 }}>Choose slotDuration</Text>
                    <Dropdown
                      data={slotDurations}
                      renderItem={item => <Timing item={item} />}
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      searchPlaceholder="Search..."
                      onChange={item => setSlotDuration(item)}
                      placeholder={slotDuration ? slotDuration : field}
                      value={slotDuration}
                      maxHeight={300}
                      disable={save ? true : false}
                      onFocus={() => setisfocusg(true)}
                      onBlur={() => setisfocusg(true)}
                    />
                  </>

                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose startTime</Text>

                  <Dropdown
                    data={startTimes}
                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setStartTime(item)}
                    placeholder={startTime ? startTime : field}
                    value={startTime}
                    maxHeight={300}
                    disable={save ? true : false}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}
                  />
                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose endTime</Text>
                  <Dropdown data={endTimes}


                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setEndTime(item)}
                    placeholder={endTime ? endTime : field}
                    value={endTime}
                    disable={save ? true : false}
                    maxHeight={300}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}

                  />

                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose startTime 2</Text>
                  <Dropdown data={startTimes2}

                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    disable={save ? true : false}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setStartTime2(item)}
                    placeholder={startTime2 ? startTime2 : field}
                    value={startTime2}
                    maxHeight={300}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}

                  />
                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose endTime 2</Text>
                  <Dropdown data={endTimes2}

                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    disable={save ? true : false}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setEndTime2(item)}
                    placeholder={endTime2 ? endTime2 : field}
                    value={endTime2}
                    maxHeight={300}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}


                  />
                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose startTime 3</Text>
                  <Dropdown data={startTimes3}
                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    disable={save ? true : false}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setStartTime3(item)}
                    placeholder={startTime3 ? startTime3 : field}
                    value={startTime3}
                    maxHeight={300}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}


                  />
                  <Text style={{ fontWeight: "700", fontSize: 15, padding: 5 }}>Choose endTime 3</Text>

                  <Dropdown data={endTimes3}


                    renderItem={item => <Timing item={item} />}
                    style={styles.dropdown}
                    disable={save ? true : false}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    searchPlaceholder="Search..."
                    onChange={item => setEndTime3(item)}
                    placeholder={endTime3 ? endTime3 : field}
                    value={endTime3}
                    maxHeight={300}
                    onFocus={() => setisfocusg(true)}
                    onBlur={() => setisfocusg(true)}

                  />
                  <TouchableOpacity onPress={saved} style={{ backgroundColor: '#1F51C6', height: 50, borderRadius: 30, justifyContent: "center", margin: 15 }}>
                    <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 19, fontWeight: '800' }}>Save</Text>
                  </TouchableOpacity>
                </View>

            }


          </KeyboardAvoidingView>

        </View>
      </ScrollView>
    </>
  )
}

export default DropDown2

const styles = StyleSheet.create({
  dateCardWraper: {
    flexDirection: 'row',
    // gap:8,
    marginTop: 20,
  },
  dateTextStyle: {
    fontSize: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 5,
    margin: 4,
    width: "100%",



  },
  placeholderStyle: {
    fontSize: 20,
    marginLeft: 15,
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
    fontSize: 25,
    color: '#4c4863',
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'blue',
    // color:'white',
    borderRadius: 5,
    width: '60%',
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
    width: '90%',
    height: 40,
    borderRadius: 10,
    borderBottomColor: 'gray',
    margin: 2,
    backgroundColor: '#fbfbfb',
  },
  book: {
    gap: 10,
    // marginTop: 20,
    flexWrap: 'wrap',
    backgroundColor: '#DCE3F6',
  },
});