import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {color} from '../constants/Colors';
import FlatListBox from '../components/Flatbox';
import {GET_PROFILE_DATA} from '@env';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import {
  reduxSetAccessToken,
  setProfileData,
  reduxRemoveAccessToken,
} from '../Redux/Slices';
import tw from 'twrnc';
import SearchScreen from './SearchScreen';
import Slider from '../components/Slider';
import HomeSlider from '../components/HomeSlider';
import {Category, Profile} from '../../type';
import RecentList from '../components/RecentList';

const {width, height} = Dimensions.get('window');
const Home = ({navigation}) => {
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState<Profile>();
  const [deviceName, setDeviceName] = useState<string>();
  const [heading, setHeading] = useState('Home');
  const image_url = 'https:/www.mobilezmarket.com/images/';
  const _accesstoken = useSelector(state => state.todo.accessToken);
  const dispatch = useDispatch();
  const name = DeviceInfo.getBrand();
  setTimeout(() => {
    setHeading(`${name}'s ${deviceName}`);
  }, 5000);
  DeviceInfo.getDeviceName().then((res: string) => {
    setDeviceName(res);
  });

  useEffect(() => {
    console.log('fetch access token HOme useEffect');
    const getUserToken = async () => {
      try {
        const user_token = await AsyncStorage.getItem('@user_token');
        setAccessToken(user_token);
        dispatch(reduxSetAccessToken(user_token));
      } catch (e) {
        if (user_token === null) {
          setAccessToken();
          dispatch(reduxRemoveAccessToken());
        }
      }
    };
    getUserToken();
  }, []);

  const entries = [
    require('../assets/ads/1.png'),
    require('../assets/ads/2.png'),
    require('../assets/ads/3.png'),
    require('../assets/ads/4.png'),
  ];
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
  console.log('accessToken', accessToken);
  const fetchProfileData = async () => {
    await axios
      .get(GET_PROFILE_DATA, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        const _profile = response.data.profile;
        setProfile(_profile);
        console.log('_profile', _profile);

        dispatch(setProfileData(_profile));
      })
      .catch(error => {
        console.log('ProfileData ' + error);
      });
  };

  useEffect(() => {
    if (accessToken) fetchProfileData();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: color.white,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={false}
        // stickyHeaderIndices={[0]}
      >
        <View style={styles.header}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                marginTop: 25,
              },
            ]}>
            <Text
              style={{fontSize: 15, color: 'white', fontWeight: '600'}}
              numberOfLines={1}>
              {heading}
            </Text>

            {/* login Register */}
            {accessToken ? (
              <TouchableOpacity
                disabled
                onPress={() => navigation.navigate('Profile')}>
                {profile && (
                  <Image
                    style={tw`h-12 w-12 rounded-full`}
                    source={{uri: image_url + profile.photo}}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{color: color.white, fontSize: 14, fontWeight: '600'}}>
                  {'Login/Register'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={tw`relative rounded-md flex-1`}>
            <SearchScreen />
            <View
              style={tw`w-full px-6 top-[100px] absolute items-center rounded-[13px] overflow-hidden z-1`}>
              <HomeSlider />
            </View>
          </View>
        </View>
        {/* /header finsihes here */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mt-20`}>
          {/* box1 */}
          <TouchableOpacity
            style={styles.tab_box}
            onPress={() =>
              navigation.navigate('Listings', {
                name: Category.PHONE,
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
                name: Category.SMARTWATCH,
              })
            }>
            <View style={tw`flex items-center justify-center `}>
              <Image
                style={styles.category_image}
                source={require('../assets/smartwatch.png')}
                resizeMode="contain"
              />
              <Text style={tw`text-white mt-1 text-[10px]`}>Smart Watch</Text>
            </View>
          </TouchableOpacity>
          {/* box3 */}
          <TouchableOpacity
            style={styles.tab_box}
            onPress={() =>
              navigation.navigate('Listings', {
                name: Category.TABLET,
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

          <RecentList name={Category.PHONE} />
          <RecentList name={Category.SMARTWATCH} />
          <RecentList name={Category.TABLET} />

          <View style={styles.company_box}>
            <FlatList
              horizontal
              data={logos}
              showsHorizontalScrollIndicator={false}
              key={'#'}
              keyExtractor={item => '#' + item.id}
              renderItem={({item}) => (
                <Image
                  style={{width: 70, height: 70, marginHorizontal: 20}}
                  source={item.image}
                />
              )}
            />
          </View>
        </View>
        {/* Tabs */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    width: width,
    paddingHorizontal: 24,
    height: 231,
    borderBottomWidth: 1,
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
  viewmore_text: {
    color: color.orange,
    fontSize: 15,
  },
  _flatlist: {
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
  company_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
