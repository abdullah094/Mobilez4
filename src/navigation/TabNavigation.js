import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sell from '../screens/Sell';
import Settings from '../screens/Settings';
import PostAnAd from '../screens/PostAnAd';
import MyAds from '../screens/MyAds';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Sell') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu';
          } else if (route.name === 'MyAds') {
            iconName = focused ? 'megaphone' : 'megaphone';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="MyAds" component={MyAds} />

      <Tab.Screen name="Sell" component={PostAnAd} />
      <Tab.Screen name="More" component={Settings} />
    </Tab.Navigator>
  );
}
