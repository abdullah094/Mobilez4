import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageLoader} from 'react-native-image-fallback';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import {IndexNavigationProps, Product} from '../types';
import AddToWishList from './AddToWishList';
import BlinkingText from './BlinkingText';
const {width, height} = Dimensions.get('window');

const GridItem = ({
  item,
  onPressList,
  hideIcon = false,
}: {
  item: Product;
  onPressList: any;
  hideIcon: boolean;
}) => {
  const image_url = 'https://www.mobilezmarket.com/images/';
  const navigation = useNavigation<IndexNavigationProps<'Home'>>();
  const dateString = item.created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  let nowDate = new Date();
  nowDate.setDate(nowDate.getDate() - 1);
  const fallbacks = [
    require('../assets/mobile-logo.png'), // A locally require'd image
  ];

  return (
    <>
      <TouchableOpacity
        style={{
          overflow: 'hidden',
          shadowColor: '#000',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          margin: 5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: width * 0.45,
          // borderWidth: 1,
        }}
        onPress={() => navigation.push('ProductPage', {id: item.id})}>
        {/* {item.status === 1 && (
          <View
            style={{
              position: 'absolute',
              left: 5,
              zIndex: 10,
              backgroundColor: color.gold,
              borderWidth: 1,
              borderColor: color.gold,
              width: 55,
              bottom: 85,
              height: 23,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text style={{color: 'black', fontSize: 10, fontWeight: '700'}}>
              Featured
            </Text>
          </View>
        )} */}

        {item.sell_status === 'Sold' ? (
          <>
            <View
              style={{
                position: 'absolute',
                left: 5,
                zIndex: 10,
                backgroundColor: color.red,
                borderWidth: 1,
                borderColor: color.red,
                width: 50,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>
                Sold
              </Text>
            </View>
          </>
        ) : (
          nowDate < date && (
            <BlinkingText
              style={{
                position: 'absolute',
                left: 5,
                zIndex: 10,
                backgroundColor: color.red,
                borderWidth: 1,
                borderColor: color.red,
                width: 50,
                color: 'white',
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              text="New"
            />
          )
        )}

        <View style={tw`w-full h-52 justify-between`}>
          <ImageLoader
            style={{
              height: 120,
              width: '100%',
              marginBottom: 6,
              // aspectRatio:1.25,
              borderRadius: 10,
            }}
            source={image_url + item.image?.img}
            resizeMode="cover"
            fallback={fallbacks}
          />

          <AddToWishList
            ProductId={item.id}
            size={15}
            style={tw` absolute w-7 h-7 flex items-center justify-center top-0 right-0 bg-gray-100 rounded-full`}
          />

          <View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  color: '#252B5C',
                  fontWeight: '800',
                }}>
                {item.brand} <Text>{item.model}</Text>
              </Text>
              <Text
                numberOfLines={1}
                style={{color: '#015DCF', fontWeight: '800'}}>
                Rs. {item.price}
              </Text>
            </View>
            {item.category === 'Mobile' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.small_text}>{item.ram}GB</Text>
                  <Text style={styles.small_text}> | </Text>

                  <Text style={styles.small_text}>{item.storage}GB</Text>
                  <Text style={styles.small_text}> | </Text>
                  <Text numberOfLines={1} style={styles.small_text}>
                    {item.pta_status}
                  </Text>
                </View>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.small_text}>
                {formattedDate}
              </Text>

              <Text style={styles.small_text}>
                <Icon name="location-pin" size={10} color={'red'} />
                {item?.user?.city}
              </Text>
              {!hideIcon && (
                <Pressable onPress={onPressList}>
                  <Feather name="more-vertical" size={22} color={'grey'} />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default GridItem;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
  last_View: {},
});
