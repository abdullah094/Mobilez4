import {BLOGS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Blogs = ({navigation}) => {
  const [data, setData] = useState();
  const base_url = 'https://www.mobilezmarket.com/images/';
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
    <SafeAreaView>
      <Header title={'BLOGS'} />
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
    </SafeAreaView>
  );
};

export default Blogs;

const styles = StyleSheet.create({});
