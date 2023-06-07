import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GridItem from './GridItem';

import {CATEGORY} from '@env';
import axios from 'axios';
import tw from 'twrnc';
import {Category, NewDevice} from '../../type';

const RecentList = ({name, products = []}) => {
  const [data, setData] = useState([]);
  let Title = 'Recent Phones';
  if (name == Category.SMARTWATCH) Title = 'Recent Watches';
  if (name == Category.PHONE) Title = 'Recent Tablets';
  if (name == Category.RELATED_AD) Title = 'Related Ads';
  if (name == Category.MORE_AD) Title = 'More Ads';
  useEffect(() => {
    setData([]);
    if (name == Category.MORE_AD || name == Category.RELATED_AD) {
      setData(products);
      return;
    }
    axios
      .post(CATEGORY, {category: name, sort: 'created_at'})
      .then(response => {
        setData(response.data.data);
      });
  }, []);
  return (
    <View style={tw`w-full h-62 mt-4`}>
      {/* bar with heading and view more */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>{Title}</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        key={'_'}
        keyExtractor={item => '_' + item.id}
        contentContainerStyle={{
          justifyContent: 'space-between',
          // marginHorizontal: -15,
          paddingBottom: 10,
        }}
        horizontal
        renderItem={({item}: {item: NewDevice}) => (
          <GridItem item={item} image={item.image.img}></GridItem>
        )}
      />
    </View>
  );
};

export default RecentList;

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
  },
});
