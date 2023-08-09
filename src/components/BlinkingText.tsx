import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';

const BlinkingText = ({style, text}) => {
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 1000, // Duration for the fade-out effect
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000, // Duration for the fade-in effect
          useNativeDriver: true,
        }),
      ]),
    );

    blinkingAnimation.start();

    return () => blinkingAnimation.stop();
  }, [opacityValue]);

  return (
    <Animated.View style={{...style, opacity: opacityValue}}>
      <Text style={{color: 'white', fontSize: 10, fontWeight: '600'}}>
        {text}
      </Text>
    </Animated.View>
  );
};

export default BlinkingText;
