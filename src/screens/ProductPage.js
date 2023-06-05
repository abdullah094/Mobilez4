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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {DESCRIPTION, WISHLIST} from '@env';
import Loading from '../components/Loading';
import call from 'react-native-phone-call';
import {useSelector} from 'react-redux';
import {Image} from 'react-native';
import Flatbox from '../components/Flatbox';
import DropDown from 'react-native-paper-dropdown';

const {height, width} = Dimensions.get('window');
const ProductPage = ({navigation, route}) => {
  const [data, setData] = useState();
  const [recentMobiles, setRecentMobiles] = useState();
  const [images, setImages] = useState();

  const [recentWatches, setRecentWatches] = useState();
  const [recentTablets, setRecentTablets] = useState();
  const [seemore, setSeemore] = useState(3);
  const [like, setLike] = useState(false);
  const accessToken = useSelector(state => state.todo.accessToken);
  const profile = useSelector(state => state.todo.profile);
  const {id} = route.params;
  const image_url = 'https://www.mobilezmarket.com/images/';
  let slider_data = [];
  const link = 'https://api.whatsapp.com/send?phone=+';
  const relatedAds = data?.related_ads.map((element, index) => {
    let {productimages: image, ...rest} = element;

    return (element = {image: image[0], ...rest, index});
  });
  const moreAds = data?.more_ads.map(element => {
    let {productimages: image, ...rest} = element;

    return (element = {image: image[0], ...rest});
  });

  const fetchData = () => {
    const api = DESCRIPTION + id;
    // console.log(api)
    axios
      .get(api)
      .then(response => {
        setData(response?.data);
        // console.log('Response======', response.data.related_ads);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const fetchImages = () => {
    const api = DESCRIPTION + id;
    axios
      .get(api)
      .then(response => {
        setImages(response?.data.details.productimages);
        console.log(response?.data.details.productimages);

        // console.log('=================', response?.data.details.productimages);
        // console.log('Response======', response.data.related_ads);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('Images');
  };
  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

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
    args.number = data?.details?.phone;
  }

  const CallWhatsappSms = () => (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '15%',
        },
        Platform.OS === 'android' && {bottom: 25},
      ]}>
      <TouchableOpacity
        style={styles.commmunication_buttons}
        onPress={() => call(args).catch(console.error)}>
        <Ionicons name="call-outline" size={25} color={color.white} />
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
        <FontAwsome name={'whatsapp'} size={25} color={'white'} />
        <Text style={styles.communication_buttons_text}>Whatsapp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.commmunication_buttons}>
        <Ionicons name={'ios-chatbubbles-outline'} size={25} color={'white'} />

        <Text style={styles.communication_buttons_text}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  if (!data || !images) return <Loading />;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 150}}>
        <View
          style={{
            marginTop: 10,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            backgroundColor: 'white',

            height: 70,
            zIndex: 999,
            shadowColor: '#FFFFFF',
            shadowOffset: {
              width: 10,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,

            backgroundColor: 'white',
          }}>
          <Pressable style={{margin: 15}} onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="keyboard-arrow-left"
              size={40}
              color={color.black}
            />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                display: 'flex',
                right: 20,
                color: '#1E2022',
              }}>
              Home
            </Text>
          </View>
        </View>

        <View
          flexDirection="row"
          style={{width: width, paddingHorizontal: 16}}
          justifyContent="space-between">
          {/* <Slider data={data.productimages} /> */}
          <TouchableOpacity
            style={{
              height: 300,
              width: '70%',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Images', {images: images})}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              source={{uri: image_url + data?.details.productimages[0].img}}
            />
          </TouchableOpacity>

          <View
            style={{
              width: '30%',
              height: 300,
            }}>
            {data?.details.productimages?.slice(0, 3).map(({img, index}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Images', {images: images})}>
                <Image
                  key={index}
                  style={styles.productImage}
                  resizeMode="contain"
                  source={{uri: image_url + img}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: color.gray,
          }}>
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
                {fontSize: 20, color: color.black, marginBottom: 0},
              ]}>
              <Text>{data.details.brand}</Text>
              <Text> {data.details.model}</Text>
            </Text>

            <Pressable>
              <Ionicons
                name={'share-social-sharp'}
                size={30}
                color={'#0167E6'}
              />
            </Pressable>
          </View>
          <Text style={{color: '#015DCF', fontSize: 20, fontWeight: '700'}}>
            Rs. {data.details.price.toLocaleString()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            alignItems: 'center',
          }}>
          <View
            style={{
              width: width - 30,
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Storage :
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,
                  alignItems: 'center',
                  fontWeight: '400',
                  paddingHorizontal: 5,
                }}>
                {data.details.storage}GB
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                RAM :
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.ram}GB
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Warrenty :
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.warranty}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Product Condition :
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.product_type}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                PTA Status :
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.pta_status}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Posted By :
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: color.black,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.user.shop_name}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Shop Name :
              </Text>
              <Text
                style={{
                  color: color.grey,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.user.shop_name}
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 15,

                  fontWeight: '700',
                }}>
                Shop Address :
              </Text>
              <Text
                style={{
                  color: color.grey,
                  fontSize: 15,

                  fontWeight: '400',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {data.details.user.shop_address}
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <MaterialIcon name="location-on" size={18} color={color.red} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 1,
                  color: 'black',
                }}>
                {data?.details.user.city}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={{width: width - 35, flexWrap: 'wrap', marginTop: 7}}>
          <Text style={styles.description}>description</Text>
          <Text
            style={{
              fontWeight: '500',
              color: color.grey,

              flexWrap: 'wrap',
              alignItems: 'center',
            }}
            numberOfLines={seemore}>
            {/* {console.log(data.description)} */}
            {data.details.description}
          </Text>
          {/* See less see more button */}
          {/* <TouchableOpacity onPress={() => setSeemore(30)}>
            {seemore === 3 ? (
              <Text>See more</Text>
            ) : (
              <TouchableOpacity onPress={() => setSeemore(3)}>
                <Text>See less</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity> */}
        </View>

        <Flatbox header={'Realted Ads'} onPress={() => {}} data={relatedAds} />
        <Flatbox header={'More Ads'} onPress={() => {}} data={moreAds} />
      </ScrollView>
      <CallWhatsappSms />
      {/* call whatsapp sms button */}
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  heading: {
    color: '#2B67F6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#2B67F6',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 2,

    borderBottomColor: '#2B67F6',
  },
  commmunication_buttons: {
    backgroundColor: '#2B67F6',
    width: 110,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  communication_buttons_text: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
  },
  productImage: {
    width: '100%',
    height: 92,
    margin: 4,
    marginHorizontal: 8,
    borderRadius: 10,
  },
});
