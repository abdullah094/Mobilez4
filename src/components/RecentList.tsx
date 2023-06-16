import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GridItem from './GridItem';

import {CATEGORY} from '@env';
import axios from 'axios';
import tw from 'twrnc';
import {Category, Form, Pagination, Product} from '../types';

const RecentList = ({
  name,
  products = [],
}: {
  name: Category;
  products?: Product[];
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('desc');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<Form>({});

  const [allLoaded, setAllLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
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
    loadData(1);
  }, []);

  const loadData = pageNumber => {
    console.log(CATEGORY + `?page=${pageNumber}`);
    axios
      .post(CATEGORY + `?page=${pageNumber}`, {
        category: name,
        sort: 'created_at',
      })

      .then(response => {
        const pagination: Pagination = response.data.data;
        console.log({pagination});
        setTotalItems(pagination.total);
        setPageNumber(pagination.current_page);
        // if no new items were fetched, set all loaded to true to prevent further requests
        setAllLoaded(pagination.next_page_url == null);
        // process the newly fetched items
        // setData([...new Set([...data, ...pagination.data])]);
        if (pageNumber == 1) {
          setData(pagination.data);
        } else {
          const alreadloadeditemsID = data.map(x => x.id);
          const newItems = pagination.data.filter(
            y => !alreadloadeditemsID.includes(y.id),
          );
          setData([...data, ...newItems]);
        }
        // setData(pagination.data);
        // load more complete, set loading more to false
        setLoadingMore(false);
      });
  };

  const loadMoreResults = async info => {
    console.log('loading more data');
    // if already loading more, or all loaded, return
    if (loadingMore || allLoaded) return;
    // set loading more (also updates footer text)
    setLoadingMore(true);

    loadData(pageNumber + 1);
  };
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
      {data.length < 1 ? (
        <>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={'large'} color={'#306CCE'} />
          </View>
        </>
      ) : (
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
          ListFooterComponent={
            <View style={[styles.container, styles.horizontal]}>
              {loadingMore && (
                <ActivityIndicator size={'large'} color={'#306CCE'} />
              )}
            </View>
          }
          scrollEventThrottle={250}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            loadMoreResults(info);
          }}
          horizontal
          renderItem={({item}: {item: Product}) => (
            <GridItem item={item} image={item.image.img}></GridItem>
          )}
        />
      )}
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
  listfooter: {
    padding: 15,
  },
  footerText: {
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
