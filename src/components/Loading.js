import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import { color } from '../constants/Colors';
const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <BarIndicator color={color.orange} size={100} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})