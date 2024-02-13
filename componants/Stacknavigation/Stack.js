import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../tabnavigation/Main';
import {NavigationContainer} from '@react-navigation/native';
import EditProfileUser from '../Stacknavigation/EditProfileUser';
import Profile from './Profilepage';
import OnBoardingPage from './Onboardingpage';
import CreateAccountpage from './Account/CreateAccountpage';
import LoginWithNumber from './WelcomeScreen/LoginWithNumber';
import LoginWithEmail from './WelcomeScreen/LoginWithEmail';
import Otpverification from './WelcomeScreen/OtpVerification';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ForgotPasswordOtpverification from './ForgotPassword/ForgotPasswordOtpverification';
import ResetPassword from './ForgotPassword/ResetPassword';
import UploadRecord from '../Record/UploadRecord';
import RescheduleAppointment from './ResheduleAppointment/ResheduleAppointment';
import DoctorProfilePage from '../Doctors/DoctorProfilePage';
import Book from '../Appointment/Book';
import ViewAppointment from '../Appointment/ViewAppointment';
import Edit from '../Appointment/Edit';
import PrivacyPolicy from '../Profile/PrivacyPolicy';
import Signup from '../Signup';
import DrawerBoard from '../DrawerBoard';
import DoctorEditProfile from '../DoctorEditProfile';
import DoctorProfile from '../DoctorProfile';
import EditAppointment from '../EditAppointment';
import EditAppointments from '../EditAppointments';
import BookAppointmentsByHospital from '../BookAppointmentsByHospital';
import DoctorAppointmentSettingByHospital from '../DoctorAppointmentSettingByHospital';
import ViewAllAppointmentsInHospital from '../ViewAllAppointmentsInHospital';
import DoctorAppointmentInHospital from '../DoctorAppointmentInHospital';
import AddStaffByHospital from '../AddStaffByHospital';
import AddDoctorByHospital from '../AddDoctorByHospital';
import HospitalEditProfile from '../HospitalEditProfile';
import EditDoctorByHospital from '../EditDoctorByHospital';
import MasterDrawer from '../MasterDrawer';
import ViewHospitalProfile from '../ViewHospitalProfile';
import AllDoctorswithHospital from '../AllDoctorswithHospital';
import AllCategories from '../AllCategoriesRoute';
import RoughDemo from '../RoughDemo';
import EditTokenAppointmentsByHospital from '../EditTokenAppointmentsByHospital';
import EditOnlineAppointmentsByHospital from '../EditOnlineAppointmentsByHospital';
import DUID from '../DUID';
const Stack = createNativeStackNavigator();

const HomePageStacknavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, orientation: 'portrait'}}
          initialRouteName="Signup">
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name="DoctorDashboard"
            component={DrawerBoard}
          />
          
          <Stack.Screen
            name="EditAppointment"
            component={EditAppointment}
          />
          
          <Stack.Screen
            name="EditAppointments"
            component={EditAppointments}
          />
              <Stack.Screen name="onBoardPage" component={OnBoardingPage} />

              
          <Stack.Screen
            name="createAccountpage"
            component={CreateAccountpage}
          />
          <Stack.Screen
            name="loginWithEmail"
            component={LoginWithEmail}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="loginWithNumber"
            component={LoginWithNumber}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen name="tabbord" component={Main} />
          <Stack.Screen
            name="EditProfileUser"
            component={EditProfileUser}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={DoctorEditProfile}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: true,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Otpverification"
            component={Otpverification}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPasswordOtpverification"
            component={ForgotPasswordOtpverification}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResheduleAppointment"
            component={RescheduleAppointment}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UploadRecord"
            component={UploadRecord}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />

        <Stack.Screen
        name='DoctorProfile'
        component={DoctorProfile}
        />

          <Stack.Screen
            name="DoctorProfilePage"
            component={DoctorProfilePage}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Book"
            component={Book}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ViewAppointment"
            component={ViewAppointment}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="getdoctorid"
            component={DUID}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />

{/*     Hospital Screens */}

         



      <Stack.Screen
            name="MasterDashboard"
            component={MasterDrawer}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="AddDoctorByHospital"
            component={AddDoctorByHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="EditDoctorByHospital"
            component={EditDoctorByHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="HospitalEditProfile"
            component={HospitalEditProfile}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="AddStaffByHospital"
            component={AddStaffByHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />

      <Stack.Screen
            name="DoctorAppointmentsInHospital"
            component={DoctorAppointmentInHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="BookAppointmentsByHospital"
            component={BookAppointmentsByHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="DoctorAppointmentSettingByHospital"
            component={DoctorAppointmentSettingByHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />


      <Stack.Screen
            name="ViewAllAppointmentsInHospital"
            component={ViewAllAppointmentsInHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />


<Stack.Screen
            name="EditTokenAppointmentsByHospital"
            component={EditTokenAppointmentsByHospital}
          />
          
          <Stack.Screen
            name="EditOnlineAppointmentsByHospital"
            component={EditOnlineAppointmentsByHospital}
          />



      <Stack.Screen
            name="ViewHospitalProfile"
            component={ViewHospitalProfile}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="AllDoctorswithHospital"
            component={AllDoctorswithHospital}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
      <Stack.Screen
            name="Category"
            component={AllCategories}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />




            <Stack.Screen
            name="RoughDemo"
            component={RoughDemo}
            options={{
              headerStyle: {backgroundColor: '#1F51C6'},
              headerTintColor: 'white',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default HomePageStacknavigation;
