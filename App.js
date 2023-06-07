import React, {useContext, useEffect} from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Description from './src/screens/Description';
import CityList from './src/screens/CityList';
import ProductPage from './src/screens/ProductPage';
import TabNavigation from './src/navigation/TabNavigation';
import Login from './src/screens/Login';
import SearchScreen from './src/screens/SearchScreen';
import HomeFlatlist from './src/components/HomeFlatlist';
import ForgotPassword from './src/screens/ForgotPassword';
import SignUp from './src/screens/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from './src/Redux/Store';
import {Provider} from 'react-redux';
import Listings from './src/screens/Listings';
import Profile from './src/screens/Profile';
import OTPScreen from './src/screens/OTPScreen';
import OtpVerify from './src/screens/OtpVerify';
import PostAnAd from './src/screens/PostAnAd';
import ContactUs from './src/screens/ContactUs';
import MyWishlist from './src/screens/MyWishlist';
import TermsAndCondition from './src/screens/TermsAndCondition';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Blogs from './src/screens/Blogs';
import Videos from './src/screens/Videos';
import BlogDetails from './src/screens/BlogDetails';
import FindMyDevice from './src/screens/FindMyDevice';
import Filter from './src/screens/Filter';
import Images from './src/screens/Images';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider as Paper,
  Surface,
  ThemeProvider,
} from 'react-native-paper';
import AboutUs from './src/screens/AboutUs';

const App = () => {
  const Stack = createNativeStackNavigator();
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
              name="Description"
              component={Description}
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
              name="HomeFlatlist"
              component={HomeFlatlist}
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
          </Stack.Navigator>
        </NavigationContainer>
      </Paper>
    </Provider>
  );
};

export default App;
