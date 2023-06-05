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
import tw from 'twrnc';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const HomeFlatlist = props => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const image_url = 'https://www.mobilezmarket.com/images/';

    const id = item.id;
    const dateString = item.created_at;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    console.log(formattedDate);
    // console.log(id);
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
        onPress={() => navigation.navigate('ProductPage', {id: id})}>
        <View style={tw`flex items-center justify-center w-32`}>
          <Image
            style={{
              height: 120,
              width: '100%',
              marginBottom: 5,
              backgroundColor: color.black,
              borderRadius: 10,
            }}
            source={{uri: image_url + item?.image?.img}}
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
            <Text
              numberOfLines={1}
              style={{color: '#015DCF', fontWeight: '800'}}>
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
                <Icon name="location-pin" size={10} color={color.red} />
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

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 10}}
      />
    </>
  );
};

export default HomeFlatlist;

const styles = StyleSheet.create({
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
});
