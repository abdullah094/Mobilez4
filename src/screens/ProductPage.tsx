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
  Share
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Slider from '../components/Slider';
import {color} from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ADD_WISHLIST, DESCRIPTION, REMOVE_WISHLIST, WISHLIST} from '@env';
import Loading from '../components/Loading';
import call from 'react-native-phone-call';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import Flatbox from '../components/Flatbox';
import DropDown from 'react-native-paper-dropdown';
import Header from '../components/Header';
import {
  AddToWishlist,
  RemoveFromWishList,
  selectAccessToken,
  selectWishlist,
  setAccessToken,
} from '../Redux/Slices';
import RecentList from '../components/RecentList';
import {Category} from '../../type';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');
const ProductPage = ({navigation, route}) => {
  const [data, setData] = useState();
  const [recentMobiles, setRecentMobiles] = useState();
  const [images, setImages] = useState();

  const [recentWatches, setRecentWatches] = useState();
  const [recentTablets, setRecentTablets] = useState();
  const [seemore, setSeemore] = useState(3);

  const numberOfLines = seemore ? null : 3;
  const [like, setLike] = useState(false);
  const accessToken = useSelector(setAccessToken);
  const profile = useSelector(state => state.todo.profile);
  const {id} = route.params;
  const image_url = 'https://www.mobilezmarket.com/images/';
  let slider_data = [];
  const link = 'https://wa.me/';
  const relatedAds = data?.related_ads.map((element, index) => {
    let {productimages: image, ...rest} = element;

    return (element = {image: image[0], ...rest, index});
  });
  const moreAds = data?.more_ads.map(element => {
    let {productimages: image, ...rest} = element;

    return (element = {image: image[0], ...rest});
  });

  const dateString = data?.details.created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const _accessToken = useSelector(selectAccessToken);
  const wishlistItemsExit: Number[] = useSelector(selectWishlist);
  const exist = wishlistItemsExit.includes(data?.details?.id);

  const dispatch = useDispatch();

  let headers = {
    Authorization: `Bearer ${_accessToken}`,
    'Content-Type': 'multipart/form-data',
  };
  const AddToFavorite = () => {
    if (_accessToken == null) {
      Alert.alert('You must be logged in to add to favorite');
      return;
    }
    console.log(data.details.id);

    if (exist) {
      axios
        .post(
          REMOVE_WISHLIST + `/${data?.details?.id}`,
          {product_id: data?.details?.id},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(RemoveFromWishList(data?.details?.id));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
    } else
      axios
        .post(
          ADD_WISHLIST + `/${data?.details?.id}`,
          {product_id: data?.details?.id},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(AddToWishlist(data?.details?.id));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
  };

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
  const api = DESCRIPTION + id;
  const fetchImages = () => {
    axios
      .get(api)
      .then(response => {
        setImages(response?.data.details.productimages);
        console.log("=============aplleeeee",response.data.url)
      })
      .catch(error => {
        console.log(error);
      });
  };
// console.log("================",api)
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this product!',
        // url:data
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared successfully
          console.log('Product shared successfully');
        } else {
          // Shared cancelled
          console.log('Product sharing cancelled');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed the share sheet
        console.log('Product sharing dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the product');
    }
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
    args.number = data?.details.user.phone;
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
      <TouchableOpacity style={styles.commmunication_buttons} onPress={()=>{navigation.navigate('Chat',{to:data.details.user})}}>
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
        <Header title="Product Details" />
        <View style={tw`flex-1 px-4`}>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* <Slider data={data.productimages} /> */}
            <View style={tw`w-[70%]`}>
              <TouchableOpacity
                style={{
                  height: 300,
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
              <TouchableOpacity
                onPress={() => AddToFavorite()}
                style={tw` absolute w-10 h-10 flex items-center justify-center top-3 right-2 bg-gray-100 rounded-full`}>
                <AntDesign
                  name={exist ? 'heart' : 'hearto'}
                  size={30}
                  color={'red'}></AntDesign>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '30%',
                height: 300,
              }}>
              {data?.details.productimages?.slice(0, 3).map(({img, index}) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('Images', {images: images})
                  }>
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

              <Pressable onPress={handleShare}>
  <Ionicons name="share-social-sharp" size={30} color="#0167E6" />
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
              {data.details.category === 'Mobile' ? (
                <>
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
                </>
              ) : null}

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
              {data.details.category === 'Mobile' ? (
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
              ) : null}

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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 7,
                  justifyContent: 'space-between',
                }}>
                <View style={tw`flex-row items-center justify-center`}>
                  <Text
                    style={{
                      color: color.black,
                      fontSize: 15,
                      fontWeight: '700',
                    }}>
                    Date :
                  </Text>
                  <Text
                    style={{
                      color: color.black,
                      fontSize: 15,

                      fontWeight: '400',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    {formattedDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 7,
                  }}>
                  <MaterialIcon
                    name="location-on"
                    size={18}
                    color={color.red}
                  />
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
          </View>
          {/* Description */}
            <Text style={styles.description}>Description</Text>
            <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText} numberOfLines={numberOfLines}>
          {data.details.description}
        </Text>
      </View>
      {!seemore && (
        <TouchableOpacity onPress={() => setSeemore(true)}>
          <Text style={styles.showMoreText}>Show more</Text>
        </TouchableOpacity>
      )}
    </View>
          <RecentList name={Category.RELATED_AD} products={relatedAds} />
          <RecentList name={Category.MORE_AD} products={moreAds} />
        </View>
      </ScrollView>
      <CallWhatsappSms />
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  descriptionContainer: {
    width: width - 30,
    
    padding: 5,
  },
  descriptionText: {
    fontWeight: '500',
    color: 'black',
  },
  showMoreText: {
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
  },
  heading: {
    color: '#2B67F6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#2B67F6',
    fontSize: 20,
    fontWeight: 'bold',
    

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
