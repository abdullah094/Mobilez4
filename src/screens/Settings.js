import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {color} from '../constants/Colors';
import {LOGOUT} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../data/Context';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {reduxRemoveAccessToken} from '../Redux/Slices';

const {width, height} = Dimensions.get('window');
const Settings = ({navigation}) => {
  const {signIn} = useContext(Context);
  const isFocused = useIsFocused();
  const [accessToken, setAccessToken] = useState();
  const {signOut} = useContext(Context);
  const _accessToken = useSelector(state => state.todo.accessToken);
  const _profile = useSelector(state => state.todo.profile);
  const dispatch = useDispatch();
  console.log(_profile);

  useEffect(() => {
    let user_token;
    setTimeout(async () => {
      user_token = null;
      try {
        user_token = await AsyncStorage.getItem('@user_token');
        setAccessToken(user_token);
      } catch (e) {
        setAccessToken('');
        console.log(e);
      }
    }, 200);
  }, [isFocused]);

  // console.log(LOGOUT)
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
        signOut();
        dispatch(reduxRemoveAccessToken());
        Alert.alert(response.data?.message);
      })
      .catch(error => {
        console.log('e' + error);
      });
  };
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <View
        style={{
          height: 130,
          width: width,
          backgroundColor: color.orange,
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <SafeAreaView style={{margin: 15}}>
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
        </SafeAreaView>
      </View>
      {_accessToken ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={[styles.button_text]}>Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} >
  <Text style={[styles.button_text]}>Account details</Text>
</TouchableOpacity> */}
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
