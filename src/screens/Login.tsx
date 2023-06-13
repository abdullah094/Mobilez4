import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Pressable,
  Button
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {LOGIN} from '@env';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setAccessToken, selectAccessToken} from '../Redux/Slices';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [loginLoader, setLoginLoader] = useState('Sign In');
  const accessToken = useSelector(selectAccessToken);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
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

  const PutAccessTokenToAsync = async accessToken => {
    try {
      await AsyncStorage.setItem('@user_token', accessToken);
      navigation.navigate('TabNavigation', {screen: 'Home'});
    } catch (e) {
      console.log('Error saving Data to AsyncStorage:', e);
    }
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
                  onChangeText={(text: string) => setEmail(text.toLowerCase())}
                />
              </View>

              <View style={styles.input_box}>
                <Text style={styles.box_heading}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={text => setPassword(text.toLowerCase())}
                />
              </View>

              <View style={tw`flex-row justify-between mt-3`}>
              <View style={{flexDirection:'row',alignItems:'center'}}>  
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
                  marginHorizontal:3
                }}>
                {check && (
                  <MaterialIcon name="check" color={color.orange} size={18} />
                )}
              </Pressable>
                
                  <Text style={{color:'black',fontSize:12}}>Remember me</Text>
                  </View>
               


                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{color:'black',fontSize:12}}>Forgot your password?</Text>
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
                <Text style={{color:'black'}}>Or</Text>
              </View>
            </View>

            <View style={tw`flex flex-row justify-center w-full   z-20 `}>
              <TouchableOpacity style={styles.social_buttons}>
                <Image
                  style={tw`h-4 w-2`}
                  source={require('../assets/F.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.social_buttons, tw`bg-[#DC4E41]`]}>
                <Image
                  style={tw`h-4 w-4`}
                  source={require('../assets/Gpng.png')}
                />
                <Image
                  style={tw`h-2 w-2`}
                  source={require('../assets/plus.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={tw`w-full flex-row mt-14 items-center justify-center`}>
              <Text style={{color:'black'}}>Don't have and account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SignUp', {city: 'Karachi'})
                }>
                <Text style={tw`text-[#3B5998]`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Button title={'Sign in with Google'} onPress={() =>  {
    GoogleSignin.configure({
        androidClientId: '1054360665178-hbojd2aj076ksbvcuhgntrpv1683s0fa.apps.googleusercontent.com'
       
    });
GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
             GoogleSignin.signIn().then((userInfo) => {
                       console.log(JSON.stringify(userInfo))
             }).catch((e) => {
             console.log("ERROR IS: " + JSON.stringify(e));
             })
        }
}).catch((e) => {
    console.log("ERROR IS: " + JSON.stringify(e));
})
}} />

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
  },
  box_heading: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
  social_buttons: tw`bg-[#3B5998] h-11 w-11 mx-4 rounded-full top--6 justify-center items-center flex-row `,
});
