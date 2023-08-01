import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
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
import FeatureAD from './src/screens/FeatureAD';
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
  const [token, setToken] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const getFCMToken = async () => {
      try {
        const token = await messaging().getToken();

        console.log('FCM token:', token);
        sendFCMTokenToServer(token);

        // Save or use the token as needed
      } catch (error) {
        console.log('Error getting FCM token:');
      }
    };
    getFCMToken();
  }, []);

  const sendFCMTokenToServer = token => {
    axios
      .post('https://www.mobilezmarket.com/api/add-token', {
        token: token,
      })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        Alert.alert('User does not exist', error);
      });
  };

  async function onDisplayNotification(message) {
    const notification = message.notification;

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'hollow',
      vibration: true,
      vibrationPattern: [300, 500],
    });

    // Display a notification
    await notifee.displayNotification({
      title: notification.title || '',
      body: notification.body || '',
      android: {
        largeIcon: notification.android.smallIcon,
        sound: 'hollow',
        autoCancel: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  notifee.deleteChannel('Default Channel');
  messaging().onMessage(onDisplayNotification);
  messaging().setBackgroundMessageHandler(onDisplayNotification);
  async function checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();

    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
    }
  }

  if (loading) {
    return <Welcome />;
  }

  // const NotficationFunc = useCallback(() => {
  //   const url = `https://www.mobilezmarket.com/api/add-token ${token}`;
  //   axios
  //     .post(
  //       url,
  //       {},
  //       {
  //         headers: {Authorization: `Bearer ${_accessToken}`},
  //       },
  //     )
  //     .then(response => {
  //       setToken(response.data.message);

  //       console.log('Ad deleted ');
  //     })
  //     .catch(error => {
  //       console.log('hello', error);
  //     });
  // }, []);

  // function onMessageReceived(message: any) {
  //   notifee.displayNotification(JSON.parse(message.data.notifee));
  // }
  // useEffect(() => {
  //   NotficationFunc();
  // }, [_accessToken]);

  // messaging().onMessage(onMessageReceived);
  // messaging().setBackgroundMessageHandler(onMessageReceived);

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
            <Stack.Screen
              options={{headerShown: false}}
              name="FeatureAD"
              component={FeatureAD}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Paper>
    </Provider>
  );
};

export default App;
