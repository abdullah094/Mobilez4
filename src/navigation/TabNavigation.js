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
import People from 'react-native-vector-icons/Octicons';
import tw from 'twrnc';
const Tab = createBottomTabNavigator();

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
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
        component={Home}
      />

      <Tab.Screen
        name="MyAds"
        options={{
          tabBarLabel: '',
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
        name="Sell"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
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
        component={MyAds}
      />

      <Tab.Screen
        name="Chat"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={require('../assets/chaticon.png')}
            />
          ),
        }}
        component={MyAds}
      />
      <Tab.Screen
        name="More"
        component={Settings}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <People name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
