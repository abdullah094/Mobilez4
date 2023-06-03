import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../constants/Colors';
import {NEW_USED_PHONES} from '@env';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Sort from 'react-native-vector-icons/MaterialIcons';
import Grid from 'react-native-vector-icons/Entypo';
import Loading from '../components/Loading';
import tw from 'twrnc';
import HomeSlider from '../components/HomeSlider';
import SearchScreen from './SearchScreen';
import {Button, Chip} from 'react-native-paper';
import ListIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';

import {Pressable} from 'react-native';
const {width, height} = Dimensions.get('window');
const Listings = ({route, navigation, props}) => {
  const [filter, setFilter] = useState(1);
  const {name} = route.params ?? 'New Phones';
  const [data, setdata] = useState();
  const used_phone_api = NEW_USED_PHONES.replace('new', 'used');
  const image_url = 'https://www.mobilezmarket.com/images/';
  const fetchData = () => {
    const api = name === 'New Phones' ? NEW_USED_PHONES : used_phone_api;
    const data_collect = name === 'New Phones' ? `new_devices` : `used_devices`;
    // console.log(data_collect)
    axios.get(api).then(response => {
      const data = response.data[data_collect];
      console.log(response.data[data_collect]);
      data.filter(item => {
        item.price == '';
        item.created_at;
      });
      setdata(response.data[data_collect]);
    });
  };
  console.log('=======================itemmmmmmmmmmmmmmmm', data);

  // const dateString = data.created_at;
  // const date = new Date(dateString);

  // const formattedDate = date.toLocaleDateString('en-US', {
  //   month: 'long',
  //   day: 'numeric',
  // });
  // console.log(formattedDate);
  const clear = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const Header = () => {
    return (
      <>
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
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons
                name="ios-arrow-back-sharp"
                color={color.white}
                size={25}
              />
            </TouchableOpacity>

            <View style={tw`flex flex-row items-center px-2`}>
              <Ionicons name="filter" color={color.white} size={25} />
              <Text style={{color: color.white, fontWeight: '500'}}>
                Filter
              </Text>
            </View>
            {/* // price/ location /model/modelyear */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tw`px-2`}>
              <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
                Price
              </Chip>
              <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
                Location
              </Chip>
              {/* <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Model
            </Chip>
            <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Year Model
            </Chip> */}
            </ScrollView>
          </View>
          <View style={tw`relative rounded-md flex-1`}>
            <View style={tw`flex-1 z-10`}>
              <TextInput
                // value={searchText}
                // clearTextOnFocus={() => setSearchText('')}
                // onChangeText={text => setSearchText(text)}
                placeholder="Search"
                placeholderTextColor={'white'}
                style={{
                  width: '100%',
                  height: 43,
                  borderRadius: 4,
                  backgroundColor: '#4894F1',
                  paddingLeft: 32,
                  paddingHorizontal: 8,
                  marginTop: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  color: 'white',
                }}
              />
              <Entypo
                style={tw`absolute top-9 left-2`}
                name="magnifying-glass"
                size={20}
                color={'white'}
              />
              <TouchableOpacity
                style={tw`absolute top-9 right-2`}
                onPress={clear}>
                <Entypo name="cross" size={20} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={tw`w-full px-6 top-[90px] absolute items-center rounded-[13px] overflow-hidden z-1`}>
              <HomeSlider />
            </View>
          </View>
        </View>
        {/* <View style={tw`h-12 flex flex-row items-center bg-white`}>
       <TouchableOpacity
      //     style={{marginLeft: 15}}
      //     onPress={() => navigation.goBack()}>
      //     <Icon name="ios-arrow-back-sharp" color={color.black} size={25} />
      //   </TouchableOpacity>
      //   <Text
      //     style={{
      //       flex: 1,
      //       textAlign: 'center',
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       color: color.black,
      //       fontWeight: 'bold',
      //       fontSize: 20,
      //     }}>
      //     {name}
      //   </Text>
      // </View> */}
      </>
    );
  };

  if (!data) return <Loading />;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header></Header>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: width - 50,
          marginHorizontal: 20,

          marginTop: 70,
        }}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Sort name="sort" color={color.black} size={30} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: color.black,
                alignItems: 'center',
              }}>
              Sort
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: 65,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <ListIcon name="list" color={color.black} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Grid name="grid" color={color.black} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 15,
            paddingBottom: 100,
          }}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductPage', {id: item.id})}
              style={{
                overflow: 'hidden',
                marginTop: 20,
                shadowColor: '#000',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                paddingHorizontal: 15,
                marginLeft: 16,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Image
                style={{
                  height: 120,
                  width: '100%',
                  marginBottom: 5,
                  backgroundColor: color.black,
                  borderRadius: 10,
                }}
                source={{uri: image_url + item?.image?.img}}
                resizeMode="contain"
              />

              <View style={{justifyContent: 'flex-start', width: 135}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    color: '#252B5C',
                    fontWeight: '800',
                  }}>
                  {item.brand} <Text>{item.model}</Text>
                </Text>
                <Text
                  numberOfLines={1}
                  style={{color: '#015DCF', fontWeight: '800'}}>
                  Rs. {item.price}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    width: '90%',
                    marginTop: 2,
                  }}>
                  <Text style={styles.small_text}>{item.ram}GB</Text>
                  <Text style={styles.small_text}> | </Text>

                  <Text style={styles.small_text}>{item.storage}GB</Text>
                  <Text style={styles.small_text}> | </Text>
                  <Text numberOfLines={1} style={styles.small_text}>
                    {item.pta_status}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',

                      marginTop: 2,
                    }}>
                    <Icon name="location-pin" size={10} />
                    <Text style={styles.small_text}>{item.user.city}</Text>
                  </View>
                  {/* <View>
                    <Text numberOfLines={1} style={styles.small_text}>
                      {item.updated_at}
                    </Text>
                  </View> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Listings;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
  header: {
    width: width,
    paddingHorizontal: 24,
    height: 200,
    borderBottomWidth: 1,
    backgroundColor: '#015dcf',
    zIndex: 10,
  },
});
