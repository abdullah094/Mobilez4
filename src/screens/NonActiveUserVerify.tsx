import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');

const NonActiveUserVerify = () => {
  const route = useRoute();
  const {email} = route.params || {};

  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: email,
    otp: '',
  });
  const OTPVerification = () => {
    axios
      .post('https://www.mobilezmarket.com/api/active-account ', form)
      .then(response => {
        if (response.data.errors) {
          Alert.alert('Some missing fields or wrong code');
        } else {
          console.log(response.data.message);
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: color.orange,
            fontWeight: 'bold',
            fontSize: 25,
            marginTop: 100,
          }}>
          Enter the code sent on Email
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>OTP</Text>
        <TextInput
          style={styles.box_input}
          value={form.otp}
          onChangeText={text => setForm({...form, otp: text})}
        />
      </View>
      {/* <View style={styles.box}>
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
      </View> */}
      <TouchableOpacity
        onPress={OTPVerification}
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

export default NonActiveUserVerify;

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
    color: color.black,
  },
});
