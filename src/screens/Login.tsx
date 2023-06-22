import {LOGIN, SOCIALLOGIN} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AccessToken, LoginButton, Settings} from 'react-native-fbsdk-next';
import {TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  selectAccessToken,
  setAccessToken,
  setSocialLgin,
} from '../Redux/Slices';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');

Settings.setAppID('686223029942369');
Settings.initializeSDK();
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');

  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState<any>('');
  const [loginLoader, setLoginLoader] = useState('Sign In');
  const accessToken = useSelector(selectAccessToken);
  const [hidePass, setHidePass] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  if (accessToken) navigation.navigate('Home');
  const dispatch = useDispatch();

  const fetchLogin = () => {
    setLoginLoader(<ActivityIndicator size="small" color="white" />);
    axios
      .post(
        LOGIN,
        {
          email: email,
          password: password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then(response => {
        if (response.data.errors) {
          console.log(response.data?.errors);
          if (response.data.errors) {
            if (response.data.errors.email && response.data.errors.password) {
              Alert.alert('Email and password are wrong');
            } else if (response.data.errors.email) {
              Alert.alert(response.data.errors.message.email);
            } else if (response.data.errors.password) {
              Alert.alert(response.data.errors.password);
            } else {
              Alert.alert('Unsuccessful', 'Please try again');
            }
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status === false) {
          if (response.data.message) {
            Alert.alert(response.data.message);
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status) {
          dispatch(setAccessToken(response.data.token));
          setLoginLoader('Login');
          PutAccessTokenToAsync(response.data.token);
        }
      })
      .catch(error => {
        setLoginLoader('Login');
        Alert.alert('Unsuccessful', 'Please try again');
      });
  };

  const fetchFacebookLogin = (fEmail, fid, name, avatar) => {
    setLoginLoader(<ActivityIndicator size="small" color="white" />);
    avatar = '';
    const url = encodeURI(
      SOCIALLOGIN + `?email=${fEmail}&id=${fid}&first_name=${name}`,
    );
    console.log('====================================');
    console.log({
      email: fEmail,
      id: fid,
      name: name,
      avatar: avatar,
    });
    console.log('====================================');
    axios
      .post(SOCIALLOGIN, {
        email: fEmail,
        id: fid,
        name: name,
        avatar: avatar,
      })
      .then(response => {
        if (response.data.errors) {
          console.log('response', response);
          console.log(response.data?.errors);
          if (response.data.errors) {
            if (response.data.errors.email && response.data.errors.password) {
              Alert.alert('Email and password are wrong');
            } else if (response.data.errors.email) {
              Alert.alert(response.data.errors.message.email);
            } else if (response.data.errors.password) {
              Alert.alert(response.data.errors.password);
            } else {
              Alert.alert('Unsuccessful', 'Please try again');
            }
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status === false) {
          if (response.data.message) {
            Alert.alert(response.data.message);
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status) {
          dispatch(setAccessToken(response.data.token));
          setLoginLoader('Login');
          PutAccessTokenToAsync(response.data.token);
        }
      })
      .catch(error => {
        setLoginLoader('Login');
        console.log('error', error);
        Alert.alert('Unsuccessful', 'Please try again');
      });
  };
  const fetchGoogleLogin = (gEmail, gid, name, avatar) => {
    setLoginLoader(<ActivityIndicator size="small" color="white" />);

    avatar = '';
    const url = encodeURI(
      SOCIALLOGIN + `?email=${gEmail}&id=${gid}&first_name=${name}`,
    );
    console.log('====================================');
    console.log({
      email: gEmail,
      id: gid,
      name: name,
      avatar: avatar,
    });
    console.log('====================================');
    axios
      .post(SOCIALLOGIN, {
        email: gEmail,
        id: gid,
        name: name,
        avatar: avatar,
      })
      .then(response => {
        if (response.data.errors) {
          console.log('response', response);
          console.log(response.data?.errors);
          if (response.data.errors) {
            if (response.data.errors.email && response.data.errors.password) {
              Alert.alert('Email and password are wrong');
            } else if (response.data.errors.email) {
              Alert.alert(response.data.errors.message.email);
            } else if (response.data.errors.password) {
              Alert.alert(response.data.errors.password);
            } else {
              Alert.alert('Unsuccessful', 'Please try again');
            }
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status === false) {
          if (response.data.message) {
            Alert.alert(response.data.message);
          } else {
            Alert.alert('Unsuccessful', 'Please try again');
          }
          setLoginLoader('Login');
        } else if (response.data?.status) {
          dispatch(setAccessToken(response.data.token));
          setLoginLoader('Login');
          dispatch(setSocialLgin(true));
          PutAccessTokenToAsync(response.data.token);
        }
      })
      .catch(error => {
        setLoginLoader('Login');
        console.log('error', error);
        Alert.alert('Unsuccessful', 'Please try again');
      });
  };
  const PutAccessTokenToAsync = async accessToken => {
    try {
      await AsyncStorage.setItem('@user_token', accessToken);
      navigation.navigate('TabNavigation', {screen: 'Home'});
    } catch (e) {
      console.log('Error saving Data to AsyncStorage:', e);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '1054360665178-s0ha7ki2pt5ainsht0ui2o6l2fv2pu9r.apps.googleusercontent.com',
      profileImageSize: 150,
    });
  }, []);

  // const facebookSignin =async ()=>{
  //   if (error) {
  //     //Alert for the Error
  //     alert('Error fetching data: ' + error.toString());
  //   } else {
  //     //response alert
  //     fetchGoogleLogin()
  //   }
  // };

  // const onLogout = () => {
  //   //Clear the state after logout
  //   setUserName(null);
  //   setToken(null);
  //   setProfilePic(null);
  // }

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      fetchGoogleLogin(
        userInfo.user.email,
        userInfo.user.id,
        userInfo.user.name,
        userInfo.user.photo,
      );

      // this.setState({ userInfo, error: undefined });
    } catch (error) {
      const typedError = error as NativeModuleError;

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', typedError.toString());
        // setState({
        //   error: typedError,
        // });
      }
    }
  };
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`flex-1`}>
        <View style={tw`h-full`}>
          <Header title="Login" />
          <View style={tw` flex-1 items-center justify-center`}>
            <Image
              style={{width: 200, height: 80, marginBottom: 30}}
              source={require('../assets/mobile-logo.png')}
            />
            <View style={tw`bg-white p-6 rounded-3xl py-12 shadow-md `}>
              <View style={styles.input_box}>
                <Text style={styles.box_heading}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  value={email}
                  textColor="black"
                  onChangeText={(text: string) => setEmail(text.toLowerCase())}
                />
              </View>

              <View style={styles.input_box}>
                <Text style={styles.box_heading}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  secureTextEntry={hidePass}
                  textColor="black"
                  onChangeText={text => setPassword(text.toLowerCase())}
                  right={
                    <TextInput.Icon
                      icon={hidePass ? 'eye-off' : 'eye'}
                      color={'black'}
                      size={16}
                      onPress={togglePasswordVisibility}
                    />
                  }
                />
              </View>

              <View style={tw`flex-row justify-between mt-3`}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    onPress={() => setCheck(!check)}
                    style={{
                      marginLeft: 10,
                      borderWidth: 1,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      marginHorizontal: 3,
                    }}>
                    {check && (
                      <MaterialIcon
                        name="check"
                        color={color.orange}
                        size={18}
                      />
                    )}
                  </Pressable>

                  <Text style={{color: 'black', fontSize: 12}}>
                    Remember me
                  </Text>
                </View>

                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{color: 'black', fontSize: 12}}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={fetchLogin}
                style={{
                  backgroundColor: color.orange,
                  width: 311,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {loginLoader}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'center',
                  // backgroundColor: 'black',
                }}>
                <Text style={{color: 'black'}}>Or</Text>
              </View>
            </View>

            <View style={tw`flex flex-row justify-center w-full   z-20 `}>
              <TouchableOpacity style={styles.social_buttons}>
                <Image
                  style={tw`h-4 w-2`}
                  source={require('../assets/F.png')}
                />

                <LoginButton
                  style={{padding: 20}}
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                        console.log('Accces token not available');
                      });
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                />
              </TouchableOpacity>
              <View style={[styles.social_buttons, tw`bg-[#DC4E41]`]}>
                <TouchableOpacity onPress={() => _signIn()}>
                  <Image
                    style={tw`h-4 w-4`}
                    source={require('../assets/Gpng.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`w-full flex-row mt-14 items-center justify-center`}>
              <Text style={{color: 'black'}}>Don't have and account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SignUp', {city: 'Karachi'})
                }>
                <Text style={tw`text-[#3B5998]`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input_box: {
    marginTop: 15,
  },
  input: {
    justifyContent: 'flex-end',
    paddingHorizontal: 1,
    color: color.black,
    height: 40,
    borderBottomWidth: 1,
    borderColor: color.gray,
    backgroundColor: 'white',
  },
  box_heading: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
  social_buttons: tw`bg-[#3B5998] h-11 w-11 mx-4 rounded-full top--6 justify-center items-center flex-row `,
});
