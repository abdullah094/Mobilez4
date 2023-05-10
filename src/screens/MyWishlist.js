import { ScrollView, StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { color } from '../constants/Colors'
import axios from 'axios'
import {WISHLIST_GET} from '@env'
import { useSelector } from 'react-redux'

const {width,height} = Dimensions.get('window')
const MyWishlist = () => {
  const [data, setData] = useState([])
  const accessToken = useSelector((state)=>state.todo.accessToken)
  const base_url = 'https://mobilezmarket.com/images/'
  const fetchData = () => {
    axios.get(WISHLIST_GET,{
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response)=>{
      setData(response.data.my_wishlist)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  const Header = () => {
    return(
      
    // header
       <View style={{width:width,height:100,backgroundColor:color.orange,flexDirection:'row',alignItems:'flex-end'}}>
       <Text style={{fontWeight:'500',color:color.white,fontSize:20,margin:10}}>My Wishlist</Text>
           </View>
          
    )
  }
  return (
  
   
 
  <FlatList
  ListHeaderComponent={<Header/>}
  data={data}
  contentContainerStyle={{alignItems:'center',paddingBottom:100}}
  keyExtractor={(item)=>item.id}
  renderItem={({item})=>(
   <View style={{width:width-30,height:150,borderRadius:15,marginTop:20,backgroundColor:color.white,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<Image style={{width:120,height:120,borderRadius:10,backgroundColor:color.gray}} resizeMode='contain' source={{uri:base_url+item.images.img}}/>
<View style={{width:220,height:120,marginLeft:10}}>
<Text style={{color:color.black,fontSize:15}} numberOfLines={2}>{item.product.brand} {item.product.model} </Text>
<Text style={{color:color.orange,fontWeight:'500',fontSize:15,marginTop:5}}>{item.product.price}</Text>
{
  (item.product.ram||item.product.storage)&&
<Text style={{color:'gray',marginTop:2,fontSize:12}}>{item.product?.ram}GB | {item.product?.storage}GB</Text>
}
</View>
   </View>
  )
}
  />

  )
}

export default MyWishlist

const styles = StyleSheet.create({})