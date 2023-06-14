import React, {useCallback, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Slider from 'rn-range-slider';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
const {width} = Dimensions.get('window');

const PriceRange = ({handleValueChange}) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);

  const renderThumb = useCallback(name => <Thumb name={name} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const ValueChange = useCallback((lowValue, highValue) => {
    setHigh(highValue);
    setLow(lowValue);
    handleValueChange(lowValue, highValue);
  }, []);

  return (
    <View style={tw`w-full`}>
      <Text
        style={{
          color: color.white,
          fontWeight: '400',
          fontSize: 15,
          paddingVertical: 16,
        }}>
        Price Range
      </Text>

      <View style={tw`flex-row justify-between`}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 8,
            width: 100,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white'}}>{low}</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 8,
            width: 100,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white'}}>{high}</Text>
        </View>
      </View>
      <Slider
        style={{width: '100%'}}
        min={min}
        max={max}
        step={1000}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={ValueChange}
      />
    </View>
  );
};

export default PriceRange;
