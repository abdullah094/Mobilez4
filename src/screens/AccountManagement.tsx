import {GET_PROFILE_DATA} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  logoutUser,
  selectAccessToken,
  setProfileData,
  setWishList,
} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import {Profile} from '../types';
const {width, height} = Dimensions.get('window');
const AccountManagement = () => {
  const _accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<Profile | null>();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState('');
  const openURI = async () => {
    const url = 'https://www.mobilezmarket.com/manage-account';
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  useEffect(() => {
    const isEmailFormatValid = /^[\w\.-]+@[\w-]+\.[a-z]{2,3}$/.test(email);
    setIsEmailValid(isEmailFormatValid);
  }, [email]);
  const PutAccessTokenToAsync = async () => {
    try {
      await AsyncStorage.removeItem('@user_token');
      dispatch(logoutUser());
      dispatch(setProfileData({}));
      dispatch(setWishList([]));
    } catch (e) {
      console.log('Error removing Data to AsyncStorage:', e);
    }
  };
  const fetchProfileData = async accessToken => {
    await axios
      .get(GET_PROFILE_DATA, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        const _profile = response.data.profile;
        setProfile(_profile);
        console.log('_profile', _profile);

        dispatch(setProfileData(_profile));
      })
      .catch(error => {
        // console.log('ProfileData ' + error);
      });
  };
  useEffect(() => {
    fetchProfileData(_accessToken);
  }, []);
  console.log(profile?.id);
  const DeleteUser = () => {
    axios
      .post(
        `https://www.mobilezmarket.com/api/delete-user`,
        {
          email: email,
          account_id: profile?.id,
        },
        {
          headers: {Authorization: `Bearer ${_accessToken}`},
        },
      )
      .then(response => {
        setMessage('The user has been Deleted');
        navigation.navigate('Login');
        PutAccessTokenToAsync();
      })
      .catch(error => {
        console.log('hello', error);
        navigation.navigate('Login');
      });
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView>
          <Header title="Account Management" />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '500',
                  color: 'black',
                }}>
                To delete your user account on the Mobilez Market application,
                please follow these steps:
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                1. Insert Your email address in the field below.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                2. Press the "Submit" button to proceed with the account.
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'black', fontSize: 12}}>Enter Your Email</Text>
            <View>
              <TextInput
                placeholder="abc@mail.com"
                placeholderTextColor={'gray'}
                style={styles.box_input}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <TouchableOpacity
              disabled={!isEmailValid} // Disable if email is not valid
              style={{
                backgroundColor: isEmailValid ? 'red' : 'gray', // Change background color based on validity
                height: 50,
                borderRadius: 20,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={DeleteUser}>
              <Text style={{color: 'white', fontWeight: '600'}}>
                Delete Your Account
              </Text>
            </TouchableOpacity>
          </View>
          <AlertModale message={message} setMessage={setMessage} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccountManagement;

const styles = StyleSheet.create({
  box_input: {
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 10,
    color: 'black',
    borderWidth: 1,
    marginTop: 10,
    padding: 9,
  },
});
