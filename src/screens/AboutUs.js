import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {color} from '../constants/Colors';

const AboutUs = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#2B67F6',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2B67F6',
          height: 50,
        }}>
        <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: '500',
            color: 'white',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          AboutUs
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                padding: 10,
                fontWeight: '500',
                color: 'black',
              }}>
              Mobilez Market is Pakistan’s #1 web portal for mobile phones that
              could provide information about various brands, models, features,
              prices, and reviews of mobile phones available in the market. It
              also offers the services to upload ad advertisements of your
              devices such as Mobile phones, Tablets, and Smart Watches for
              which you would want to find a buyer.
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '400',
                color: 'black',
              }}>
              It is not only a hub where buyers and sellers can interact, but it
              is also a comprehensive Mobile Phone portal with a forum dedicated
              to all discussions related to Mobile Phones and a blog that keeps
              the users up to date with the latest happenings in the Mobile
              Phone industry of Pakistan and the world at large.
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '400',
                color: 'black',
              }}>
              At Mobilez Market we believe that we have to provide our visitors
              with the best online experience and this is what our mission
              speaks of - to revolutionize and continuously add value to the way
              people buy and sell Mobile Phones online, in Pakistan. We aim to
              provide our users with the most comprehensive Mobile Phones
              knowledge concerning Pakistan and the world alike and help them
              develop a sense of belonging in the Mobile Phone Industry
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
