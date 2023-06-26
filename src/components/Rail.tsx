import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    width: '100%',
  },
});
