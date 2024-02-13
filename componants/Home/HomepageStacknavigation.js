import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Indexpage';
import Location from './Location';

// import EditProfileUser from '../Stacknavigation/EditProfileUser';

const Stack = createNativeStackNavigator()
const HomePageStacknavigation =()=>{
    return (
        <>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Indexpage" component={Index} />
        <Stack.Screen name="Location" component={Location}  options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerShown:true }} />
        {/* <Stack.Screen name="Editprofile" component={EditProfileUser} /> */}
      </Stack.Navigator>
        
        </>
    )
}

export default HomePageStacknavigation