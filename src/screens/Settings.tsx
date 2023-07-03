import {LOGOUT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  logoutUser,
  selectAccessToken,
  selectProfileData,
  setWishList,
} from '../Redux/Slices';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Settings = ({navigation}) => {
  const _accessToken = useSelector(selectAccessToken);
  const _profile = useSelector(selectProfileData);
  const dispatch = useDispatch();

  const PutAccessTokenToAsync = async () => {
    try {
      await AsyncStorage.removeItem('@user_token');
      dispatch(logoutUser());
      dispatch(setWishList([]));
    } catch (e) {
      console.log('Error removing Data to AsyncStorage:', e);
    }
  };
  const LogoutFunc = () => {
    axios
      .post(
        LOGOUT,
        {
          key: 'value',
        },
        {
          headers: {Authorization: `Bearer ${_accessToken}`},
        },
      )
      .then(response => {
        console.log(response.data); //working logout
        PutAccessTokenToAsync();
        Alert.alert(response.data?.message);
      })
      .catch(error => {
        console.log('e' + error);
        PutAccessTokenToAsync();
      });
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <View
          style={{
            height: 130,
            backgroundColor: color.orange,
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          {/* <Image style={{width:50,height:50,borderRadius:25}} source={}/> */}
          {_accessToken ? (
            <>
              <Text
                style={{color: color.white, fontSize: 20, fontWeight: '600'}}>
                {_profile.first_name}
              </Text>
              <Text
                style={{color: color.white, fontSize: 15, fontWeight: '600'}}>
                {_profile.email}
              </Text>
            </>
          ) : (
            <Text style={{color: color.white, fontSize: 30, fontWeight: '600'}}>
              Settings
            </Text>
          )}
        </View>
        <ScrollView contentContainerStyle={tw`bg-[#edf2f2]`}>
          {_accessToken ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}>
                <Text style={[styles.button_text]}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MyWishlist')}>
                <Text style={[styles.button_text]}>My Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TermsAndCondition')}>
                <Text style={[styles.button_text]}>Terms and Condition</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={[styles.button_text]}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Blogs')}>
                <Text style={[styles.button_text]}>Blogs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Videos')}>
                <Text style={[styles.button_text]}>Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ContactUs')}>
                <Text style={[styles.button_text]}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AboutUs')}>
                <Text style={[styles.button_text]}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={LogoutFunc}>
                <Text style={[styles.button_text, {color: 'red'}]}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.button_text, {color: color.orange}]}>
                  Login/Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TermsAndCondition')}>
                <Text style={[styles.button_text]}>Terms and Condition</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={[styles.button_text]}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Blogs')}>
                <Text style={[styles.button_text]}>Blogs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Videos')}>
                <Text style={[styles.button_text]}>Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AboutUs')}>
                <Text style={[styles.button_text]}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ContactUs')}>
                <Text style={[styles.button_text]}>Contact Us</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    width: width - 30,
    height: 40,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    marginTop: 10,
    justifyContent: 'center',
    borderColor: color.gray,
  },
  button_text: {
    fontWeight: '400',
    fontSize: 16,
    color: color.black,
  },
});
