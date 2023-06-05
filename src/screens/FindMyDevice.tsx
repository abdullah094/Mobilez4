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
import ListItem from '../components/ListItem';
import {Appbar} from 'react-native-paper';

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

  const image_url = 'https://www.mobilezmarket.com/images/';
  const fetchResults = async () => {
    setData();
    await axios
      .post(FILTER, JSON.stringify(filterData))
      .then(response => {
        setData(response.data.products);
        console.log(response.data);
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Find My Device" />
      </Appbar.Header>
      <View>
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
          renderItem={({item}) => <ListItem item={item} image={item.img} />}
        />
      </View>
    </>
  );
};

export default FindMyDevice;

const styles = StyleSheet.create({});
