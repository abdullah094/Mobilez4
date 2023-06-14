import {MYADS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import GridItem from '../components/GridItem';
import ListItem from '../components/ListItem';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const MyAds = ({navigation}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const [data, setData] = useState();
  const _accessToken = useSelector(selectAccessToken);
  const [Grid, setGrid] = useState(false);

  useEffect(() => {
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
  }, [_accessToken]);
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View
        style={tw`h-16 flex-row items-center justify-between px-2 bg-[#015dcf]`}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back-sharp" color={color.white} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: color.white,
            textAlign: 'center',
            fontWeight: '500',
            flex: 1,
          }}>
          My Ads
        </Text>
      </View>
      {/* // price/ location /model/modelyear */}

      <View style={tw` flex-row items-center justify-end m-6`}>
        <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
          <ListIcon
            name="list"
            color={Grid ? color.black : color.red}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGrid(true)}>
          <Entypo
            name="grid"
            color={Grid ? color.red : color.black}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {Grid ? (
        <FlatList
          data={data}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 15,
            paddingBottom: 100,
          }}
          numColumns={2}
          renderItem={({item}) => (
            <GridItem item={item} image={item.image.img}></GridItem>
          )}
        />
      ) : (
        <FlatList
          data={data}
          key={'#'}
          keyExtractor={item => '#' + item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 15,
            paddingBottom: 100,
          }}
          numColumns={1}
          renderItem={({item}) => (
            <ListItem item={item} image={item.image.img} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({});
