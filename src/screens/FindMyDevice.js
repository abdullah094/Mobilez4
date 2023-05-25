import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {FILTER} from '@env';
import axios from 'axios';
import {color} from '../constants/Colors';
import Loading from '../components/Loading';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const FindMyDevice = ({navigation, route}) => {
  const isFocused = useIsFocused();
  console.log(route.params?._form);
  let filterData = route.params?._form || null;

  console.log(filterData);
  const [data, setData] = useState();

  const [form, setForm] = useState({
    search: '',
    max_price: '',
    min_price: '',
  });

  const image_url = 'https://mobilezmarket.com/images/';
  const fetchResults = async () => {
    setData();
    await axios
      .post(FILTER, JSON.stringify(filterData))
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        setData([]);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (!data) return <Loading />;
  return (
    <>
      <Header header={'Find My Device'} onPress={() => navigation.goBack()} />
      <View style={{marginTop: 50}}>
        {/* Filter */}
        <View
          style={{padding: 10, paddingHorizontal: 30, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Filter')}
            style={{
              padding: 5,
              backgroundColor: color.orange,
              borderRadius: 10,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: color.white, fontSize: 15, fontWeight: 'bold'}}>
              Filters
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          contentContainerStyle={{
            width: width,
            alignItems: 'center',
            paddingBottom: 200,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductPage', {id: item.id})}
              style={{
                width: width - 30,
                height: 150,
                marginTop: 10,
                backgroundColor: color.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,

                elevation: 7,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: 5,
                borderRadius: 5,
              }}>
              {console.log(item.image)}

              <Image
                style={[
                  {height: '90%', width: '30%', borderRadius: 10},
                  item.img || {tintColor: 'gray'},
                ]}
                resizeMode="contain"
                source={
                  !item.img
                    ? require('../assets/mobile-logo.png')
                    : {uri: image_url + item?.img}
                }
              />
              <View style={{height: '90%', padding: 10, width: '60%'}}>
                <Text
                  style={{color: color.black, fontWeight: '500', fontSize: 17}}
                  numberOfLines={1}>
                  {item.brand} {item?.model}
                </Text>
                <Text
                  style={{color: color.orange, fontSize: 14, marginTop: 2}}
                  numberOfLines={1}>
                  {item.price}
                </Text>
                <Text
                  style={{color: 'gray', marginTop: 2, fontSize: 12}}
                  numberOfLines={1}>
                  {item?.ram} | {item?.storage} | {item?.pta_status}
                </Text>
                <Text
                  style={{color: 'gray', marginTop: 1, fontSize: 15}}
                  numberOfLines={2}>
                  {item?.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default FindMyDevice;

const styles = StyleSheet.create({});
