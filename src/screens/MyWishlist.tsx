import {WISHLIST_GET} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {Product} from '../../type';
import {
  logoutUser,
  selectAccessToken,
  selectWishlist,
  setWishList,
} from '../Redux/Slices';
import GridItem from '../components/GridItem';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const MyWishlist = ({navigation}) => {
  const [Grid, setGrid] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const accessToken = useSelector(selectAccessToken);
  const wishlistItemsExist = useSelector(selectWishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(WISHLIST_GET, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        dispatch(setWishList(response.data.data.map(x => x.id)));
        setData(response.data.data.sort(x => x.created_at));
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          navigation.navigate('Login');
        }
        console.log(reason.message);
      });
  }, [wishlistItemsExist]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header title="My Wishlist" />
      <View style={tw`flex-row items-center justify-end px-4  h-10`}>
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
            <ListItem item={item} image={item.image.img}></ListItem>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MyWishlist;

const styles = StyleSheet.create({});
