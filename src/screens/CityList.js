import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {const_styles} from '../constants/Styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';
import {cities} from '../data/test';
const {width, heigth} = Dimensions.get('window');
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
      <View style={styles.flatlist}>
        <FlatList
          data={cities}
          keyExtractor={(item, index) => index}
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
  flatlist: {
    flex: 0.99,
    marginBottom: 1,
  },
});
