import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {ADD_WISHLIST} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAccessToken,
  selectWishlist,
  AddToWishlist,
} from '../Redux/Slices';

const GridItem = ({item, image}) => {
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
      style={{
        overflow: 'hidden',
        shadowColor: '#000',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        margin: 8,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={() => navigation.navigate('ProductPage', {id: item.id})}>
      <View style={tw`w-36`}>
        <Image
          style={{
            height: 120,
            width: '100%',
            marginBottom: 5,
            borderRadius: 10,
          }}
          source={{uri: image_url + image}}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => AddToFavorite()}
          style={tw` absolute w-10 h-10 flex items-center justify-center top-0 right-0 bg-gray-100 rounded-full`}>
          <AntDesign
            name={exist ? 'heart' : 'hearto'}
            size={30}
            color={'red'}></AntDesign>
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            color: '#252B5C',
            fontWeight: '800',
          }}>
          {item.brand} <Text>{item.model}</Text>
        </Text>
        <Text numberOfLines={1} style={{color: '#015DCF', fontWeight: '800'}}>
          Rs. {item.price}
        </Text>

        {item.category === 'Mobile' && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                width: '90%',
                marginTop: 2,
              }}>
              <Text style={styles.small_text}>{item.ram}GB</Text>
              <Text style={styles.small_text}> | </Text>

              <Text style={styles.small_text}>{item.storage}GB</Text>
              <Text style={styles.small_text}> | </Text>
              <Text numberOfLines={1} style={styles.small_text}>
                {item.pta_status}
              </Text>
            </View>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginTop: 2,
            }}>
            <Icon name="location-pin" size={10} color={'red'} />
            <Text style={styles.small_text}>{item?.user?.city}</Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.small_text}>
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GridItem;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
});
