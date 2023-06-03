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
import Icon from 'react-native-vector-icons/Entypo';
const HomeFlatlist = props => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const image_url = 'https://www.mobilezmarket.com/images/';

    const id = item.id;

    return (
      <TouchableOpacity
        style={{
          width: 150,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('ProductPage', {id: id})}>
        <Image
          style={{
            height: 108,
            width: 98,
            marginBottom: 5,
            backgroundColor: color.black,
            borderRadius: 10,
          }}
          source={{uri: image_url + item?.image?.img}}
          resizeMode="contain"
        />
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              width: '85%',
              color: '#252B5C',
            }}>
            {item.brand} <Text>{item.model}</Text>
          </Text>
          <Text numberOfLines={1} style={{color: '#015DCF'}}>
            Rs. {item.price}
          </Text>
        </View>
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
            alignItems: 'center',

            width: '90%',
            marginTop: 2,
          }}>
          <Icon name="location-pin" size={10} />
          <Text style={styles.small_text}>{item.user.city}</Text>
          {/* <Text style={styles.small_text}>
            {item.created_at.substring(0, 10)}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </>
  );
};

export default HomeFlatlist;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
  },
});
