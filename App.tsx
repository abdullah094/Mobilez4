import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Provider as Paper} from 'react-native-paper';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import AdDeleteModaleScreen from './src/components/AdDeleteModaleScreen';
import AdEditModaleScreen from './src/components/AdEditModaleScreen';
import AppUpdateScreen from './src/components/AppUpdateComponent';
import Welcome from './src/components/Welcome';
import TabNavigation from './src/navigation/TabNavigation';
import AboutUs from './src/screens/AboutUs';
import AccountManagement from './src/screens/AccountManagement';
import BlogDetails from './src/screens/BlogDetails';
import Blogs from './src/screens/Blogs';
import ChatScreen from './src/screens/Chat';
import CityList from './src/screens/CityList';
import ContactUs from './src/screens/ContactUs';
import EditScreen from './src/screens/EidtAdScreen';
import Filter from './src/screens/Filter';
import FindMyDevice from './src/screens/FindMyDevice';
import ForgotPassword from './src/screens/ForgotPassword';
import Images from './src/screens/Images';
import Listings from './src/screens/Listings';
import Login from './src/screens/Login';
import MyWishlist from './src/screens/MyWishlist';
import OTPScreen from './src/screens/OTPScreen';
import OtpVerify from './src/screens/OtpVerify';
import PostAnAd from './src/screens/PostAnAd';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import ProductPage from './src/screens/ProductPage';
import Profile from './src/screens/Profile';
import SearchScreen from './src/screens/SearchScreen';
import SignUp from './src/screens/SignUp';
import TermsAndCondition from './src/screens/TermsAndCondition';
import Videos from './src/screens/Videos';
import WishlistComponent from './src/screens/WishlistComponent';
import {IndexParamList} from './src/types';
const App = () => {
  const curVersion = DeviceInfo.getVersion();
  const Stack = createNativeStackNavigator<IndexParamList>();
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  // const checkForUpdates = () => {
  //   const inAppUpdates = new SpInAppUpdates(false); // isDebug

  //   const curVersion = DeviceInfo.getVersion(); // Get the current version using react-native-device-info

  //   let result = inAppUpdates.checkNeedsUpdate();

  //   result
  //     .then((result: any) => {
  //       console.log('====bjb', result);

  //       const latestVersion = result;

  //       // <AppUpdateScreen />;

  //       let updateOptions = {};
  //       if (Platform.OS === 'android') {
  //         updateOptions = {
  //           updateType: IAUUpdateKind.FLEXIBLE,
  //         };
  //       }
  //       const updatePrompt = inAppUpdates.startUpdate(updateOptions);
  //       updatePrompt
  //         .then(response => {
  //           console.log('update response', response);
  //         })
  //         .catch(err => {
  //           console.log('err', err);
  //         });
  //     })
  //     .catch(error => {
  //       console.error('Promise rejection error:', error);
  //     });
  // };

  // useEffect(() => {
  //   checkForUpdates();
  // }, []);
  if (loading) {
    return <Welcome />;
  }

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Save or use the token as needed
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };
  getFCMToken();
  console.log('=======', getFCMToken());

  return (
    <Provider store={Store}>
      <Paper>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TabNavigation">
            <Stack.Screen
              options={{headerShown: false}}
              name="TabNavigation"
              component={TabNavigation}
            />

            <Stack.Screen
              options={{headerShown: false}}
              name="CityList"
              component={CityList}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ProductPage"
              component={ProductPage}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SearchScreen"
              component={SearchScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignUp"
              component={SignUp}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Listings"
              component={Listings}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="OTPScreen"
              component={OTPScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="OtpVerify"
              component={OtpVerify}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="PostAnAd"
              component={PostAnAd}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ContactUs"
              component={ContactUs}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="MyWishlist"
              component={MyWishlist}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="TermsAndCondition"
              component={TermsAndCondition}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="PrivacyPolicy"
              component={PrivacyPolicy}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Blogs"
              component={Blogs}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Videos"
              component={Videos}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="BlogDetails"
              component={BlogDetails}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="FindMyDevice"
              component={FindMyDevice}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Filter"
              component={Filter}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Images"
              component={Images}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AboutUs"
              component={AboutUs}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Chat"
              component={ChatScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="WhishlistComponent"
              component={WishlistComponent}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AccountManagement"
              component={AccountManagement}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AppUpdateScreen"
              component={AppUpdateScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="EditScreen"
              component={EditScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AdEditModaleScreen"
              component={AdEditModaleScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AdDeleteModaleScreen"
              component={AdDeleteModaleScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Paper>
    </Provider>
  );
};

export default App;
