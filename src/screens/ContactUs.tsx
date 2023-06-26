import React from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Location from 'react-native-vector-icons/Entypo';
import Email from 'react-native-vector-icons/Zocial';
import tw from 'twrnc';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const ContactUs = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView>
          <Header title="Contact Us" />
          <View style={tw`flex-1 items-center justify-center p-4`}>
            <Text
              style={{fontWeight: 'bold', color: color.black, fontSize: 25}}>
              Tell us about yourself
            </Text>
            <Text style={{color: color.black, marginTop: 10}}>
              Your email address will not be published. Required fields are
              marked *
            </Text>

            <View style={[styles.box, {marginTop: 40}]}>
              <Text style={styles.box_name}>Name</Text>
              <TextInput
                placeholder="Name"
                placeholderTextColor={'grey'}
                style={styles.box_input}
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.box_name}>Email</Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={styles.box_input}
              />
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
              <Text
                style={{color: color.white, fontWeight: 'bold', fontSize: 20}}>
                Submit
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',

                width: width - 30,
                flexWrap: 'wrap',
                paddingTop: 20,
              }}>
              <Email name="email" size={35} color={color.orange} />
              <View
                style={{
                  width: 220,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontWeight: '400', color: 'black'}}>
                  info@mobilezmarket.com
                </Text>
                <Text style={{fontWeight: '400', color: 'black'}}>
                  support@mobilezmarket.com
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',

                width: width - 30,
                flexWrap: 'wrap',
                paddingTop: 20,
              }}>
              <Location name="location" size={35} color={color.red} />
              <View
                style={{
                  width: 220,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontWeight: '400', color: 'black'}}>
                  DHA Karachi, Pakistan
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    padding: 16,
  },
  header: {
    width: width,
    paddingHorizontal: 24,

    backgroundColor: '#015dcf',
    zIndex: 10,
  },
});
