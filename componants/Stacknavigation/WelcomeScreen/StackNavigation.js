






import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginWithNumber from './LoginWithNumber';
import LoginWithEmail from './LoginWithEmail';

const Stack = createNativeStackNavigator()
function StacknavigationForWelComePage() {
    return  <Stack.Navigator  screenOptions={{
        headerShown:true
    }} >
        <Stack.Screen name="loginWithNumber" component={LoginWithNumber} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
        <Stack.Screen name="loginWithEmail" component={LoginWithEmail}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
      </Stack.Navigator>

  }


  export default StacknavigationForWelComePage