import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {SEARCH} from '@env';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import tw from 'twrnc';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

import {
  reduxSetAccessToken,
  setProfileData,
  reduxRemoveAccessToken,
} from '../Redux/Slices';
const {width, height} = Dimensions.get('window');
const SearchScreen = ({navigation}) => {
  const [searchedItems, setSearchedItems] = useState();
  const [searchText, setSearchText] = useState();
  const [heading, setHeading] = useState('Home');
  const [accessToken, setAccessToken] = useState();
  const isFocused = useIsFocused();
  const [deviceName, setDeviceName] = useState();

  const _accesstoken = useSelector(state => state.todo.accessToken);
  const dispatch = useDispatch();
  const name = DeviceInfo.getBrand();
  setTimeout(() => {
    setHeading(`${name}'s ${deviceName}`);
  }, 5000);
  DeviceInfo.getDeviceName().then(res => {
    setDeviceName(res);
  });
  let _accessToken;
  _accessToken = useSelector(state => state.todo.accessToken);

  const getSearchedItemsFunc = () => {
    axios
      .post(
        SEARCH,
        {
          search: searchText,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then(function (response) {
        //handle success
        response.data.message || setSearchedItems(response.data.search_data);
        console.log(response.data.search_data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  useEffect(() => {
    console.log('fetch access token HOme useeffect');
    let user_token;
    setTimeout(async () => {
      user_token = null;
      try {
        user_token = await AsyncStorage.getItem('@user_token');
        setAccessToken(user_token);
        dispatch(reduxSetAccessToken(user_token));
      } catch (e) {
        if (user_token === null) {
          setAccessToken();
          dispatch(reduxRemoveAccessToken());
        }
        console.log(e);
      }
    }, 200);
  }, [isFocused]);

  useEffect(() => {
    getSearchedItemsFunc();
  }, [searchText]);
  return (
    <View>
      <View style={styles.header}>
        <Pressable
          style={{padding: 5, position: 'absolute', top: 10, left: 5}}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="keyboard-arrow-left"
            size={38}
            color={color.white}
          />
        </Pressable>

        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              alignItems: 'center',
              marginTop: 40,
            },
          ]}></View>

        <View style={tw`relative rounded-md `}>
          <TextInput
            autoFocusdsad
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholder="Search"
            placeholderTextColor={'white'}
            style={{
              height: 43,
              borderRadius: 4,
              backgroundColor: '#4894F1',
              paddingLeft: 32,
              paddingHorizontal: 8,
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              color: 'white',
            }}></TextInput>
          <Icon
            style={tw`absolute top-9 left-2`}
            name="magnifying-glass"
            size={20}
            color={'white'}
          />
        </View>
      </View>

      <FlatList
        keyboardShouldPersistTaps="handled"
        data={searchedItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('ProductPage', {id: item.id})}
            style={{
              width: width - 50,
              borderBottomWidth: 1,
              paddingTop: 20,
              borderColor: color.white,
              paddingVertical: 2,
              padding: 2,
              paddingHorizontal: 25,
            }}>
            <Text style={{color: color.black}}>
              {item.brand} <Text>{item.model}</Text>
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    width: width,
    paddingHorizontal: 24,

    height: 150,
    borderBottomWidth: 1,
    backgroundColor: '#015dcf',
  },
});
