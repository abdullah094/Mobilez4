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
const Header = ({title = '', icon = true}) => {
  const accessToken = useSelector(selectAccessToken);

  const navigation = useNavigation();
  const [logIn, setLogIn] = useState();

  return (
    <View style={tw`h-16 flex-row items-center px-2 bg-[#015dcf]`}>
      <TouchableOpacity
        style={{position: 'absolute', left: 15}}
        onPress={() => {
          navigation.goBack();
        }}>
        {icon && (
          <Ionicons name="ios-arrow-back-sharp" color={color.white} size={27} />
        )}
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{
            color: color.white,
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
