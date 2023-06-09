import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import {IndexNavigationProps, Product} from '../types';
import AddToWishList from './AddToWishList';
const {width, height} = Dimensions.get('window');

const ListItem = ({item}: {item: Product}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const navigation = useNavigation<IndexNavigationProps<'Home'>>();
  const dateString = item.created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

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
        padding: 10,
        borderRadius: 15,
      }}>
      <View style={{height: '100%', width: '35%'}}>
        <Image
          style={[{height: '100%', width: '100%', borderRadius: 10}]}
          resizeMode="cover"
          source={
            !item.image.img
              ? require('../assets/mobile-logo.png')
              : {uri: image_url + item.image.img}
          }
        />
        <AddToWishList
          ProductId={item.id}
          size={15}
          style={tw`absolute w-7 h-7  flex items-center justify-center top-0 right-0 bg-gray-100 rounded-full`}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          width: '65%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 17,
              marginTop: 6,
            }}
            numberOfLines={1}>
            {item?.brand} {item?.model}
          </Text>
          <Text
            style={{
              color: color.orange,
              fontSize: 16,
              marginTop: 4,
              fontWeight: '700',
            }}
            numberOfLines={1}>
            Rs. {item?.price?.toLocaleString()}
          </Text>
          {item.ram && item.storage ? (
            <Text
              style={{color: 'gray', marginTop: 5, fontSize: 14}}
              numberOfLines={1}>
              {item?.ram} GB | {item?.storage} GB | {item?.pta_status}
            </Text>
          ) : (
            <></>
          )}

          {/* <Text
            style={{color: 'gray', marginTop: 1, fontSize: 12}}
            numberOfLines={2}>
            {item?.description}
          </Text> */}
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
              {item?.user?.city}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
