
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, KeyboardAvoidingView, StatusBar, Text } from "react-native"
import StacknavigationForDoctor from '../Doctors/StacknavigationForDoctor';
import Reports from '../Record/Reports';
import HomePageStacknavigation from '../Home/HomepageStacknavigation';
import DashboardTopTabNavigation from '../Dashbord/TopTabnavigationforDashbord';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <>
  <StatusBar backgroundColor="#1F51C6" barStyle="light-content"/>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused
                  ? require("../Assets/Home-active-icon.png")
                  : require("../Assets/home-inactive-icon.png");
              } else if (route.name === "Doctors") {
                iconName = focused
                  ? require("../Assets/Capsule-inactive-icon.png")
                  : require("../Assets/Capsule-inactive-icon.png"); 
              }

              else if (route.name === "Dashbord") {
                iconName = focused
                  ? require("../Assets/Dashboard-active-icon.png")
                  : require("../Assets/Dashboard-inactive-icon.png"); 
              }
              else if (route.name === "Records") {
                iconName = focused
                  ? require("../Assets/Records-active-icon.png")
                  : require("../Assets/Record-inactive-icon.png"); 
              }
              return    <Image
              source={iconName}
              style={{ width: 20, height: 20, tintColor: color }}
            />
            },
            tabBarActiveTintColor: '#1F51C6',
            tabBarHideOnKeyboard: true,
            headerTitleAlign:"center"
          })}
        >
          <Tab.Screen name="Home" component={HomePageStacknavigation} options={{ headerShown: false }} />
          <Tab.Screen name="Doctors" component={StacknavigationForDoctor} options={{headerShown:false,unmountOnBlur:true }} />
          <Tab.Screen name="Dashbord" component={DashboardTopTabNavigation} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Appointment Tracking",tabBarLabel:"Tracking" }} />
          <Tab.Screen name="Records" component={Reports} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
        </Tab.Navigator>     
     </>
  )
}

export default Main