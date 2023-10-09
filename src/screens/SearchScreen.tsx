import {SEARCH} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Divider, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import tw from 'twrnc';
import {ISearch, IndexNavigationProps} from '../types';
const {width, height} = Dimensions.get('window');
const SearchScreen = () => {
  const navigation = useNavigation<IndexNavigationProps<'Home'>>();
  const [searchedItems, setSearchedItems] = useState<ISearch[]>([]);
  const [query, setQuery] = useState('');
  const [delayQuery, setDelayQuery] = useState('');

  const [heading, setHeading] = useState('Home');
  const [deviceName, setDeviceName] = useState<string>('');

  const dispatch = useDispatch();
  const name = DeviceInfo.getBrand();

  useEffect(() => {
    const timeOutId = setTimeout(() => setQuery(delayQuery), 300);
    return () => clearTimeout(timeOutId);
  }, [delayQuery]);

  setTimeout(() => {
    setHeading(`${name}'s ${deviceName}`);
  }, 5000);
  DeviceInfo.getDeviceName().then(res => {
    setDeviceName(res);
  });

  const getSearchedItemsFunc = () => {
    axios
      .post(
        SEARCH,
        {
          search: query,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then(function (response) {
        const Search: ISearch[] = response.data.search_data;
        !response.data.message
          ? setSearchedItems(Search)
          : setSearchedItems([]);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const clear = () => {
    setDelayQuery('');
  };

  useEffect(() => {
    if (query === '') setSearchedItems([]);

    getSearchedItemsFunc();
  }, [query]);

  const hideDropdownAndKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={[tw`flex-1 z-10`, {borderRadius: 7}]}>
      <TextInput
        value={delayQuery}
        onChangeText={text => setDelayQuery(text)}
        placeholder="Search"
        placeholderTextColor={'white'}
        style={{
          width: '100%',
          height: 43,
          borderRadius: 7,
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
        <FlatList
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={false}
          data={searchedItems}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <List.Item
              titleStyle={{fontSize: 14, color: 'black'}}
              descriptionStyle={{fontSize: 10, color: 'black'}}
              left={() => (
                <Image
                  style={tw`w-10 h-10  mx-2`}
                  source={{
                    uri:
                      'https://www.mobilezmarket.com/images/' + item.image.img,
                  }}></Image>
              )}
              onPress={() => {
                navigation.navigate('ProductPage', {id: item.id});
                setSearchedItems([]);
              }}
              title={item.model}
              description={item.brand}
            />
          )}
        />
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
