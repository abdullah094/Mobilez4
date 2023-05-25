import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../constants/Colors';
import {NEW_USED_PHONES} from '@env';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
const {width, height} = Dimensions.get('window');
const Listings = ({route, navigation}) => {
  const {name} = route.params;
  const [data, setdata] = useState();
  const used_phone_api = NEW_USED_PHONES.replace('new', 'used');
  const image_url = 'https://mobilezmarket.com/images/';
  const fetchData = () => {
    const api = name === 'New Phones' ? NEW_USED_PHONES : used_phone_api;
    const data_collect = name === 'New Phones' ? `new_devices` : `used_devices`;
    // console.log(data_collect)
    axios.get(api).then(response => {
      setdata(response.data[data_collect]);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const Header = () => {
    return (
      <SafeAreaView
        style={{
          width: width,
          height: 80,
          backgroundColor: color.orange,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back-sharp" color={color.white} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: color.white,
            fontWeight: 'bold',
            fontSize: 20,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          {name}
        </Text>
      </SafeAreaView>
    );
  };

  if (!data) return <Loading />;
  return (
    <>
      <FlatList
        data={data}
        ListHeaderComponent={<Header />}
        keyExtractor={item => item.id}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
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
    </>
  );
};

export default Listings;

const styles = StyleSheet.create({});
