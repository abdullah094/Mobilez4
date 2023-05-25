import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BLOGS} from '@env';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Blogs = ({navigation}) => {
  const [data, setData] = useState();
  const base_url = 'https://mobilezmarket.com/images/';
  const fetchData = () => {
    axios
      .get(BLOGS)
      .then(response => {
        setData(response.data.blogs);
      })
      .catch(error => {
        Alert.alert('Failed');
        navigation.goBack();
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;
  return (
    <>
      <Header header={'BLOGS'} onPress={() => navigation.goBack()} />
      <FlatList
        data={data}
        contentContainerStyle={{
          marginTop: 80,
          width: width,
          alignItems: 'center',
          paddingBottom: 150,
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{width: 170, padding: 10, margin: 8}}
            onPress={() => navigation.navigate('BlogDetails', {data: item})}>
            <Image
              style={{width: '100%', height: 100}}
              source={{uri: base_url + item.image}}
              resizeMode="contain"
            />
            <Text style={{color: color.black, marginTop: 5}} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default Blogs;

const styles = StyleSheet.create({});
