import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../constants/Colors';
import {const_styles} from '../constants/Styles';
import {cities} from '../data/test';
const {width} = Dimensions.get('window');
const CityList = ({navigation}) => {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SignUp', {city: item.city})}
      style={{
        width: width,
        height: 50,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 5,
      }}>
      <Text>{item.city}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={const_styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={cities}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default CityList;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: color.white,
    width: '80%',
    height: 40,
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.black,
    paddingHorizontal: 10,
    paddingLeft: 15,
  },
  flatList: {
    flex: 0.99,
    marginBottom: 1,
  },
});
