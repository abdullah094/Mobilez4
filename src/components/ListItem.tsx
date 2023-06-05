import {
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
const {width, height} = Dimensions.get('window');

const ListItem = ({item, image}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const navigation = useNavigation();
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

        elevation: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        borderRadius: 5,
      }}>
      <Image
        style={[
          {height: '90%', width: '30%', borderRadius: 10},
          image || {tintColor: 'gray'},
        ]}
        resizeMode="contain"
        source={
          !image
            ? require('../assets/mobile-logo.png')
            : {uri: image_url + image}
        }
      />
      <View style={{height: '90%', padding: 10, width: '60%'}}>
        <Text
          style={{color: 'black', fontWeight: '500', fontSize: 17}}
          numberOfLines={1}>
          {item.brand} {item?.model}
        </Text>
        <Text
          style={{color: color.orange, fontSize: 14, marginTop: 2}}
          numberOfLines={1}>
          {item.price}
        </Text>
        <Text
          style={{color: 'gray', marginTop: 2, fontSize: 12}}
          numberOfLines={1}>
          {item?.ram} | {item?.storage} | {item?.pta_status}
        </Text>
        <Text
          style={{color: 'gray', marginTop: 1, fontSize: 15}}
          numberOfLines={2}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
