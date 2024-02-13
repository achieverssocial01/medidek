import React, { useState, useEffect } from "react";
import { View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
// import { UserselectedHospital, Userlocation } from "../Recoil/Atom";
// import { useRecoilState } from "recoil";
import axios from "axios";
const Searchdoctor = (props) => {

    useEffect(() => {
        Getdoctor()
    }, [])

    const [locations, setLocations] = useState([
        { city: "Nagpur" },
        { city: "Wardha" },
        { city: "Chandrapur" },
        { city: "Mumbai" },
    ]);

    const [specialties, setspecialties] = useState([
        { hospital: "eye" },
        { hospital: "Fever" },
        { hospital: "Pregnancy" },
        { hospital: "Bp" },
        { hospital: "Bones" },
        { hospital: "Diabetes" },
        { hospital: "Dentist" },
        { hospital: "Body" },
    ]);


    // const [selectedHopital, setSelectedHopital] = useRecoilState(UserselectedHospital);
    // const [userlocation, setUserLocation] = useRecoilState(Userlocation);

    const [locationSearchText, setLocationSearchText] = useState(userlocation); // Separate state for location search
    const [specialtiesearchText, setspecialtiesearchText] = useState(selectedHopital); // Separate state for hospital search

    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredspecialties, setFilteredspecialties] = useState([]);

    const [isLocationListOpen, setLocationListOpen] = useState(false);
    const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);

    const [Doctor, setDoctor] = useState([])
    const Getdoctor = async () => {
     try {
        const result = await axios.get(`https://medidek-backend-wz4l.onrender.com/v2/getDoctorforSpecialties/abhay?location=${locationSearchText}&speciality=${specialtiesearchText}`)
        setDoctor(result.data.result)
        console.log(result.data);
        console.log(Doctor,"./.././.",locationSearchText ,specialtiesearchText);
     } catch (error) {
        
     }
    }
   
    const handleLocationSearch = (text) => {
        setLocationSearchText(text); // Update location search text
        // Filter the locations based on the input text
        const filtered = locations.filter((location) =>
            location.city.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredLocations(filtered);
        setLocationListOpen(true);
        setSpecialtiesListOpen(false);
    };

    const handlespecialtiesearch = (text) => {
        setspecialtiesearchText(text); // Update hospital search text

        // Filter the specialties based on the input text
        const filtered = specialties.filter((hospital) =>
            hospital.hospital.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredspecialties(filtered);
        setSpecialtiesListOpen(true);
        setLocationListOpen(false);
    };

    const renderLocationItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setLocationSearchText(item.city);
                // setUserLocation(item.city); // Update location search text
                setFilteredLocations([]);
                setLocationListOpen(false);
                Getdoctor()
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
                <Text style={{ padding: 10, color: "black" }}>{item.city}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderHospitalItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
              
                setspecialtiesearchText(item.hospital);
               // Update hospital search text
                setFilteredspecialties([]);
                // setSelectedHopital(item.hospital);
                setSpecialtiesListOpen(false);
                Getdoctor();
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
                <Text style={{ padding: 10, color: "black" }}>{item.hospital}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF" }}>
                {/* Location input */}
                <View >
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            backgroundColor: "#DCE3F6",
                            marginVertical: 10,
                        }}
                    >
                        <Image source={require("../Assets/location.png")} style={{ width: 18, height: 24 }} />
                        <TextInput
                            placeholder="Select your Location"
                            placeholderTextColor="#706D6D"
                            style={{ color: "black" }}
                            value={locationSearchText}
                            onChangeText={handleLocationSearch}
                        />
                    </View>

                    {/* Hospital input */}
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            backgroundColor: "#DCE3F6",
                            marginBottom: 10,
                        }}
                    >
                        <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
                        <TextInput
                            placeholder="Search specialties"
                            placeholderTextColor="#706D6D"
                            style={{ color: "black" }}
                            value={specialtiesearchText}
                            onChangeText={handlespecialtiesearch}
                        />
                    </View>





                </View>
                <View style={{ position: "relative" }}>
                    <View style={{ position: "absolute", top: 2, width: "100%", zIndex: 1 }}>
                        {isLocationListOpen && filteredLocations.length > 0 && (
                            <FlatList
                                data={filteredLocations}
                                renderItem={renderLocationItem}
                                keyExtractor={(item) => item.city}
                                style={{ backgroundColor: "#FFFFFF", width: "50%", borderRadius: 10, paddingHorizontal: 10 }}
                            />
                        )}

                        {/* Render matching specialties */}
                        {isSpecialtiesListOpen && filteredspecialties.length > 0 && (
                            <FlatList
                                data={filteredspecialties}
                                renderItem={renderHospitalItem}
                                keyExtractor={(item) => item.hospital}
                                style={{ backgroundColor: "#FFFFFF", width: "50%", borderRadius: 10, paddingHorizontal: 10 }}
                            />
                        )}
                    </View>
                </View>
                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10 }} >
                    <Text style={{ color: "#383838", fontWeight: "700", fontSize: 18 }}>{selectedHopital}</Text>
                    <View>
                        {/* <Text>Dentists</Text> */}
                        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", gap: 4, backgroundColor: "#D9D9D96E", borderRadius: 20, paddingHorizontal: 6, paddingVertical: 3 }}>
                            <Image source={require("../Assets/Sort-filter-icon.png")}></Image>
                            <Text style={{ color: "#383838" }}>Sort/filter</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ marginTop: 4, zIndex: -1 }}>
                    {Doctor.map((item, i) => (
                        <View
                            style={{
                                backgroundColor: "#fff",
                                opacity: 43,
                                marginTop: 5,
                                paddingHorizontal: 6,
                                borderRadius: 10,
                                paddingVertical: 8,
                                borderColor: "#D9D9D9",
                                borderWidth: 1,
                            }}
                            key={i}
                        >
                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                {/* image Section */}
                                <View
                                    style={{
                                        height: 86,
                                        width: 86,
                                        backgroundColor: "black",
                                        borderRadius: 43,
                                    }}
                                >
                                    <Image
                                        source={require("../Assets/Doctorcircle.png")}
                                        style={{ width: "100%", height: "100%" }}
                                    ></Image>
                                </View>
                                {/* Name Section */}
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontWeight: "600", fontSize: 16, color: "#000000" }}>
                                        {item.nameOfTheDoctor}
                                    </Text>
                                    <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>
                                        {item.yearOfExprience}
                                    </Text>
                                    <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>
                                        144 rating
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("DoctorsProfile", { id: item._id })}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#1F51C6",
                                        width: "100%",
                                        paddingVertical: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 100,
                                        marginVertical: 12,
                                    }}
                                >
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Book Appoinment</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>


            </View>
        </KeyboardAvoidingView>
    );
};

export default Searchdoctor;
