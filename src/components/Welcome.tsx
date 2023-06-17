import React, {useEffect, useState} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';
import Logo from '../assets/mobile-logo.png';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Welcome = () => {
  const [size] = useState(new Animated.Value(1));

  useEffect(() => {
    loopAnimationUp();
  }, []);

  const loopAnimationUp = () => {
    size.setValue(1);
    Animated.timing(size, {
      toValue: 10,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(o => {
      if (o.finished) {
        loopAnimationDown();
      }
    });
  };

  const loopAnimationDown = () => {
    size.setValue(20);
    Animated.timing(size, {
      toValue: 10,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(o => {
      if (o.finished) {
        loopAnimationUp();
      }
    });
  };

  const animatedSize = size.interpolate({
    inputRange: [1, 10],
    outputRange: [100, 200],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <AnimatedImage
        style={[
          styles.image,
          {
            width: animatedSize,
            height: animatedSize,
          },
        ]}
        source={Logo}
        resizeMode="contain" // Add this line
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Welcome;
