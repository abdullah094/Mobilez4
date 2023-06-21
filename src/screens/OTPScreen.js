import {SUBMITOTP} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const OTPScreen = ({route, navigation}) => {
  const {phone} = route.params;
  const [submitText, setSubmitText] = useState('Submit');
  const [otp, setOtp] = useState({
    phone_number: phone,
    otp_code: '',
  });
  console.log(SUBMITOTP);

  console.log(otp);

  const Submit = () => {
    setSubmitText(<ActivityIndicator size="small" color={color.white} />);

    axios
      .post(SUBMITOTP, otp)
      .then(response => {
        if (response.data.errors) {
          Alert.alert('Try again');
          setSubmitText('Submit');
          setOtp({...otp, otp_code: ''});
        } else if (response.data.message) {
          if (response.data.status === 419) {
            Alert.alert('Wrong Otp', 'Try again');
          } else if (response.data.status) {
            setSubmitText('Submit');
            setOtp({...otp, otp_code: ''});
            Alert.alert(response.data.message);
            navigation.navigate('TabNavigation', {screen: 'Home'});
          }
        }
      })
      .catch(error => {
        Alert.alert('Failed', 'Try again');
        setSubmitText('Submit');
        setOtp({...otp, otp_code: ''});
      });
  };
  return (
    <>
      <View style={{width: width, height: 200, position: 'absolute', top: 0}}>
        <Pressable
          style={{
            position: 'absolute',
            left: 20,
            zIndex: 999,
            shadowColor: '#FFFFFF',
          }}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="keyboard-arrow-left"
            size={40}
            color={color.black}
          />
        </Pressable>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            paddingHorizontal: 40,
            fontWeight: 'bold',
            color: color.black,
            fontSize: 20,
            textAlign: 'center',
          }}>
          Enter the OTP code we sent on your Phone
        </Text>
        <TextInput
          value={otp.otp_code}
          onChangeText={text => setOtp({...otp, otp_code: text})}
          style={{
            borderWidth: 1,
            height: 60,
            paddingHorizontal: 15,
            color: color.black,
            width: 200,
            borderRadius: 10,
            borderColor: color.black,

            marginTop: 15,
            textAlign: 'center',
          }}
          keyboardAppearance="default"
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={Submit}
          style={{
            width: 200,
            height: 60,
            borderRadius: 10,
            backgroundColor: color.orange,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: color.black, fontSize: 20}}>
            {submitText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({});
