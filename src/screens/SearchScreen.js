import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {SEARCH} from '@env';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const SearchScreen = ({navigation}) => {
  const [searchedItems, setSearchedItems] = useState();
  const [searchText, setSearchText] = useState();

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
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  useEffect(() => {
    getSearchedItemsFunc();
  }, [searchText]);
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: color.gray}}>
      <Header header={'Search here'} onPress={() => navigation.goBack()} />
      <TextInput
        autoFocus
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={{
          width: width - 40,
          borderRadius: 20,
          backgroundColor: 'white',
          height: 50,
          padding: 3,
          paddingHorizontal: 20,
          marginBottom: 10,
          marginTop: 100,
          color: color.black,
        }}
      />

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

const styles = StyleSheet.create({});
