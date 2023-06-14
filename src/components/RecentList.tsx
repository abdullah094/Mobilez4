import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import GridItem from './GridItem';

import {CATEGORY} from '@env';
import axios from 'axios';
import tw from 'twrnc';
import {Category, Pagination, Product} from '../types';

const RecentList = ({
  name,
  products = [],
}: {
  name: Category;
  products?: Product[];
}) => {
  const [data, setData] = useState<Product[]>([]);
  let Title = 'Related Ads';
  if (name == Category.SMARTWATCH) Title = 'Recent Watches';
  if (name == Category.PHONE) Title = 'Recent Phones';
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
        const pagination: Pagination = response.data.data;
        setData(pagination.data);
      });
  }, []);
  return (
    <View style={tw`w-full h-70 mt-4`}>
      {/* bar with heading and view more */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 9,
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
        renderItem={({item}: {item: Product}) => (
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
