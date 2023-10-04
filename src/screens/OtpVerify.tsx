import {VERIFY_OTP} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
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
const OtpVerify = ({navigation, route}) => {
  const {email} = route.params;
  const [form, setForm] = useState({
    email: email,
    verify_code: '',
    password: '',
    confirm_password: '',
  });
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const Confirm = () => {
    if (form.verify_code?.length < 1) {
      setMessage('Please enter OTP');
    } else if (form.password?.length < 1) {
      setMessage('Please enter paswword');
    } else if (form.confirm_password?.length < 1) {
      setMessage('Please enter confirm password');
    } else {
      setDisable(true);
      axios
        .post(VERIFY_OTP, form)
        .then(response => {
          setDisable(false);

          if (response.data.errors) {
            setMessage(response.data.errors);
            console.log('response.data.errors', response.data.errors);
          } else {
            console.log('response.data else', response.data);

            setMessage(response.data?.password);

            navigation.navigate('Login');
          }
        })
        .catch(error => {
          setDisable(false);
          console.log('error', error);
        });
    }
  };
  return (
    <>
      <Header title="Reset Password" icon={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        {/* <View style={{width: width, height: 200, position: 'absolute', top: 0}}>
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
        </View> */}
        <View style={{flex: 1, width: '100%', paddingHorizontal: 25}}>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: color.black,
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Reset Password
            </Text>
            <Text
              style={{
                color: color.black,
                fontSize: 16,
                marginTop: 5,
              }}>
              Enter the code sent on your E-mail and reset your new password
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.box}>
              <Text style={styles.box_heading}>OTP</Text>
              <TextInput
                style={styles.box_input}
                value={form.verify_code}
                placeholder="Enter the OTP"
                keyboardType="number-pad"
                placeholderTextColor={'#00000080'}
                onChangeText={text => setForm({...form, verify_code: text})}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.box_heading}>New Password</Text>
              <TextInput
                style={styles.box_input}
                value={form.password}
                placeholder="Enter the new password"
                placeholderTextColor={'#00000080'}
                onChangeText={text => setForm({...form, password: text})}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.box_heading}>Confirm New Password</Text>
              <TextInput
                style={styles.box_input}
                value={form.confirm_password}
                placeholder="Enter the confirm password"
                placeholderTextColor={'#00000080'}
                onChangeText={text =>
                  setForm({...form, confirm_password: text})
                }
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={Confirm}
            disabled={disable ? true : false}
            style={{
              backgroundColor: color.orange,
              width: '100%',
              height: 42,
              borderRadius: 10,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: color.white, fontWeight: 'bold', fontSize: 18}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>

        <AlertModale message={message} setMessage={setMessage} />
      </ScrollView>
    </>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    marginTop: 10,
  },
  box_heading: {
    color: color.black,
    fontSize: 15,
    padding: 5,
    fontWeight: '600',
  },
  box_input: {
    borderWidth: 1,
    borderColor: color.black,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: color.black,
    width: '100%',
    height: 45,
  },
});
