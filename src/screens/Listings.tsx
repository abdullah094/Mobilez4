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
import Loading from '../components/Loading';
import tw from 'twrnc';
import HomeSlider from '../components/HomeSlider';
import SearchScreen from './SearchScreen';
import {Button, Chip} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const Listings = ({route, navigation}) => {
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
      data.filter(item => {
        item.price == '';
      });
      setdata(response.data[data_collect]);
    });
  };

  const clear = () => {};

  useEffect(() => {
    fetchData();
  }, []);
  const Header = () => {
    return (
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
              color={color.black}
              size={25}
            />
          </TouchableOpacity>

          <View style={tw`flex flex-row items-center px-2`}>
            <Ionicons name="filter" color={color.black} size={25} />
            <Text>Filter</Text>
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
            <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Model
            </Chip>
            <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Year Model
            </Chip>
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
            style={tw`w-full px-6 top-[120px] absolute items-center rounded-[13px] overflow-hidden z-1`}>
            <HomeSlider />
          </View>
        </View>
      </View>
      // <View style={tw`h-12 flex flex-row items-center bg-white`}>
      //   <TouchableOpacity
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
      // </View>
    );
  };

  if (!data) return <Loading />;
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header></Header>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 100,
          paddingTop: 50,
        }}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductPage', {id: item.id})}
            style={{
              width: width / 2 - 20,
              alignItems: 'center',
              height: 220,
              marginTop: 20,
              marginHorizontal: 5,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,
            }}>
            <Image
              style={{height: 135, width: '100%'}}
              source={{uri: image_url + item.image.img}}
              resizeMode="contain"
            />

            <View style={{width: '85%'}}>
              <Text
                style={{
                  width: '100%',
                  fontWeight: '500',
                  color: color.black,
                  marginTop: 5,
                  fontSize: 15,
                }}
                numberOfLines={2}>
                {item.brand} {item.model}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: color.orange,
                  marginTop: 2,
                  fontSize: 14,
                }}>
                {item.price}
              </Text>

              <Text style={{fontSize: 12, color: 'gray'}}>
                {item.ram}GB | {item.storage}GB
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Listings;

const styles = StyleSheet.create({
  header: {
    width: width,
    paddingHorizontal: 24,
    height: 231,
    borderBottomWidth: 1,
    backgroundColor: '#015dcf',
    zIndex: 10,
  },
});
