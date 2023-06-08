import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';

import {FlatList, Pressable} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import tw from 'twrnc';
const Images = ({navigation, route}) => {
  const {images} = route.params;
  const image_url = 'https://www.mobilezmarket.com/images/';
  const {width, height} = Dimensions.get('window');
  const _renderItem = ({item}) => {
    
    return (
      <Image
        style={{
          width:width
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
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
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
