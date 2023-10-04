import {FORGOT_PASSWORD} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const Submit = () => {
    if (email?.length < 1) {
      setMessage('Please enter E-mail');
    } else {
      setDisabled(true);
      axios
        .post(FORGOT_PASSWORD, {
          email: email,
        })
        .then(response => {
          setDisabled(false);
          // setMessage(response?.data?.message)
          navigation.navigate('OtpVerify', {email: email});
        })
        .catch(error => {
          setDisabled(false);
          setMessage('User does not exist');
        });
    }
  };

  return (
    <>
      <Header title="Forget Password" icon={true} />
      {/* <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}> */}
      <View style={{flex: 1, width: '100%', paddingHorizontal: 25}}>
        {/* <Pressable
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 999,
              top: 15,
              shadowColor: '#FFFFFF',
            }}
            onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="keyboard-arrow-left"
              size={40}
              color={color.black}
            />
          </Pressable> */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: color.black,
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            Forget Password?
          </Text>
          <Text
            style={{
              color: color.black,
              fontSize: 16,
              marginTop: 5,
            }}>
            Enter your E-mail for verification
          </Text>
        </View>
        <View style={{flex: 0.4, marginTop: 30}}>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter your E-mail"
            placeholderTextColor={'#00000090'}
            style={{
              width: '100%',
              // textAlign: 'center',
              borderWidth: 1,
              color: color.black,
              height: 42,
              borderColor: color.black,
              marginTop: 10,

              borderRadius: 10,
              paddingHorizontal: 15,
            }}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
          <TouchableOpacity
            onPress={Submit}
            disabled={disabled ? true : false}
            style={{
              width: '100%',
              height: 42,
              backgroundColor: color.orange,
              borderRadius: 10,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 18, color: color.white, fontWeight: 'bold'}}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <AlertModale message={message} setMessage={setMessage} />
      </View>
      {/* </ScrollView> */}
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
