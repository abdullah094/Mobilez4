import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';

import {FlatList, Pressable} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const Images = ({navigation, route}) => {
  const {images} = route.params;
  const image_url = 'https://mobilezmarket.com/images/';
  const {width, height} = Dimensions.get('window');
  console.log(images);
  const _renderItem = ({item}) => {
    return (
      <Image
        style={{
          aspectRatio: 1.09,
        }}
        source={{uri: image_url + item.img}}
      />
    );
  };
  if (!images) {
    return null;
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        <Pressable
          style={{padding: 5, position: 'absolute', top: 5, left: 5}}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="keyboard-arrow-left"
            size={40}
            color={color.white}
          />
        </Pressable>
        <View style={{maxHeight: 500}}>
          <Carousel
            data={images}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width}
          />
        </View>
      </View>
    </>
  );
};

export default Images;

const styles = StyleSheet.create({});
