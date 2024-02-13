import React, { useState, useRef, useCallback } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Button, // Import Button from react-native
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

const OnBoardingSlied = (props) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOnThirdPage, setIsOnThirdPage] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // This code will run when the tab screen is focused.
      // You can perform any necessary updates here.
      checkLogin();
    }, [])
  );

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("tabbord");
    }
  };

  const data = [
    {
      image1: require("../Assets/Onboarding-illustration-1.png"),
      text: "Welcome To Medidek!",
      description:
        "Seamlessly Book Appointments, Securely Manage Medical Records, and Personalize Your Health Journey",
    },
    {
      image1: require("../Assets/Onboarding-illustration-2.png"),
      text: "Book Appointments",
      description:
        "Seamlessly Book Appointments, Securely Manage Medical Records, and Personalize Your Health Journey",
    },
    {
      image1: require("../Assets/Onboarding-illustration-3.png"),
      text: "Track Medical Records",
      description:
        "Seamlessly Book Appointments, Securely Manage Medical Records, and Personalize Your Health Journey",
    },
  ];

  const handlePageChange = (index) => {
    setCurrentPage(index);
    setIsOnThirdPage(index === 2); // Assuming the third page has an index of 2
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      const newIndex = currentPage - 1;
      flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
      handlePageChange(newIndex);
    }
  };

  const goToSkip = () => {
    navigation.navigate("createAccountpage");
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(xOffset / Width);
          handlePageChange(index);
        }}
        contentContainerStyle={{ backgroundColor: "#ffffff" }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: Height,
                width: Width,
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Image
                source={item.image1}
                style={{ width: 300, height: 238, justifyContent: "center" }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 28,
                    marginVertical: 5,
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Text>
              </View>
              <Text
                style={{
                  color: "#706D6D90",
                  fontWeight: "500",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {item.description}
              </Text>
              {isOnThirdPage && (
                <View style={{ width: "100%", gap: 6, marginVertical: 20, }}>

                  <TouchableOpacity onPress={() => props.navigation.navigate("loginWithEmail")} >
                    <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                      <Text style={{ fontWeight: "400", fontSize: 16, color: "#ffffff" }}>Sign In</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => props.navigation.navigate("createAccountpage")}>
                    <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                      <Text style={{ fontWeight: "400", fontSize: 16, color: "#ffffff" }}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                </View>


              )}
            </View>
          );
        }}
      />
      <View style={styles.paginationDots}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentPage === index ? styles.activeDot : {}]}
            onPress={() => {
              flatListRef.current.scrollToIndex({ animated: true, index });
              handlePageChange(index);
            }}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToPrevPage} style={styles.prevButton}>
          <Text style={styles.buttonText}>PREV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSkip} style={styles.skipButton}>
          <Text style={{ color: "#1F51C6", fontSize: 13, fontWeight: "bold" }}>
            SKIP
          </Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#BFBFBF",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#1F51C6",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 20,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 45,
    backgroundColor: "#ffffff",
  },
  prevButton: {
    flex: 1,
    alignItems: "flex-start",
  },
  skipButton: {
    flex: 1,
    alignItems: "flex-end",
    fontSize: 10,
  },
  buttonText: {
    color: "#706D6D",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default OnBoardingSlied;