import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const ContactUs = ({navigation}) => {
  return (
    <>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{paddingVertical: 100, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', color: color.black, fontSize: 25}}>
          Tell us about yourself
        </Text>
        <Text style={{color: color.black, marginTop: 10}}>
          Your email address will not be published. Required fields are marked *
        </Text>

        <View style={[styles.box, {marginTop: 40}]}>
          <Text style={styles.box_name}>Name</Text>
          <TextInput style={styles.box_input} />
        </View>

        <View style={styles.box}>
          <Text style={styles.box_name}>Email</Text>
          <TextInput style={styles.box_input} />
        </View>
        <View style={styles.box}>
          <Text style={styles.box_name}>Your Message</Text>
          <TextInput style={[styles.box_input, {height: 200}]} />
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Message submitted');
            navigation.goBack();
          }}
          style={{
            width: 200,
            height: 50,
            backgroundColor: color.orange,
            borderRadius: 25,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: color.white, fontWeight: 'bold', fontSize: 20}}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  box: {
    width: width - 35,
    marginTop: 20,
  },
  box_name: {
    color: color.black,
    fontSize: 15,
    marginLeft: 5,
  },
  box_input: {
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
