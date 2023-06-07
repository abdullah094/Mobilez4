import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/Feather';
import ChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sell from '../screens/Sell';
import Settings from '../screens/Settings';
import PostAnAd from '../screens/PostAnAd';
import MyAds from '../screens/MyAds';
import {color} from '../constants/Styles';
import More from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import ChatScreen from '../screens/Chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import {useSelector} from 'react-redux';
import {selectAccessToken} from '../Redux/Slices';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NavigationSell = () => {
  const accessToken = useSelector(selectAccessToken);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PostAnAd">
      {accessToken ? (
        <Stack.Screen name="PostAnAd" component={PostAnAd} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        // tabBarIcon: ({focused, color, size}) => {
        //   let iconName;

        //   if (route.name === 'Home') {
        //     iconName = focused ? 'ios-home' : 'ios-home-outline';
        //   } else if (route.name === 'Sell') {
        //     iconName = focused ? 'albums' : 'albums-outline';
        //   } else if (route.name === 'More') {
        //     iconName = focused ? 'menu' : 'menu';
        //   } else if (route.name === 'MyAds') {
        //     iconName = focused ? 'megaphone' : 'megaphone';
        //   }

        //   // You can return any component that you like here!
        //   return(
        //     <View > <Ionicons name={iconName} size={size} color={color} /></View>
        //   )

        // },
        tabBarActiveTintColor: '#015DCF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
        component={Home}
      />

      <Tab.Screen
        name="MyAds"
        options={{
          tabBarLabel: 'My Ads',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{height: size, width: size, tintColor: color}}
              source={require('../assets/trend-up.png')}
            />
          ),
        }}
        component={MyAds}
      />
      <Tab.Screen
        component={NavigationSell}
        name="Sell"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 45,
                borderRadius: 45,
                backgroundColor: '#D9D9D9',
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                  width: 43,
                  height: 43,
                  bottom: 5,
                  backgroundColor: '#015DCF',
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Sell
                </Text>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={require('../assets/chaticon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={Settings}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <More name="read-more" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
