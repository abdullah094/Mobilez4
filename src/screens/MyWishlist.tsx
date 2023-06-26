import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import WishlistComponent from './WishlistComponent';

const {width, height} = Dimensions.get('window');
const MyWishlist = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header title="My Wishlist" />
      <WishlistComponent />
    </SafeAreaView>
  );
};

export default MyWishlist;

const styles = StyleSheet.create({});
