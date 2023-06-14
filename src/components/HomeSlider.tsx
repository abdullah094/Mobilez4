import {HOME_SLIDER_IMAGES} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');
const HomeSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);

  const image_url = 'https://www.mobilezmarket.com/images/';
  useEffect(() => {
    const fetchSliderImages = async () => {
      await axios
        .get(HOME_SLIDER_IMAGES)
        .then(response => {
          response.data.images.forEach(element => {
            setSliderImages(JSON.parse(element.banner_images));
          });
        })
        .catch(error => {
          console.log(error);
        });
      // setSliderImages(images)
    };
    fetchSliderImages();
  }, [HOME_SLIDER_IMAGES]);
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          zIndex: 1,
          width: '100%',
          height: 110,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 20}}
          source={{uri: image_url + item}}
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <>
      <View>
        <Carousel
          loop
          autoplay
          data={sliderImages}
          renderItem={_renderItem}
          sliderWidth={width - 25}
          itemWidth={width - 20}
          layout={'stack'}
        />
      </View>
    </>
  );
};

export default HomeSlider;

const styles = StyleSheet.create({});
