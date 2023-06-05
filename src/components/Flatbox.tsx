import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import HomeFlatlist from './HomeFlatlist';
import {color} from '../constants/Colors';
const {height, width} = Dimensions.get('window');
const Flatbox = ({header, data, type}) => {
  return (
    <View style={{width: width - 20, marginTop: 15}}>
      {/* bar with heading and view more */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>{header}</Text>
      </View>
      {/* flatlist  */}
      <View style={styles._flatlist}>
        <HomeFlatlist data={data} type={type} />
      </View>
    </View>
  );
};

export default Flatbox;

const styles = StyleSheet.create({
  _flatlist: {
    marginBottom: 10,
  },
  heading: {
    color: color.black,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
  },
});
