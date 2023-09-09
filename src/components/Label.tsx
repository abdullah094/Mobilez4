import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Label = ({text, ...restProps}) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    color: '#fff',
  },
});

export default memo(Label);
