import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../constants/Colors';
import axios from 'axios';
import {MYADS} from '@env';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const MyAds = ({navigation}) => {
  const image_url = 'https://mobilezmarket.com/images/';
  const isFocused = useIsFocused();
  const [data, setData] = useState();
  const _accessToken = useSelector(state => state.todo.accessToken);

  const fetchData = () => {
    axios
      .get(MYADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        setData(response.data.my_adds);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log('useeffect');
    fetchData();
  }, [isFocused, _accessToken]);
  console.log(data);
  return (
    <>
      <View
        style={{
          backgroundColor: color.orange,
          height: 100,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: color.white,
            fontWeight: '500',
            margin: 10,
            fontSize: 23,
          }}>
          My Ads
        </Text>
      </View>
      {data === [] ? (
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 100,
            color: color.black,
            fontSize: 23,
          }}>
          You have no posted ads
        </Text>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{
            width: width,
            alignItems: 'center',
            paddingBottom: 100,
            paddingTop: 20,
          }}
          key={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductPage', {id: item.id})}
              style={{
                width: width - 30,
                height: 150,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 15,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 5,
              }}>
              <Image
                style={{width: 130, height: 130, backgroundColor: color.gray}}
                source={{uri: image_url + item.image.img ?? ''}}
                resizeMode="contain"
              />
              <View
                style={{
                  height: '90%',
                  flex: 1,
                  padding: 2,
                  paddingHorizontal: 6,
                }}>
                <Text
                  style={{color: color.black, fontSize: 16}}
                  numberOfLines={1}>
                  {item.brand} {item.model}
                </Text>
                <Text
                  style={{
                    color: color.orange,
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginVertical: 2,
                  }}
                  numberOfLines={1}>
                  {item.price}
                </Text>
                <Text style={{color: color.black, fontSize: 12}}>
                  {item.ram}GB | {item.storage}GB | {item.pta_status}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 2,
                  }}>
                  <Text style={{color: 'gray', fontSize: 12}} numberOfLines={1}>
                    {item.user.city}
                  </Text>
                  <Text style={{color: 'gray', fontSize: 12}} numberOfLines={1}>
                    {item.created_at.substring(0, 10)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

export default MyAds;

const styles = StyleSheet.create({});
