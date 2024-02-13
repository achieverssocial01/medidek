/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import UserContextProvider from './componants/Context/UserContextProvider'
import Stack from "./componants/Stacknavigation/Stack"

function App() {

  return (
  <UserContextProvider>
  <Stack/>
    </UserContextProvider>
  );
}

export default App

