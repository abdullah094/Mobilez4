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

const ListItem = ({
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
        {item.sell_status === 'Sold' ? (
          <>
            <View
              style={{
                position: 'absolute',
                left: 2,
                top: 2,
                zIndex: 999,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: 'red',
                padding: 4,
                backgroundColor: 'red',
                width: '13%',
                alignItems: 'center',
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
                left: 2,
                top: 2,
                zIndex: 999,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: 'red',
                padding: 4,
                backgroundColor: 'red',
                width: '13%',
                alignItems: 'center',
              }}
              text="New"
            />
          )
        )}

        <View style={{height: '100%', width: '35%'}}>
          <ImageLoader
            fallbacks={fallbacks}
            style={[{height: '100%', width: '100%', borderRadius: 10}]}
            resizeMode="cover"
            source={image_url + item.image.img}
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
            {!hideIcon && (
              <Pressable onPress={onPressList}>
                <Feather name="more-vertical" size={25} color={'grey'} />
              </Pressable>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
