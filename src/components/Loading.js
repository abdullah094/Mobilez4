import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {color} from '../constants/Colors';
const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BarIndicator color={color.orange} size={100} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
