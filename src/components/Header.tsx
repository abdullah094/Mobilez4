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

const {width, height} = Dimensions.get('window');
const Header = ({header = null, onPress}) => {
  return (
    <SafeAreaView
      style={{
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 50,
        position: 'absolute',
        zIndex: 999,
      }}>
      <TouchableOpacity
        style={{padding: 5, position: 'absolute', left: 20}}
        onPress={onPress}>
        <MaterialIcon name="arrow-back-ios" size={25} color={color.black} />
      </TouchableOpacity>
      <Text style={{fontWeight: 'bold', color: color.black, fontSize: 20}}>
        {header}
      </Text>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
