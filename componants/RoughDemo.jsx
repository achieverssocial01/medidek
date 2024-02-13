import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateAccountpage from './Stacknavigation/Account/CreateAccountpage';
import LoginWithEmail from './Stacknavigation/WelcomeScreen/LoginWithEmail';

const Tab = createMaterialTopTabNavigator();

const RoughDemo = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={CreateAccountpage} />
      <Tab.Screen name="Settings" component={LoginWithEmail} />
    </Tab.Navigator>
  );
}

export default RoughDemo

const styles = StyleSheet.create({})