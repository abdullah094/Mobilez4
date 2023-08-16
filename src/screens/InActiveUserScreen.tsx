import {useNavigation} from '@react-navigation/native';
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
const InActiveUserScreen = () => {
  const [form, setForm] = useState({
    email: '',
  });
  const navigation = useNavigation();

  const ActiveUser = () => {
    axios
      .post('https://www.mobilezmarket.com/api/email-verify', form)
      .then(response => {
        if (response.data.errors) {
          Alert.alert('Some missing fields or wrong code');
        } else {
          navigation.navigate('NonActiveUserVerify');
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
        <Text style={styles.box_heading}>Email</Text>
        <TextInput
          style={styles.box_input}
          value={form.email}
          onChangeText={text => setForm({...form, email: text})}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          ActiveUser();
          navigation.navigate('NonActiveUserVerify', {email: form.email});
        }}
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
          Send
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InActiveUserScreen;

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
