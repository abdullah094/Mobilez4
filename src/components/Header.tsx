import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../constants/Colors';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const Header = ({title = ''}) => {
  const navigation = useNavigation();
  return (
    <View
      style={tw`h-16 flex-row items-center justify-between px-2 bg-[#015dcf]`}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Ionicons name="ios-arrow-back-sharp" color={color.white} size={25} />
      </TouchableOpacity>
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
