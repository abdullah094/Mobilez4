import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Description = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Text>Description</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Description

const styles = StyleSheet.create({})