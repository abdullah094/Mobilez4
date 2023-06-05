import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';

const GridItem = ({item, image}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const props = route.params as any;
  const image_url = 'https://www.mobilezmarket.com/images/';
  const dateString = item.created_at;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  return (
    <TouchableOpacity
      style={{
        overflow: 'hidden',
        marginTop: 20,
        shadowColor: '#000',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        marginLeft: 16,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={() => navigation.navigate('ProductPage', {id: item.id})}>
      <View style={tw`flex items-center justify-center w-32`}>
        <Image
          style={{
            height: 120,
            width: '100%',
            marginBottom: 5,
            backgroundColor: color.black,
            borderRadius: 10,
          }}
          source={{uri: image_url + image}}
          resizeMode="contain"
        />

        <View style={{justifyContent: 'flex-start', width: 135}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              color: '#252B5C',
              fontWeight: '800',
            }}>
            {item.brand} <Text>{item.model}</Text>
          </Text>
          <Text numberOfLines={1} style={{color: '#015DCF', fontWeight: '800'}}>
            Rs. {item.price}
          </Text>

          {props.type === 'phones' && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  width: '90%',
                  marginTop: 2,
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
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                marginTop: 2,
              }}>
              <Icon name="location-pin" size={10} color={'red'} />
              <Text style={styles.small_text}>{item.user.city}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.small_text}>
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GridItem;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
});
