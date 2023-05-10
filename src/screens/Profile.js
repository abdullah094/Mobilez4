import { StyleSheet, Text, View, Dimensions,ScrollView,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { color } from '../constants/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';



const {width,height} = Dimensions.get('window')
const Profile = ({navigation}) => {

  const profile = useSelector((state)=>state.todo.profile)
  const image_dimension = 120
  const base_url = 'https://mobilezmarket.com/images/'
  return (
    <>
   <Header onPress={()=>navigation.goBack()}/>
    <ScrollView contentContainerStyle={{alignItems:'center'}}>
     <View style={{width:width,height:150,backgroundColor:color.orange}}/>
     <Image source={{uri:base_url+profile.photo}}
      style={{width:image_dimension,height:image_dimension,borderRadius:image_dimension/2,borderWidth:1,bottom:(image_dimension/2)-20}} />
      <Text style={styles.h1}>{profile.first_name}</Text>
      <Text style={styles.h1}>{profile.last_name}</Text>
      <View style={styles.box}>
<Text style={styles.h2}>First name</Text>
<TextInput style={styles.input}  placeholder={profile.first_name}/>
      </View>

      <View style={styles.box}>
<Text style={styles.h2}>Last name</Text>
<TextInput style={styles.input}  placeholder={profile.last_name}/>
      </View>

      <View style={styles.box}>
<Text style={styles.h2}>Email</Text>
<TextInput style={styles.input} placeholder={profile.email}/>
      </View>

      <View style={styles.box}>
<Text style={styles.h2}>City</Text>
<TextInput style={styles.input} placeholder={profile.city}/>
      </View>

<TouchableOpacity style={{backgroundColor:color.orange,height:50,width:200,borderRadius:25,justifyContent:'center',alignItems:'center',marginTop:25}}>
  <Text style={{color:color.white,fontWeight:'bold',fontSize:18}}>Save Changes</Text>
</TouchableOpacity>



    </ScrollView>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  h1:{fontWeight:'bold',color:color.black,fontSize:20},
box:{
  width:width-50,
  marginTop:25,
 
},
h2:{
  color:color.black,
  fontSize:16,
marginLeft:1
},
input:{
  borderBottomWidth:1,
 height:30,
  marginTop:0,
  paddingBottom:0,
  paddingTop:0,
 padding:0
}
})