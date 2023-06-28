import {MY_ADS} from '@env';
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
import {Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';

import Thumb from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import GridItem from '../components/GridItem';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import {color} from '../constants/Colors';
import WishlistComponent from './WishlistComponent';

const {width, height} = Dimensions.get('window');
const MyAds = ({navigation}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const [data, setData] = useState([]);
  const _accessToken = useSelector(selectAccessToken);
  const [isWishlist, setIsWishlist] = useState(false);
  const [Grid, setGrid] = useState(false);

  useEffect(() => {
    axios
      .get(MY_ADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        setData(response.data.my_adds);
      })
      .catch(error => {
        console.log('hello', error);
      });
  }, [_accessToken]);

  console.log('my adassss', data);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <Header title="My Ads" />
        <View style={tw`flex-row justify-center p-2 `}>
          <Button
            style={[tw`w-30 border border-blue-500 mx-3`]}
            mode={isWishlist ? 'text' : 'contained'}
            textColor={isWishlist ? 'black' : 'white'}
            buttonColor={isWishlist ? 'white' : '#015dcf'}
            onPress={() => setIsWishlist(false)}>
            My Ads
          </Button>

          <Button
            style={tw`w-30 border border-blue-500 mx-3`}
            textColor={isWishlist ? 'white' : 'black'}
            buttonColor={isWishlist ? '#015dcf' : 'white'}
            mode={isWishlist ? 'contained' : 'text'}
            onPress={() => setIsWishlist(true)}>
            Wishlist
          </Button>
        </View>
        {!isWishlist ? (
          <>
            {data.length > 0 ? (
              <View style={tw` flex-row items-center justify-end m-6`}>
                <>
                  <TouchableOpacity
                    style={tw`px-2`}
                    onPress={() => setGrid(false)}>
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
                </>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <Thumb name="thumbsdown" color={'black'} size={40} />
                <Text style={{color: 'black', fontWeight: '700'}}>
                  You haven't posted anything
                </Text>
              </View>
            )}

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
                renderItem={({item}) => <GridItem item={item}></GridItem>}
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
                renderItem={({item}) => <ListItem item={item} />}
              />
            )}
          </>
        ) : (
          <WishlistComponent />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({});
