import {LOGOUT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Logout from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  logoutUser,
  selectAccessToken,
  selectProfileData,
  setProfileData,
  setWishList,
} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Settings = ({navigation}) => {
  const refRBSheet = useRef();
  const _accessToken = useSelector(selectAccessToken);
  const _profile = useSelector(selectProfileData);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [message, setmessage] = useState('');
  const image_url = 'https://www.mobilezmarket.com/images/';
  const image_dimension = 100;
  const [selectedOption, setSelectedOption] = useState('My Progress');
  // const [visible, setVisible] = React.useState(false);

  // const showDialog = () => setVisible(true);

  // const hideDialog = () => setVisible(false);

  const modalData = [
    {
      id: '1',
      title: '1. How it works',
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate('HowItWorkPage');
      },
    },
    {
      id: '2',
      title: '2. My Progress',
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate('ProgressGraph');
      },
    },
    {
      id: '3',
      title: '3. Registeration Form',
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate('ProgressBarComponent');
      },
    },
    {
      id: '4',
      title: '4. History',
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate('MyAds');
      },
    },
  ];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
        // Alert.alert(response.data?.message);
        setmessage(response.data?.message);

        // <AlertModale message={response.data?.message} />;
      })
      .catch(error => {
        console.log('e' + error);
        PutAccessTokenToAsync();
      });
  };
  console.log(_profile);
  const handleOptionChange = option => {
    setSelectedOption(option);

    // Handle navigation or other actions based on the selected option
    switch (option) {
      case 'My Progress':
        navigation.navigate('HowItWorkPage');
        break;
      case 'Registration Form':
        // Handle registration form action
        break;
      case 'History':
        navigation.navigate('MyAds');
        break;
      case 'Another Option':
        // Handle the additional option
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
        <View style={tw`bg-[#edf2f2] flex-1  `}>
          <View
            style={{
              height: _accessToken ? 130 : 50,
              backgroundColor: color.orange,
              flexDirection: 'row',
              alignContent: 'center',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              // onPress={navigation.navigate('Profile')}
              style={{
                flexDirection: 'row',
                padding: 5,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              {/* {_accessToken && (
                <Image
                  resizeMode="contain"
                  source={
                    _profile.photo
                      ? {
                          uri: _profile.photo?.includes('https')
                            ? _profile.photo
                            : image_url + _profile.photo,
                        }
                      : require('../assets/mobile-logo.png')
                  }
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: 'orange',

                    top: 0,
                    // left: 315,

                    backgroundColor: 'white',
                  }}
                />
              )} */}
            </TouchableOpacity>
          </View>
          {_accessToken ? (
            <View style={{justifyContent: 'flex-start'}}>
              <View
                style={{
                  backgroundColor: color.orange,
                  padding: 5,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontSize: 20,
                    fontWeight: '600',
                  }}>
                  {_profile.first_name}
                </Text>
                {_profile.last_name ? (
                  <Text
                    style={{
                      color: color.white,
                      fontSize: 20,
                      fontWeight: '600',
                    }}>
                    {_profile.last_name}
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: color.white,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  {_profile.email}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                padding: 5,
                justifyContent: 'flex-end',
                backgroundColor: color.orange,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontSize: 30,
                  fontWeight: '600',
                }}>
                Settings
              </Text>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[tw`bg-[#edf2f2]`, {paddingHorizontal: 10}]}>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AccountManagement')}>
                  <Text style={[styles.button_text]}>Account Management</Text>
                </TouchableOpacity>
                {_profile.user_type === 'business' ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={
                      () => refRBSheet.current.open()
                      // navigation.navigate('HowItWorkPage')
                    }>
                    <Text style={[styles.button_text]}>My Progress</Text>
                  </TouchableOpacity>
                ) : null}

                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FeatureAD')}>
                <Text style={[styles.button_text]}>Feature Your AD</Text>
              </TouchableOpacity> */}

                <TouchableOpacity style={styles.button} onPress={LogoutFunc}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Logout name="log-out" color="red" size={20} />
                    <Text style={[styles.button_text, {color: 'red'}]}>
                      Logout
                    </Text>
                  </View>
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

      <AlertModale message={message} setMessage={setmessage} />

      <View style={{height: 0}}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000020',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {modalData?.map(item => {
            return (
              <TouchableOpacity
                key={item?.id}
                style={[styles.button, {paddingHorizontal: 20}]}
                onPress={item?.onPress}>
                <Text style={[styles.button_text]}>{item?.title}</Text>
              </TouchableOpacity>
            );
          })}
        </RBSheet>
      </View>

      {/* <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <PaperText variant="bodyMedium">This is simple dialog</PaperText>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog}>Done</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
    </>
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
