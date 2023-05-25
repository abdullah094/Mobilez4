import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const SearchDropDown = ({items}) => {
  return (
    <View
      style={{
        width: width,
        paddingVertical: 10,
        zIndex: 999,
        backgroundColor: color.white,
        paddingHorizontal: 10,
      }}>
      {items.map(element => {
        return <Text>{element.name}</Text>;
      })}
    </View>
  );
};

export default SearchDropDown;

const styles = StyleSheet.create({});
