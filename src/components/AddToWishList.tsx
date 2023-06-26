import {ADD_WISHLIST, REMOVE_WISHLIST} from '@env';
import axios from 'axios';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddToWishlist,
  RemoveFromWishList,
  selectAccessToken,
  selectWishlist,
} from '../Redux/Slices';

const AddToWishList = ({ProductId, style = {}, size = 30}) => {
  const _accessToken = useSelector(selectAccessToken);
  const wishlistItemsExit: Number[] = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const exist = wishlistItemsExit.includes(ProductId);
  const AddToFavorite = () => {
    let headers = {
      Authorization: `Bearer ${_accessToken}`,
      'Content-Type': 'multipart/form-data',
    };

    if (_accessToken == null) {
      Alert.alert('You must be logged in to add to favorite');
      return;
    }
    if (exist) {
      axios
        .post(
          REMOVE_WISHLIST + `/${ProductId}`,
          {product_id: ProductId},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(RemoveFromWishList(ProductId));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
    } else
      axios
        .post(
          ADD_WISHLIST + `/${ProductId}`,
          {product_id: ProductId},
          {
            headers: headers,
          },
        )
        .then(response => {
          dispatch(AddToWishlist(ProductId));
          Alert.alert(response.data.message);
        })
        .catch(error => console.log(error));
  };
  return (
    <TouchableOpacity onPress={() => AddToFavorite()} style={style}>
      <AntDesign
        name={exist ? 'heart' : 'hearto'}
        size={size}
        color={'red'}></AntDesign>
    </TouchableOpacity>
  );
};

export default AddToWishList;

const styles = StyleSheet.create({});
