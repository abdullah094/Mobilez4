import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const Header = ({title = ''}) => {
  const accessToken = useSelector(selectAccessToken);

  const navigation = useNavigation();
  const [logIn, setLogIn] = useState();
  return (
    <View
      style={tw`h-16 flex-row items-center justify-between px-2 bg-[#015dcf]`}>
      {accessToken === null && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Ionicons name="ios-arrow-back-sharp" color={color.white} size={25} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: color.white,
          textAlign: 'center',
          fontWeight: '500',
          flex: 1,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
