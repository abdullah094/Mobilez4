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
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {LOGIN} from '@env';
import axios from 'axios';
import Context from '../data/Context';
import {useDispatch, useSelector} from 'react-redux';
import {reduxSetAccessToken} from '../Redux/Slices';

const {width, height} = Dimensions.get('window');
const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginLoader, setLoginLoader] = useState('Login');
  const {signIn} = useContext(Context);
  const accesstoken = useSelector(state => state.todo.accessToken);

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
          signIn('', response.data.token),
            dispatch(reduxSetAccessToken(response.data.token)),
            setLoginLoader('Login'),
            navigation.navigate('TabNavigation', {screen: 'Home'});
        }
      })
      .catch(error => {
        setLoginLoader('Login'),
          Alert.alert('Unsuccessful', 'Please try again');
      });
  };

  return (
    <>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: color.gray,
          paddingBottom: 50,
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 250, height: 100, marginBottom: 50}}
          source={require('../assets/mobile-logo.png')}
        />
        <View style={styles.input_box}>
          <Text style={styles.box_heading}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
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

        <TouchableOpacity
          onPress={fetchLogin}
          style={{
            backgroundColor: color.orange,
            width: width - 40,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{color: color.white, fontWeight: 'bold', fontSize: 20}}>
            {loginLoader}
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginTop: 10, padding: 5}}
          onPress={() => navigation.navigate('SignUp', {city: 'Karachi'})}>
          <Text style={{color: 'blue'}}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  input_box: {
    width: width - 40,
    marginTop: 15,
  },
  input: {
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    color: color.black,
    height: 50,
    backgroundColor: color.white,
  },
  box_heading: {
    fontSize: 15,
    color: color.black,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
});
