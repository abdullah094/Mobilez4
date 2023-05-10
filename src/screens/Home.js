import { StyleSheet, Text, TouchableOpacity, View,Image,Dimensions, SafeAreaView, Platform,ScrollView, TextInput, FlatList, Alert, } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { color } from '../constants/Colors'
import { const_styles } from '../constants/Styles'
import logo from '../assets/mobile-logo.png'
import {data} from '../data/test'
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import HomeFlatlist from '../components/HomeFlatlist'
import {RECENTLY_ADDED_MOBILES,RECENTLY_ADDED_WATCHES,GET_PROFILE_DATA,RECENTLY_ADDED_TABLETS,BRANDS} from '@env'
import axios from 'axios';
import SearchDropDown from '../components/SearchDropDown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import { reduxSetAccessToken,setProfileData,reduxRemoveAccessToken } from '../Redux/Slices'









const {width,height} = Dimensions.get('window')
const Home = ({navigation}) => {
  const isFocused = useIsFocused();

  const [recentMobiles, setRecentMobiles] = useState()
  const [recentWatches, setRecentWatches] = useState()
  const [recentTablets, setRecentTablets] = useState()
  const [searchBoxFocus, setSearchBoxFocus] = useState(false)
  const [searchText, setSearchText] = useState()
  const [searchedItems, setSearchedItems] = useState()
  const [accessToken,setAccessToken] = useState()
  const [profile,setProfile] = useState()
  const [deviceName, setDeviceName] = useState()
  const [reload, setReload] = useState(false)
  const image_url = 'https://mobilezmarket.com/images/';
  const _accesstoken = useSelector((state)=>state.todo.accessToken)
  const dispatch = useDispatch()
  const name = DeviceInfo.getBrand()

 
  DeviceInfo.getDeviceName()
  .then((res)=>{
    setDeviceName(res)
  })
 let _accessToken
 _accessToken = useSelector((state)=>state.todo.accessToken)



  useEffect(() => {
console.log("fetch access token HOme useeffect")
    let user_token;
    setTimeout(async() => {
      user_token = null
      try {
        user_token =  await AsyncStorage.getItem('@user_token')
        setAccessToken(user_token)
        dispatch(reduxSetAccessToken(user_token))
      }
      catch(e){
        if(user_token===null)
        {
          setAccessToken()
          dispatch(reduxRemoveAccessToken())
        }
        console.log(e)
      }
      
    }
    , 200)
  }, [isFocused])

  const entries = [
    require('../assets/ads/1.png'),
    require('../assets/ads/2.png'),
    require('../assets/ads/3.png'),
    require('../assets/ads/4.png')

  ]
  const logos = [
    {
      id: 1,
      image: require('../assets/brand_logos/1.png')
    },
    {
      id: 2,
      image: require('../assets/brand_logos/2.png')
    },
    {
      id: 3,
      image: require('../assets/brand_logos/3.png')
    },
    {
      id: 4,
      image: require('../assets/brand_logos/4.png')
    },
    {
      id: 5,
      image: require('../assets/brand_logos/5.png')
    },
    {
      id: 6,
      image: require('../assets/brand_logos/6.png')
    },
    {
      id: 7,
      image: require('../assets/brand_logos/7.png')
    },
    {
      id: 8,
      image: require('../assets/brand_logos/8.png')
    },
    {
      id: 9,
      image: require('../assets/brand_logos/9.png')
    },
    {
      id: 10,
      image: require('../assets/brand_logos/10.png')
    },
    {
      id: 11,
      image: require('../assets/brand_logos/11.png')
    },
    {
      id: 12,
      image: require('../assets/brand_logos/12.png')
    },
    {
      id: 13,
      image: require('../assets/brand_logos/13.png')
    },
    {
      id: 14,
      image: require('../assets/brand_logos/14.png')
    },
    {
      id: 15,
      image: require('../assets/brand_logos/15.png')
    },
    {
      id: 16,
      image: require('../assets/brand_logos/16.png')
    },
    {
      id: 17,
      image: require('../assets/brand_logos/17.png')
    },
    {
      id: 18,
      image: require('../assets/brand_logos/18.png')
    },
    {
      id: 19,
      image: require('../assets/brand_logos/19.png')
    },
    {
      id: 20,
      image: require('../assets/brand_logos/20.png')
    },
    {
      id: 21,
      image: require('../assets/brand_logos/21.png')
    },
    {
      id: 22,
      image: require('../assets/brand_logos/22.png')
    },
  ]
 const fetchRecentMobileData = async() => {

axios.get(RECENTLY_ADDED_MOBILES)
.then((response)=>{
  setRecentMobiles(response.data.mobiles)
})
.catch((error)=>{
  console.log("mobileData"+error)
}
)
 }
const fetchTabletData = async() =>{
  axios.get(RECENTLY_ADDED_TABLETS)
  .then((response)=>{
    setRecentTablets(response.data.tablets)
  })
  .catch((error)=>{
    console.log("Tablet"+error)
  })
}

 const fetchRecentWatches = () => {
axios.get(RECENTLY_ADDED_WATCHES)
.then((response)=>{
  setRecentWatches(response.data.watches)
})
.catch((error)=>{
  console.log("Watches"+error)
})
 }

 console.log(accessToken)
 const fetchProfileData = async() => {
await axios.get(GET_PROFILE_DATA,{
    headers: { Authorization: `Bearer ${accessToken}` }
})
.then((response)=>{
 
  const _profile = response.data.profile
  setProfile(_profile)
  dispatch(setProfileData(_profile))

})
.catch((error)=>{
  console.log("ProfileData "+error)
})
 }

 useEffect(()=>{
  fetchRecentMobileData();
  fetchRecentWatches();
  fetchTabletData();
  if(accessToken)
  fetchProfileData();
}
 ,[accessToken])



 const _renderItem = ({item, index}) => {
    return (
        <View style={{width:'100%',height:'100%',backgroundColor:color.white}}>
            <Image style={{width:'100%',height:'100%'}} source={item} resizeMode='contain'/>
        </View>
    );
}
const FlatlistHomeHeader = (props) => (
  <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center',justifyContent:'space-between'}}>
    <View style={styles.orange_line_heading}/>
  <Text style={styles.heading}>{props.header_name}</Text>
  <View style={styles.orange_line_heading}/>
  </View>
)
const FlatListBox = (props) => (
  <View style={{width:width-20,marginTop:15}}>
  {/* bar with heading and view more */}
  <FlatlistHomeHeader header_name={props.header} onPress={props.onPress}/>
  {/* flatlist  */}
<View style={styles._flatlist}>
<HomeFlatlist data={props.data} type={props.type} />
</View>

</View>
)
if(!recentMobiles||!recentWatches)
return(
  <Loading/>
)
  return (
    <ScrollView contentContainerStyle={{alignItems:'center',backgroundColor:color.white,paddingBottom:100}} 
    showsVerticalScrollIndicator={false}
    stickyHeaderHiddenOnScroll={true}
    stickyHeaderIndices={[0]}
    >


   <SafeAreaView style={styles.header}>       
<SafeAreaView 
style={{flexDirection:'row',justifyContent:'space-between', width:width-20,alignItems:'center'}}>
  <Image style={{width:150,height:60}} source={logo}/>

  {/* login Register */}
{accessToken?
<TouchableOpacity disabled onPress={()=>navigation.navigate('Profile')}
   style={{alignItems:'center',height:'100%',width:100}}>

{ 
 profile&&
  <>
  <Text style={{color:color.black}}>Welcome</Text>
<Text style={{color:color.black,fontWeight:'bold'}}>{profile.first_name}</Text>
</>
}

</TouchableOpacity>
:
<TouchableOpacity style={{alignItems:'center'}} onPress={()=>navigation.navigate('Login')}>
 
 
    <Text style={{color:color.orange,fontSize:15}}>{"Login/Register"}</Text>
    </TouchableOpacity>
    }
</SafeAreaView>
<View style={{marginTop:10,width:width-20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
<TextInput 
  onFocus={()=>navigation.navigate('SearchScreen')} 
 placeholder='Search'
style={{backgroundColor:'white',width:'95%',height:40,borderRadius:10,padding:5,paddingHorizontal:10,marginTop:5}}/>

</View>
   </SafeAreaView>        
                                                                                            {/* /header finsihes here */}
 
<View style={[{width:width,marginVertical:5,alignItems:'center'},{height:220}]}>
<Carousel
           
              data={entries}
              renderItem={_renderItem}
              sliderWidth={width-20}
              itemWidth={width-20}
              layout={'stack'} 
           
            />
</View>
{/* Tabs */}
<View style={styles.tabBox}>
                                                                                 {/* row1 */}
<View style={styles.tab_box_rows}>
                                                                                  {/* box1 */}
  <TouchableOpacity style={styles.tab_box} onPress={()=>navigation.navigate('Listings',{name:"New Phones"})}>
<Image style={styles.category_image} source={require('../assets/tabIcons/01.png')} resizeMode='contain'/>
<Text style={styles.tab_text} numberOfLines={3}>New Phones</Text>
  </TouchableOpacity>

                                                                                   {/* box2 */}
<TouchableOpacity style={styles.tab_box} onPress={()=>navigation.navigate('Listings',{name:"Used Phones"})}>
<Image style={styles.category_image}  source={require('../assets/tabIcons/02.png')} resizeMode='contain'/>
<Text style={styles.tab_text}>Used Phones</Text>
</TouchableOpacity>
                                                                                   {/* box3 */}
<TouchableOpacity style={styles.tab_box} onPress={()=>accessToken? navigation.navigate('PostAnAd'):
Alert.alert("Please Login first")
}>
<Image style={styles.category_image}  source={require('../assets/tabIcons/03.png')} resizeMode='contain'/>
<Text style={styles.tab_text}>Post an Ad</Text>
</TouchableOpacity>
</View>
                                                                            {/* row2 */}

</View>

<FlatListBox header={'Recently Posted Phones'} data={recentMobiles} type={"phones"}  />
{/* used phones */}
<FlatListBox header={'Recently Posted Watches'} data={recentWatches} type={"watches"} />

<FlatListBox header={'Recently Posted Tablets'} data={recentTablets} type={"tablets"} />
  <View style={{width:width,height:100,justifyContent:'center',alignItems:'center',backgroundColor:color.orange}}>
<Text style={{color:color.white,fontWeight:'bold',fontSize:20}}>{name} {deviceName}</Text>
  </View>

  <View style={{marginVertical:40}}>
    <FlatList
    horizontal
    data={logos}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
      <Image
      style={{width:70,height:70,marginHorizontal:20}}
      source={item.image}
      />
    )}
    />
  </View>
    </ScrollView>
    
  )

  
}

