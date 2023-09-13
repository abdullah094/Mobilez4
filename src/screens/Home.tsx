import {GET_PROFILE_DATA, WISHLIST_GET} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';

import {
  selectAccessToken,
  setAccessToken,
  setProfileData,
  setWishList,
} from '../Redux/Slices';

import FontAwesome from 'react-native-vector-icons/Entypo';
import AppUpdateScreen from '../components/AppUpdateComponent';
import HomeSlider from '../components/HomeSlider';
import RecentList from '../components/RecentList';
import {color} from '../constants/Colors';
import {Category, Profile} from '../types';
import SearchScreen from './SearchScreen';
const {width, height} = Dimensions.get('window');
const Home = ({navigation}) => {
  const [profile, setProfile] = useState<Profile | null>();
  const [deviceName, setDeviceName] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const [heading, setHeading] = useState('Home');
  const [showModale, setShowModale] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [showVersionAlert, setShowVersionAlert] = useState<boolean>(true);
  const image_url = 'https:/www.mobilezmarket.com/images/';
  const accessToken = useSelector(selectAccessToken);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const name = DeviceInfo.getBrand();
  setTimeout(() => {
    setHeading(`${name}'s ${deviceName}`);
  }, 5000);
  DeviceInfo.getDeviceName().then((res: string) => {
    setDeviceName(res);
  });

  useEffect(() => {
    const handleDeepLink = async () => {
      // const url1 = 'https://www.mobilezmarket.com/product-detail/180/Apple/4';
      // const parts = url1.split('/');
      // const number = parts[parts.length - 3];
      // console.log({number});
      // navigation.navigate('ProductPage', {id: number});

      const url = await Linking.getInitialURL();

      if (url) {
        // Process the deep link URL here

        console.log('Deep link URL:', url);
        const parts = url.split('/');
        const number = parts[parts.length - 3];
        navigation.navigate('ProductPage', {id: number});
      }
    };

    const Nav = async (event: {url: string}) => {
      const url = event.url;
      if (url) {
        // Process the deep link URL here

        console.log('Deep link URL:', url);
        const parts = url.split('/');
        const number = parts[parts.length - 3];
        navigation.navigate('ProductPage', {id: number});
      }
    };

    handleDeepLink();

    // Register a listener for future deep link events
    Linking.addEventListener('url', Nav);
  }, []);

  useEffect(() => {
    console.log('Getting Token From AsyncStorage');

    const getUserToken = async () => {
      try {
        const user_token = await AsyncStorage.getItem('@user_token');
        console.log('user_token', user_token);
        if (user_token == null) {
          setProfile(null);
        }
        dispatch(setAccessToken(user_token));
        fetchProfileData(user_token);
        getWishlistItems(user_token);
      } catch (e) {
        console.log("Token Don't Exist Logout User", e);
      }
    };
    getUserToken();
  }, [accessToken]);

  const getWishlistItems = accessToken => {
    axios
      .get(WISHLIST_GET, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        dispatch(setWishList(response.data.data.map(x => x.id)));
      })
      .catch((reason: AxiosError) => {
        // if (reason.response!.status === 401) {
        //   dispatch(logoutUser);
        //   navigation.navigate('Login');
        // }
        console.log(reason.message);
      });
  };

  const logos = [
    {
      id: 1,
      image: require('../assets/brand_logos/1.png'),
    },
    {
      id: 2,
      image: require('../assets/brand_logos/2.png'),
    },
    {
      id: 3,
      image: require('../assets/brand_logos/3.png'),
    },
    {
      id: 4,
      image: require('../assets/brand_logos/4.png'),
    },
    {
      id: 5,
      image: require('../assets/brand_logos/5.png'),
    },
    {
      id: 6,
      image: require('../assets/brand_logos/6.png'),
    },
    {
      id: 7,
      image: require('../assets/brand_logos/7.png'),
    },
    {
      id: 8,
      image: require('../assets/brand_logos/8.png'),
    },
    {
      id: 9,
      image: require('../assets/brand_logos/9.png'),
    },
    {
      id: 10,
      image: require('../assets/brand_logos/10.png'),
    },
    {
      id: 11,
      image: require('../assets/brand_logos/11.png'),
    },
    {
      id: 12,
      image: require('../assets/brand_logos/12.png'),
    },
    {
      id: 13,
      image: require('../assets/brand_logos/13.png'),
    },
    {
      id: 14,
      image: require('../assets/brand_logos/14.png'),
    },
    {
      id: 15,
      image: require('../assets/brand_logos/15.png'),
    },
    {
      id: 16,
      image: require('../assets/brand_logos/16.png'),
    },
    {
      id: 17,
      image: require('../assets/brand_logos/17.png'),
    },
    {
      id: 18,
      image: require('../assets/brand_logos/18.png'),
    },
    {
      id: 19,
      image: require('../assets/brand_logos/19.png'),
    },
    {
      id: 20,
      image: require('../assets/brand_logos/20.png'),
    },
    {
      id: 21,
      image: require('../assets/brand_logos/21.png'),
    },
    {
      id: 22,
      image: require('../assets/brand_logos/22.png'),
    },
  ];

  const fetchProfileData = async accessToken => {
    await axios
      .get(GET_PROFILE_DATA, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        const _profile = response.data.profile;
        setProfile(_profile);
        dispatch(setProfileData(_profile));
      })
      .catch(error => {
        // console.log('ProfileData ' + error);
      });
  };
  const _onRefresh = () => {
    setRefreshing(true);
    getWishlistItems(accessToken);
    fetchProfileData(accessToken);
  };
  useEffect(() => {
    _onRefresh();
  }, [navigation]);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < logos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <>
      <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
        <View style={tw`bg-[#edf2f2] flex-1`}>
          <View style={styles.header}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 19,
                }}
                numberOfLines={1}>
                {heading}
              </Text>

              {/* login Register */}
              {profile ? (
                <TouchableOpacity
                  disabled
                  onPress={() => navigation.navigate('Profile')}>
                  {profile && (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}>
                        <Image
                          style={tw`h-10 w-10 rounded-full top-2`}
                          resizeMode="contain"
                          source={
                            profile.photo
                              ? {
                                  uri: profile.photo.includes('https')
                                    ? profile.photo
                                    : image_url + profile.photo,
                                }
                              : require('../assets/mobile-logo.png')
                          }
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: 14,
                      fontWeight: '600',
                      marginTop: 19,
                    }}>
                    {'Login/Register'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={tw`relative rounded-md flex-1`}>
              <SearchScreen />
              <View
                style={tw`w-full px-6 top-[110px] absolute items-center rounded-[10px] overflow-hidden z-1`}>
                <HomeSlider />
              </View>
            </View>
          </View>

          <ScrollView
            style={{}}
            contentContainerStyle={{
              alignItems: 'center',
              backgroundColor: color.white,
              // paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
            stickyHeaderHiddenOnScroll={false}
            // stickyHeaderIndices={[0]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
            }>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tw`mt-10`}>
              {/* box1 */}
              <TouchableOpacity
                style={styles.tab_box}
                onPress={() =>
                  navigation.navigate('Listings', {
                    form: {category: Category.PHONE},
                  })
                }>
                <View style={tw`flex items-center justify-center `}>
                  <Image
                    style={styles.category_image}
                    source={require('../assets/smartphone.png')}
                    resizeMode="contain"
                  />
                  <Text style={tw`text-white mt-1 text-[10px]`}>Phone</Text>
                </View>
              </TouchableOpacity>
              {/* box2 */}
              <TouchableOpacity
                style={styles.tab_box}
                onPress={() =>
                  navigation.navigate('Listings', {
                    form: {category: Category.SMARTWATCH},
                  })
                }>
                <View style={tw`flex items-center justify-center `}>
                  <Image
                    style={styles.category_image}
                    source={require('../assets/smartwatch.png')}
                    resizeMode="contain"
                  />
                  <Text style={tw`text-white mt-1 text-[10px]`}>
                    Smart Watch
                  </Text>
                </View>
              </TouchableOpacity>
              {/* box3 */}
              <TouchableOpacity
                style={styles.tab_box}
                onPress={() =>
                  navigation.navigate('Listings', {
                    form: {category: Category.TABLET},
                  })
                }>
                <View style={tw`flex items-center justify-center `}>
                  <Image
                    style={styles.category_image}
                    source={require('../assets/Tablets.png')}
                    resizeMode="contain"
                  />
                  <Text style={tw`text-white mt-1 text-[10px]`}>Tablets</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <View style={tw`w-full items-center pt-4 mb-10`}>
              {/* row1 */}

              {/* row2 */}

              <RecentList
                name={Category.PHONE}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
              />
              <RecentList
                name={Category.SMARTWATCH}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
              />
              <RecentList
                name={Category.TABLET}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
              />

              <View style={styles.container}>
                <TouchableOpacity onPress={handlePrevious}>
                  <FontAwesome
                    name="chevron-thin-left"
                    size={25}
                    color="gray"
                  />
                </TouchableOpacity>
                <View style={styles.company_box}>
                  <FlatList
                    horizontal
                    data={logos}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => '#' + item.id}
                    renderItem={({item}) => (
                      <Image
                        style={{width: 70, height: 70, marginHorizontal: 20}}
                        source={item.image}
                      />
                    )}
                    initialScrollIndex={currentIndex}
                    getItemLayout={(data, index) => ({
                      length: 70,
                      offset: 70 * index,
                      index,
                    })}
                  />
                </View>
                <TouchableOpacity onPress={handleNext}>
                  <FontAwesome
                    name="chevron-thin-right"
                    size={25}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tabs */}
          </ScrollView>
        </View>
      </SafeAreaView>
      {Platform.OS === 'android' && <AppUpdateScreen />}
      {Platform.OS === 'ios' && <AppUpdateScreen />}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    height: 231,
    borderBottomWidth: 1,
    marginBottom: 28,
    backgroundColor: '#015dcf',
  },

  tabBox: {
    width: width - 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    shadow: {
      shadowOffset: {width: 10, height: 10},
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 3,
      // background color must be set
      backgroundColor: '#0000', // invisible color
    },
    marginVertical: 5,
  },
  tab_box_rows: {
    height: 100,
    // backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  tabBox_view: {},
  tab_box: {
    width: 87,
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 13,
    backgroundColor: '#015DCF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginHorizontal: 8,
    elevation: 6,
  },
  tab_text: {
    color: 'gray',
    // fontWeight:'bold',
    fontSize: 10,
    marginVertical: 3,
    // backgroundColor:'orange',
    margin: 2,
    textAlign: 'center',
    width: '80%',
  },
  heading: {
    color: color.black,
    fontSize: 20,
  },
  viewMore_text: {
    color: color.orange,
    fontSize: 15,
  },
  _flatList: {
    marginBottom: 10,
  },
  category_image: {height: 30, width: 30},
  orange_line_heading: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 8,
    borderColor: color.orange,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  company_box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
