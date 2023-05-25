import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {color} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
const HomeFlatlist = props => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const image_url = 'https://mobilezmarket.com/images/';

    const id = item.id;

    return (
      <TouchableOpacity
        style={{
          width: 200,
          margin: 5,
          marginVertical: 10,
          padding: 10,
          backgroundColor: color.white,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
        onPress={() => navigation.navigate('ProductPage', {id: id})}>
        <Image
          style={{
            height: 150,
            width: '100%',
            marginBottom: 5,
            backgroundColor: color.black,
            borderRadius: 10,
          }}
          source={{uri: image_url + item?.image?.img}}
          resizeMode="contain"
        />

        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            width: '95%',
            fontWeight: 'bold',
            color: color.black,
          }}>
          {item.brand} <Text>{item.model}</Text>
        </Text>
        <Text
          numberOfLines={1}
          style={{color: color.orange, fontWeight: 'bold'}}>
          Rs. {item.price}
        </Text>
        {props.type === 'phones' && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                marginTop: 2,
              }}>
              <Text style={styles.small_text}>{item.ram}GB</Text>
              <Text style={styles.small_text}> | </Text>

              <Text style={styles.small_text}>{item.storage}GB</Text>
              <Text style={styles.small_text}> | </Text>
              <Text style={styles.small_text}>{item.pta_status}</Text>
            </View>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginTop: 2,
          }}>
          <Text style={styles.small_text}>{item.user.city}</Text>
          <Text style={styles.small_text}>
            {item.created_at.substring(0, 10)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={props.data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default HomeFlatlist;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
  },
});
