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
import Icon from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

const ListItem = ({item, image}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const navigation = useNavigation();
  const dateString = item.created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  console.log(item.city);
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

        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        borderRadius: 15,
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
      <View
        style={{
          height: '90%',
          padding: 6,
          width: '60%',

          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{color: 'black', fontWeight: '700', fontSize: 17}}
            numberOfLines={1}>
            {item.brand} {item?.model}
          </Text>
          <Text
            style={{
              color: color.orange,
              fontSize: 16,
              marginTop: 1,
              fontWeight: '700',
            }}
            numberOfLines={1}>
            Rs. {item.price.toLocaleString()}
          </Text>
          {item.ram && item.storage ? (
            <Text
              style={{color: 'gray', marginTop: 2, fontSize: 14}}
              numberOfLines={1}>
              {item?.ram} GB | {item?.storage} GB | {item?.pta_status}
            </Text>
          ) : (
            item.ram && item.storage === null
          )}

          <Text
            style={{color: 'gray', marginTop: 1, fontSize: 12}}
            numberOfLines={2}>
            {item?.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bottom: -10,
          }}>
          <Text
            style={{
              color: color.black,
              fontSize: 12,
              marginTop: 2,
              fontWeight: '500',
            }}
            numberOfLines={1}>
            {formattedDate}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="location-pin" size={15} color={color.red} />
            <Text style={{color: 'black', marginTop: 1, fontSize: 12}}>
              {item.city}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
