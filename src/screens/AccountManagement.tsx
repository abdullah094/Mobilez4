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
import Header from '../components/Header';
import {Profile} from '../types';
const {width, height} = Dimensions.get('window');

const AccountManagement = () => {
  const _accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<Profile | null>();
  const [email, setEmail] = useState<string>();
  const openURI = async () => {
    const url = 'https://www.mobilezmarket.com/manage-account';
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
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
        console.log('Thi is APi is working ');
        Alert.alert('Alert', response.data.message);
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
                1. Visit the Mobilez Market Login page by clicking on the
                following link:
              </Text>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={openURI}>
                <Text style={{color: '#015dcf'}}>
                  https://www.mobilezmarket.com/signin
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Login Your Account then
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                2. Visit the Mobilez Market account management page by clicking
                on the following link:
              </Text>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={openURI}>
                <Text style={{color: '#015dcf'}}>
                  https://www.mobilezmarket.com/manage-account.
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                3. Once you're on the account management page, locate the
                section where you need to submit your email and user ID. This
                information can typically be found on your user details page
                within the application.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                4. Enter your email address and user ID in the respective fields
                provided.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                5. Double-check the entered information to ensure accuracy.
                Deleting your account is irreversible, so it's crucial to make
                sure you're deleting the correct account.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                6. After verifying your email and user ID, click on the "Submit"
                button to proceed with the account deletion process.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                A confirmation message will appear, notifying you that the
                deletion action is permanent and cannot be undone. Take a moment
                to read and understand this message.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                7. If you are certain that you want to delete your account,
                click on the "Confirm" or "Delete Account" button, depending on
                the wording used on the confirmation message.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                8. The application will process your request and permanently
                delete your user account. You will no longer have access to your
                account or any associated data.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                9. It's important to note that once the account is deleted, it
                cannot be recovered. Therefore, ensure that you have backed up
                any important data or information you may need before proceeding
                with the deletion.
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
              style={{
                backgroundColor: 'red',
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
