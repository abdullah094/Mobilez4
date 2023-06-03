import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import pix from '../assets/slider-pics/1.jpg';
import {color} from '../constants/Colors';

const {height, width} = Dimensions.get('window');
const Slider = ({data}) => {
  const [scrollPosition, setscrollPosition] = useState(0);
  // const inputEl = useRef(0);
  // console.log(scrollPosition)
  const image_url = 'https://www.mobilezmarket.com/images/';

  const scroll_value = () => {
    //spits out value of index of image currently displayed

    let index = 0;
    // console.log(scrollPosition)
    for (let i = 0; i < data.length; i++) {
      if (Math.floor(scrollPosition) >= Math.floor(width) * i) {
        index = i + 1;
      }
    }
    return index;
  };
  let ns = scroll_value(); // value that stores the index of the slider

  const renderItem = ({item}) => (
    <Image
      style={{width: width}}
      source={{uri: image_url + item.img}}
      resizeMode={'contain'}
    />
  );
  const CountTurns = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
          borderRadius: 5,
        }}>
        <Text style={styles.counttext}>{ns}</Text>
        <Text style={styles.counttext}>/</Text>
        <Text style={styles.counttext}>{data.length}</Text>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          borderBottomColor: 'black',
          backgroundColor: '#D3D3D3',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          height: 400,
        }}>
        <FlatList
          onScroll={current =>
            setscrollPosition(current.nativeEvent.contentOffset.x)
          }
          horizontal
          contentContainerStyle={{backgroundColor: color.gray}}
          showsHorizontalScrollIndicator={false}
          data={data}
          pagingEnabled={true}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10, right: 10}}>
        <CountTurns />
      </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  counttext: {
    color: 'white',
  },
});
