import {VIDEOS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Videos = ({navigation}) => {
  const [data, setData] = useState();

  const fetchData = () => {
    axios
      .get(VIDEOS)
      .then(response => {
        setData(response.data.videos);
        console.log(response.data.videos);
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
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <Header title={'Videos'} />
        <FlatList
          data={data}
          contentContainerStyle={{
            marginTop: 100,
            width: width - 30,
            alignItems: 'center',
          }}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.video_link)}
              style={{
                width: 140,
                height: 150,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/video_logo.png')}
              />
              <Text
                style={{color: color.black, marginTop: 5}}
                numberOfLines={1}>
                {item.video_link}
              </Text>
              <Text
                style={{width: '80%', marginTop: 5, color: 'gray'}}
                numberOfLines={1}>
                {item.updated_at}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Videos;

const styles = StyleSheet.create({});
