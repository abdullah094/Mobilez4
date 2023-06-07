import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {color} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddToWishlist,
  RemoveFromWishList,
  selectAccessToken,
  selectWishlist,
} from '../Redux/Slices';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
import {ADD_WISHLIST, REMOVE_WISHLIST} from '@env';
import tw from 'twrnc';

const ListItem = ({item, image}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const navigation = useNavigation();
  const dateString = item.created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const _accessToken = useSelector(selectAccessToken);
  const wishlistItemsExit: Number[] = useSelector(selectWishlist);
  const exist = wishlistItemsExit.includes(item.id);
  const dispatch = useDispatch();

  let headers = {
    Authorization: `Bearer ${_accessToken}`,
    'Content-Type': 'multipart/form-data',
  };
  const AddToFavorite = () => {
    if (_accessToken == null) {
      Alert.alert('You must be logged in to add to favorite');
      return;
    }
    if (exist) {
      axios
        .post(
          REMOVE_WISHLIST + `/${item.id}`,
          {product_id: item.id},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(RemoveFromWishList(item.id));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
    } else
      axios
        .post(
          ADD_WISHLIST + `/${item.id}`,
          {product_id: item.id},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(AddToWishlist(item.id));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductPage', {id: item.id})}
      style={{
        width: width - 30,
        height: 150,
        marginTop: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        borderRadius: 15,
      }}>
      <View style={{height: '100%', width: '35%'}}>
        <Image
          style={[
            {height: '100%', width: '100%', borderRadius: 10},
            image || {tintColor: 'gray'},
          ]}
          resizeMode="cover"
          source={
            !image
              ? require('../assets/mobile-logo.png')
              : {uri: image_url + image}
          }
        />
        <TouchableOpacity
          onPress={() => AddToFavorite()}
          style={tw`absolute w-10 h-10 flex items-center justify-center top-0 right-0 bg-gray-100 rounded-full`}>
          <AntDesign
            name={exist ? 'heart' : 'hearto'}
            size={30}
            color={'red'}></AntDesign>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          width: '65%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 17,
              marginTop: 6,
            }}
            numberOfLines={1}>
            {item?.brand} {item?.model}
          </Text>
          <Text
            style={{
              color: color.orange,
              fontSize: 16,
              marginTop: 4,
              fontWeight: '700',
            }}
            numberOfLines={1}>
            Rs. {item?.price?.toLocaleString()}
          </Text>
          {item.ram && item.storage ? (
            <Text
              style={{color: 'gray', marginTop: 5, fontSize: 14}}
              numberOfLines={1}>
              {item?.ram} GB | {item?.storage} GB | {item?.pta_status}
            </Text>
          ) : (
            <></>
          )}

          {/* <Text
            style={{color: 'gray', marginTop: 1, fontSize: 12}}
            numberOfLines={2}>
            {item?.description}
          </Text> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bottom: -10,
          }}>
          <Text
            style={{
              color: color.black,
              fontSize: 12,
              marginTop: 2,
              fontWeight: '500',
            }}
            numberOfLines={1}>
            {formattedDate}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="location-pin" size={15} color={color.red} />
            <Text style={{color: 'black', marginTop: 1, fontSize: 12}}>
              {item?.user?.city}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
