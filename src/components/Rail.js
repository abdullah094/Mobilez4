import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',

    width: 330,
  },
});
