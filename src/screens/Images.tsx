import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';

import {FlatList, Pressable} from 'react-native';
import tw from 'twrnc';
const Images = ({navigation, route}) => {
  const {images} = route.params;
  const image_url = 'https://www.mobilezmarket.com/images/';
  const {width, height} = Dimensions.get('window');
  const _renderItem = ({item, index}) => {
    return (
      <Image
        key={item.id}
        style={{
          width: width,
        }}
        source={{uri: image_url + item.img}}
      />
    );
  };
  if (!images) {
    return null;
  }
  // console.log(images)
  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: 'center',

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
            {/* <Carousel
              data={images}
              key={item => item.id}
              renderItem={_renderItem}
              sliderWidth={width}
              itemWidth={width}
            /> */}
            <FlatList
              horizontal
              data={images}
              keyExtractor={item => item.id}
              renderItem={_renderItem}
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={width}
              initialNumToRender={20}
              scrollEventThrottle={23} // Adjust the value for speed control
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Images;

const styles = StyleSheet.create({});
