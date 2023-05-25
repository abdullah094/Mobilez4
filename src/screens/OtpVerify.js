import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../constants/Colors';
import axios from 'axios';
import {SUBMITOTP, VERIFY_OTP} from '@env';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const OtpVerify = ({navigation, route}) => {
  const {email} = route.params;
  const [form, setForm] = useState({
    email: email,
    verify_code: '',
    password: '',
    confirm_password: '',
  });

  const Confirm = () => {
    axios
      .post(VERIFY_OTP, form)
      .then(response => {
        if (response.data.errors) {
          Alert.alert('Some missing fields or wrong code');
        } else {
          navigation.navigate('TabNavigation');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
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

      <Text
        style={{
          color: color.orange,
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 100,
          width: width - 70,
        }}>
        Enter the code sent on phone#
      </Text>
      <View style={styles.box}>
        <Text style={styles.box_heading}>OTP</Text>
        <TextInput
          style={styles.box_input}
          value={form.verify_code}
          onChangeText={text => setForm({...form, verify_code: text})}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Password</Text>
        <TextInput
          style={styles.box_input}
          value={form.password}
          onChangeText={text => setForm({...form, password: text})}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Confirm-Password</Text>
        <TextInput style={styles.box_input} />
      </View>
      <TouchableOpacity
        onPress={Confirm}
        style={{
          backgroundColor: color.orange,
          width: 300,
          height: 50,
          borderRadius: 20,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: color.white, fontWeight: 'bold', fontSize: 20}}>
          Confirm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  box: {
    width: 300,
    marginTop: 20,
  },
  box_heading: {
    color: color.black,
    fontSize: 15,
    paddingHorizontal: 15,
    padding: 5,
  },
  box_input: {
    borderWidth: 1,
    borderColor: color.black,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});
