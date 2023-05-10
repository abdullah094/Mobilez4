import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View ,Dimensions,Pressable, Alert} from 'react-native'
import React,{useState} from 'react'
import { color } from '../constants/Colors'
import axios from 'axios'
import {SUBMITOTP,FORGOT_PASSWORD} from '@env'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const {width,height} = Dimensions.get('window')
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState()

  const Submit = () => {
    axios.post(FORGOT_PASSWORD,{
      email: email
    })
    .then((response)=>{
      Alert.alert(response.data.message)
      navigation.navigate('OtpVerify',{email:email})
    })
    .catch((error)=>{
     Alert.alert("User does not exist")
    })
  }

  return (
    <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
       <View style={{width:width,height:200,position:'absolute',top:0}}>
    <Pressable 
      style={{position:'absolute',left:20,zIndex:999,
      shadowColor: '#FFFFFF',

      }} onPress={()=>navigation.goBack()}>
      <MaterialIcon name='keyboard-arrow-left' size={40} color={color.black}/>
      </Pressable>
    </View>
      <Text style={{color:color.orange,fontWeight:'bold',fontSize:25,marginTop:200}}>Enter you email</Text>
      <TextInput keyboardType='email-address' style={{width:290,textAlign:'center',borderWidth:1,height:50,borderColor:color.black,marginTop:10,backgroundColor:color.white,borderRadius:20,paddingHorizontal:15}}
       value={email} onChangeText={(text)=>setEmail(text)}
      />
      <TouchableOpacity onPress={Submit}
       style={{width:290,height:50,backgroundColor:color.orange,borderRadius:20,marginTop:10,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:18,color:color.white,fontWeight:'bold'}}>Continue</Text>
      </TouchableOpacity>
    
    </ScrollView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})