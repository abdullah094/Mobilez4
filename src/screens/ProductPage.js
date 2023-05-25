import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Vibration,
  Platform,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Slider from '../components/Slider';
import {color} from '../constants/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {DESCRIPTION, WISHLIST} from '@env';
import Loading from '../components/Loading';
import call from 'react-native-phone-call';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');
const ProductPage = ({navigation, route}) => {
  const [data, setData] = useState();
  const [seemore, setSeemore] = useState(3);
  const [like, setLike] = useState(false);
  const accessToken = useSelector(state => state.todo.accessToken);
  const profile = useSelector(state => state.todo.profile);
  const {id} = route.params;
  const image_url = 'https://mobilezmarket.com/images/';
  let slider_data = [];
  const link = 'https://api.whatsapp.com/send?phone=+';
  const fetchData = () => {
    const api = DESCRIPTION + id;
    // console.log(api)
    axios
      .get(api)
      .then(response => {
        setData(response?.data.details);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(id);
  const Add_to_Wishlist = () => {
    const api = WISHLIST + id;
    axios
      .post(
        api,
        {
          seller_id: profile.id,
          product_id: id,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(response => {
        Alert.alert(response.data?.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const args = {
    number: '', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  if (data) {
    args.number = data.user.phone;
  }

  const CallWhatsappSms = () => (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        },
        Platform.OS === 'android' && {bottom: 25},
      ]}>
      <TouchableOpacity
        style={styles.commmunication_buttons}
        onPress={() => call(args).catch(console.error)}>
        <MaterialIcon name="phone" size={17} color={color.white} />
        <Text style={styles.communication_buttons_text}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commmunication_buttons}
        onPress={() => {
          const upLink = link + args.number;
          Linking.canOpenURL(link)
            .then(supported => {
              if (!supported) {
                Alert.alert(
                  'Please install whats app to send direct message to students via whats app',
                );
              } else {
                return Linking.openURL(upLink);
              }
            })
            .catch(err => console.error('An error occurred', err));
        }}>
        <MaterialIcon name="wifi-calling" size={17} color={color.white} />
        <Text style={styles.communication_buttons_text}>Whatsapp</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.commmunication_buttons}>
        <MaterialIcon name='sms' size={17} color={color.white}/>
          <Text style={styles.communication_buttons_text}>Sms</Text>
        </TouchableOpacity> */}
    </View>
  );

  if (!data) return <Loading />;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingBottom: 150}}>
        <Pressable
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 999,
            shadowColor: '#FFFFFF',
            shadowOffset: {
              width: 10,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
            borderRadius: 30,
            backgroundColor: 'white',
          }}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="keyboard-arrow-left"
            size={40}
            color={color.black}
          />
        </Pressable>
        <View>
          <Slider data={data.productimages} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width - 30,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.heading,
              {fontSize: 18, color: color.orange, marginBottom: 0},
            ]}>
            ${data.price}
          </Text>
          {/* <Pressable style={[{margin:0,zIndex:999},{marginTop:0,marginRight:5,bottom:0}]} onPress={()=>{
          setLike(!like)                                 //Like product
             //Vibrate device on pressing heart
          }}>
         { like?<MaterialIcon name='favorite' size={30} color={color.red}/>:<MaterialIcon name='favorite-outline' size={30} color={color.red}/>}
          </Pressable> */}
        </View>
        <View style={{width: width - 30}}>
          <Text style={[styles.heading, {marginTop: 0}]}>
            {data.brand} <Text>{data.model}</Text>
          </Text>
          <Text style={{color: color.black, fontSize: 12, marginTop: 5}}>
            Ram: {data.ram}GB | Storage: {data.storage}GB | {data.pta_status}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <MaterialIcon name="location-on" size={13} color={color.orange} />
            <Text
              style={[
                styles.heading,
                {
                  fontSize: 13,
                  fontWeight: 'normal',
                  marginLeft: 1,
                  marginTop: 0,
                },
              ]}>
              {data?.user.city}
            </Text>
          </View>
          <TouchableOpacity
            onPress={Add_to_Wishlist}
            style={{
              marginVertical: 10,
              padding: 5,
              backgroundColor: 'red',
              width: 130,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: color.white, fontWeight: '500', fontSize: 15}}>
              Add to Wishlist
            </Text>
          </TouchableOpacity>
        </View>
        {/* Description */}
        <View style={{width: width - 35, marginTop: 10}}>
          <Text
            style={[
              styles.heading,
              {
                fontWeight: '500',
                fontSize: 15,
                marginVertical: 10,
                marginTop: 10,
              },
            ]}>
            Description
          </Text>
          <Text
            style={{fontWeight: '200', color: color.black}}
            numberOfLines={seemore}>
            {data.description}
          </Text>
          {/* See less see more button */}
          <TouchableOpacity onPress={() => setSeemore(30)}>
            {seemore === 3 ? (
              <Text>See more</Text>
            ) : (
              <TouchableOpacity onPress={() => setSeemore(3)}>
                <Text>See less</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* call whatsapp sms button */}

      <CallWhatsappSms />
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  heading: {color: color.black, fontSize: 20, fontWeight: 'bold', marginTop: 5},
  commmunication_buttons: {
    backgroundColor: color.orange,
    width: 110,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  communication_buttons_text: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
  },
});
