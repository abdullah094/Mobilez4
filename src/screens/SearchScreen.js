import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {SEARCH} from '@env';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import {
  reduxSetAccessToken,
  setProfileData,
  reduxRemoveAccessToken,
} from '../Redux/Slices';
const {width, height} = Dimensions.get('window');
const SearchScreen = () => {
  const navigation = useNavigation();
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
        console.log('------------------------', response.data.message);
        !response.data.message
          ? setSearchedItems(response.data.search_data)
          : setSearchedItems();
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

  const clear = () => {
    setSearchText('');
  };

  useEffect(() => {
    if (searchText == '') setSearchedItems();

    getSearchedItemsFunc();
  }, [searchText]);
  return (
    <View style={tw`flex-1 z-10`}>
      <TextInput
        value={searchText}
        clearTextOnFocus={() => setSearchText('')}
        onChangeText={text => setSearchText(text)}
        placeholder="Search"
        placeholderTextColor={'white'}
        style={{
          width: '100%',
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
        }}
      />
      <Icon
        style={tw`absolute top-9 left-2`}
        name="magnifying-glass"
        size={20}
        color={'white'}
      />
      <TouchableOpacity style={tw`absolute top-9 right-2`} onPress={clear}>
        <Icon name="cross" size={20} color={'white'} />
      </TouchableOpacity>

      <View style={tw`bg-white z-10`}>
        {searchedItems ? (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={searchedItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductPage', {id: item.id})
                }
                style={{
                  width: width - 50,
                  borderBottomWidth: 1,
                  paddingTop: 20,
                  borderColor: color.white,
                  paddingVertical: 2,
                  padding: 2,
                }}>
                <Text style={{color: color.black}}>
                  {item.brand} <Text>{item.model}</Text>
                </Text>
              </Pressable>
            )}
          />
        ) : (
          <Text>Not availableI</Text>
        )}
      </View>
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
