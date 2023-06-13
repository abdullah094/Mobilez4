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
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {ADD_WISHLIST, REMOVE_WISHLIST} from '@env';
import {useDispatch, useSelector} from 'react-redux';
const {width,height} = Dimensions.get("window")
import {
  selectAccessToken,
  selectWishlist,
  AddToWishlist,
  RemoveFromWishList,
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
      style={{
        overflow: 'hidden',
        shadowColor: '#000',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        margin: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:width * 0.45
      }}
      onPress={() => navigation.push('ProductPage', {id: item.id})}>
      <View style={tw`w-full h-full justify-between `}>
        <Image
          style={{
            height: 120,
            width: '100%',
            marginBottom: 6,
            // aspectRatio:1.25,
            borderRadius: 10,
          }}
          
          source={{uri: image_url + image}}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => AddToFavorite()}
          style={tw` absolute w-7 h-7 flex items-center justify-center top-0 right-0 bg-gray-100 rounded-full`}>
          <AntDesign
            name={exist ? 'heart' : 'hearto'}
            size={15}
            color={'red'}></AntDesign>
        </TouchableOpacity>

        <View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: '#252B5C',
                fontWeight: '800',
              }}>
              {item.brand} <Text>{item.model}</Text>
            </Text>
            <Text
              numberOfLines={1}
              style={{color: '#015DCF', fontWeight: '800'}}>
              Rs. {item.price}
            </Text>
          </View>
          {item.category === 'Mobile' && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                 
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
              alignItems: 'center',
              justifyContent: 'space-between',
              
            }}>
            <Text numberOfLines={1} style={styles.small_text}>
              {formattedDate}
            </Text>

            <Text style={styles.small_text}>
        
              <Icon name="location-pin" size={10} color={'red'} />
              {item?.user?.city}
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
  last_View: {},
});
