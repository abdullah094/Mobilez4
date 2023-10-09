import {SUBMIT_OTP} from '@env';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import React, {ReactNode, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectAccessToken, setProfileData} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const OTPScreen = ({route, navigation}) => {
  const {phone} = route.params;
  const accessToken = useSelector(selectAccessToken);
  const [message, setMessage] = useState('');
  const [otpcode, setOtpcode] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const [submitText, setSubmitText] = useState<ReactNode>('Submit');
  const [resend, setResend] = useState<ReactNode>('Resend Now');
  const [otp, setOtp] = useState({
    phone_number: phone,
    otp_code: '',
  });
  console.log('otp?.otp_code', otp?.otp_code);

  const Submit = () => {
    setSubmitText(<ActivityIndicator size="small" color={color.white} />);

    axios
      .post(SUBMIT_OTP, otp, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        if (response.data.errors) {
          console.log('errors', response.data.errors);
          setMessage('Try Again');
          setSubmitText('Submit');
          setOtp({...otp, otp_code: ''});
        } else if (response.data.status == true) {
          // setSubmitText('Submit');
          // setOtp({...otp, otp_code: ''});
          dispatch(setProfileData(response.data.data));
          setMessage(response.data.message);
          navigation.navigate('TabNavigation', {screen: 'Home'});
        }
      })
      .catch(error => {
        setMessage(error.message);
        setSubmitText('Submit');
        setOtp({...otp, otp_code: ''});
      });
  };
  const ResendOTP = () => {
    setDisabled(true);
    if (phone.length < 7 || phone.length > 13) {
      // Alert.alert('Phone Number is invalid');
      setMessage('Phone Number is invalid');
      return;
    }
    axios
      .post(
        'https://www.mobilezmarket.com/api/resend-otp',
        {
          phone_number: phone,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(response => {
        const data = response.data;

        if (data.errors) {
          Alert.alert(JSON.stringify(data.errors.phone_number[0]));
          setOtpcode(false);
          setResend('Resend');
        } else {
          setMessage(data.message);

          setOtpcode(true);
          setResend('Resend');
        }

        setTimeout(() => {
          setDisabled(false);
        }, 30000);
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 419') {
          setMessage('Number Already exist');
        } else {
          Alert.alert('Failed', error.message);
        }
      });
  };
  return (
    <>
      {/* <View style={{width: width, height: 200, position: 'absolute', top: 0}}> */}
      {/* <Pressable
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
        </Pressable> */}
      {/* </View> */}
      <Header title="OTP" />

      <View
        style={{
          flex: 1,
          // alignItems: 'center',
          paddingTop: 30,
          paddingHorizontal: 15,
        }}>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: color.black,
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            OTP Verification
          </Text>
          <Text
            style={{
              color: color.black,
              fontSize: 16,
              marginTop: 5,
            }}>
            Enter the OTP sent on your number for verification
          </Text>
        </View>
        {/* <Text
          style={{
            // paddingHorizontal: 40,
            fontWeight: 'bold',
            color: color.black,
            fontSize: 20,
            // textAlign: 'center',
            marginTop: 20,
          }}>
          OTP Verification
        </Text> */}
        {/* <TextInput
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
        /> */}
        <View style={{alignItems: 'center'}}>
          <OTPInputView
            style={{width: '90%', height: 250}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              setOtp({...otp, otp_code: code});
            }}
          />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text>{" Did'nt recieve OTP? "}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={ResendOTP}>
              <Text
                style={{
                  fontWeight: '600',
                  color: color.blue,
                }}>
                {resend}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={Submit}
          style={{
            width: '100%',
            height: 42,
            borderRadius: 10,
            backgroundColor: color.orange,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{fontWeight: 'bold', color: color.white, fontSize: 16}}>
            {submitText}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={ResendOTP}
          style={{
            width: 200,
            height: 60,
            borderRadius: 10,
            backgroundColor: color.orange,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: color.white, fontSize: 20}}>
            {resend}
          </Text>
        </TouchableOpacity> */}
      </View>
      <AlertModale message={message} setMessage={setMessage} />
    </>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: color.blue,
  },
});
