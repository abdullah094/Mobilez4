import {DESCRIPTION} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import call from 'react-native-phone-call';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import AddToWishList from '../components/AddToWishList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RecentList from '../components/RecentList';
import {color} from '../constants/Colors';
import {Category, ProductDetails} from '../types';

const {height, width} = Dimensions.get('window');
const ProductPage = ({navigation, route}) => {
  const [data, setData] = useState<ProductDetails>();
  const {id} = route.params;
  const image_url = 'https://www.mobilezmarket.com/images/';
  const link = 'https://wa.me/';
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;
  const {details, related_ads, more_ads} = data;
  const dateString = details.created_at;

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

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

  const args = {
    number: '', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  if (data) {
    args.number = details.user.phone;
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
        <FontAwesome name={'whatsapp'} size={25} color={'white'} />
        <Text style={styles.communication_buttons_text}>Whatsapp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commmunication_buttons}
        onPress={() => {
          navigation.navigate('Chat', {to: data.details.user});
        }}>
        <Ionicons name={'ios-chatbubbles-outline'} size={25} color={'white'} />

        <Text style={styles.communication_buttons_text}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

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
                onPress={() =>
                  navigation.navigate('Images', {
                    images: data.details.productimages,
                  })
                }>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  source={{uri: image_url + details.productimages[0].img}}
                />
              </TouchableOpacity>
              <AddToWishList
                ProductId={details.id}
                style={tw` absolute w-10 h-10 flex items-center justify-center top-3 right-2 bg-gray-100 rounded-full`}
              />
            </View>
            <View
              style={{
                width: '30%',
                height: 300,
              }}>
              {details.productimages?.slice(0, 3).map(({img, id}, index) => (
                <TouchableOpacity
                  key={id}
                  onPress={() =>
                    navigation.navigate('Images', {
                      images: data.details.productimages,
                    })
                  }>
                  <Image
                    style={styles.productImage}
                    resizeMode="contain"
                    source={{uri: image_url + img}}
                  />
                  {index == 2 && details.productimages.length - 3 != 0 && (
                    <View
                      // margin: 4,
                      // marginHorizontal: 8,
                      style={tw`absolute inset-0 bg-black/20  ml-2 my-1 -mr-2 rounded-[10px] items-center justify-center`}>
                      <Text style={tw`text-white text-2xl`}>
                        +{details.productimages.length - 3}
                      </Text>
                    </View>
                  )}
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
                    {details.user.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* Description */}
          <Text style={styles.description}>Description</Text>
          <View style={styles.container}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText} numberOfLines={3}>
                {data.details.description}
              </Text>
            </View>
            {/* {!seemore && (
              <TouchableOpacity onPress={() => setSeemore(true)}>
                <Text style={styles.showMoreText}>Show more</Text>
              </TouchableOpacity>
            )} */}
          </View>
          <RecentList name={Category.RELATED_AD} products={related_ads} />
          <RecentList name={Category.MORE_AD} products={more_ads} />
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