export default Home

const styles = StyleSheet.create({
  header:{backgroundColor:color.white,width:width,alignItems:'center',justifyContent:'flex-end',elevation:10,zIndex:10,shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor : "#0000", // invisible color
  },
  paddingTop:30,
  
paddingVertical:5
},

tabBox:{
  backgroundColor:'white',
  width:width-20,
  justifyContent:'space-evenly',
  alignItems:'center',
paddingVertical:20,
  borderRadius:15,
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor : "#0000" // invisible color
  },
  marginVertical:5
},
tab_box_rows:{
  height:100,
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-evenly',
},
tab_box:{
  width:110,
  height:120,
  borderColor:color.black,
  alignItems:'center',
  justifyContent:'center',
  // borderWidth:1,
  padding:2,
  borderRadius:10,
  backgroundColor:color.white,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,
},
tab_text:{
  color:'gray',
  // fontWeight:'bold',
  fontSize:10,
  marginVertical:3,
  // backgroundColor:'orange',
  margin:2,
  textAlign:'center',
  width:'80%'

},
heading:{
  color:color.black,
  fontSize:20,
  fontWeight:'bold'
},
viewmore_text:{
  color:color.orange,
  fontSize:15
},
_flatlist:{
  marginBottom:10
},
category_image:{height:40,width:40,},
orange_line_heading:{borderTopWidth:1,borderBottomWidth:1,height:8,borderColor:color.orange,flexDirection:'row',flex:1,marginHorizontal:10}
}
)