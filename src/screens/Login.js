import { StyleSheet, Text, View,ScrollView,Dimensions,Image,TextInput,TouchableOpacity,ActivityIndicator, Alert  } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import Header from '../components/Header'
import { color } from '../constants/Colors'
import {LOGIN} from '@env'
import axios from 'axios'
import Context from '../data/Context'
import { useDispatch, useSelector } from 'react-redux'
import { reduxSetAccessToken } from '../Redux/Slices'
const {width,height} = Dimensions.get('window')
const Login = ({navigation}) => {
  
  const [email, setEmail] = useState()
  const [password,setPassword] = useState()
  const [loginLoader,setLoginLoader] = useState('Login')
 const {signIn} = useContext(Context)
 const accesstoken = useSelector((state)=>state.todo.accessToken)
 
const dispatch = useDispatch()

  const fetchLogin = () => {
    setLoginLoader( <ActivityIndicator size="small" color='white' />)
  axios.post(LOGIN,
    {
      email: email,
      password:password
    },
    {
      headers:  { "Content-Type": "application/json" },
    })
    .then((response)=>{
      signIn('',response.data.token)
      // console.log(response.data.token)
      dispatch(reduxSetAccessToken(response.data.token))
      setLoginLoader('Login')
      navigation.navigate('TabNavigation', { screen: 'Home' });
    
    })
    .catch((error)=>{
      console.log(error)
      setLoginLoader('Login')
      Alert.alert("Unsuccessful")
    })
  }



  return (
    <>
     <Header onPress={()=>navigation.goBack()}/>
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1,alignItems:'center',backgroundColor:color.gray,paddingBottom:50,justifyContent:'center'}} >
<Image style={{width:250,height:100,marginBottom:50}} source={require('../assets/mobile-logo.png')}/>
<View style={styles.input_box}>
  <Text style={styles.box_heading}>Email</Text>
  <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}/>
</View>

<View style={styles.input_box}>
  <Text style={styles.box_heading}>Password</Text>
  <TextInput style={styles.input} value={password} onChangeText={(text)=>setPassword(text)}/>
</View>

<TouchableOpacity onPress={fetchLogin}
 style={{backgroundColor:color.orange,width:350,height:50,justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:20}}>
  <Text style={{color:color.white,fontWeight:'bold',fontSize:20}}>{loginLoader}</Text>
</TouchableOpacity>
<View style={{flexDirection:'row',marginTop:15}}>
  <TouchableOpacity style={{padding:5}} onPress={()=>navigation.navigate('ForgotPassword')}>
<Text>Forgot your password?</Text>
</TouchableOpacity>
</View>
<TouchableOpacity style={{marginTop:10,padding:5}} onPress={()=>navigation.navigate('SignUp',{city:'Karachi'})}>
  <Text style={{color:'blue',}}>Register</Text>
</TouchableOpacity>
    </ScrollView>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  input_box:{
    width:350,
    marginTop:15
  },
  input:{
    borderRadius:10,
    padding:5,
    paddingHorizontal:10,
   color:color.black,
    height:50,
    backgroundColor:color.white,
  },
  box_heading:{
    fontSize:15,
    color:color.black,
    fontWeight:'bold',
    marginBottom:5,
    marginLeft:2
  }
})