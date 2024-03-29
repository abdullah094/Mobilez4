import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, Text, View} from 'react-native';
import HomeIcon from 'react-native-vector-icons/Feather';
import More from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {selectAccessToken} from '../Redux/Slices';
import ChatScreen from '../screens/Chat';
import Home from '../screens/Home';
import Login from '../screens/Login';
import MyAds from '../screens/MyAds';
import PostAnAd from '../screens/PostAnAd';
import Settings from '../screens/Settings';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const accessToken = useSelector(selectAccessToken);

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
        tabBarActiveTintColor: '#015DCF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {marginBottom: 5},
        tabBarIconStyle: {marginTop: 5},
      })}>
      <Tab.Screen
        name="Home"
        options={{
          // tabBarLabelStyle: {marginBottom: 5},
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
          // tabBarLabelStyle: {marginBottom: 5},
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
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 100,

                bottom: 10,
                // backgroundColor: '#D9D9D9',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                  backgroundColor: '#015DCF',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
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
          // tabBarLabelStyle: {marginBottom: 5},
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
          // tabBarLabelStyle: {marginBottom: 5},
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <More name="read-more" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
