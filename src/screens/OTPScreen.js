import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator,Dimensions,Pressable } from 'react-native'
import React,{useState} from 'react'
import { color } from '../constants/Colors'
import axios from 'axios'
import {SUBMITOTP} from '@env'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {width,height} = Dimensions.get('window')
const OTPScreen = ({route,navigation}) => {

    const {email} = route.params
    const [submitText, setSubmitText] = useState("Submit")
    const [otp,setOtp] = useState({
        "email": email,
        "otp_code": ""
    })

    
    const Submit = () => {
        setSubmitText(<ActivityIndicator size="small" color={color.white} />)
        axios.post(SUBMITOTP,otp)
        .then((response)=>{
            setSubmitText("Submit")
            console.log(response.data)
            navigation.navigate('TabNavigation')
        })
        .catch((error)=>{
            console.log(error)
            setSubmitText("Submit")
        })
    }
  return (
    <>
    <View style={{width:width,height:200,position:'absolute',top:0}}>
    <Pressable 
      style={{position:'absolute',left:20,zIndex:999,
      shadowColor: '#FFFFFF',

      }} onPress={()=>navigation.goBack()}>
      <MaterialIcon name='keyboard-arrow-left' size={40} color={color.black}/>
      </Pressable>
    </View>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        
        <Text style={{paddingHorizontal:40,fontWeight:'bold',color:color.black,fontSize:20,textAlign:'center'}}>Enter the OTP code we sent on {email}</Text>
      <TextInput value={otp.otp_code} onChangeText={(text)=>setOtp({...otp,otp_code:text})}
       style={{borderWidth:1,height:60,paddingHorizontal:15,width:200,borderRadius:10,borderColor:color.black,backgroundColor:color.white,marginTop:15,textAlign:'center'}}
    keyboardAppearance='default' keyboardType='number-pad'
      />
      <TouchableOpacity onPress={Submit} style={{width:200,height:60,borderRadius:10,backgroundColor:color.orange,justifyContent:'center',alignItems:'center',marginTop:10}}>
        <Text style={{fontWeight:'bold',color:color.white,fontSize:20}}>{submitText}</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default OTPScreen

const styles = StyleSheet.create({})