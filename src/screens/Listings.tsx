import {CATEGORY} from '@env';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Chip, RadioButton} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import Loading from '../components/Loading';
import {color} from '../constants/Colors';

import {useNavigation, useRoute} from '@react-navigation/native';
import GridItem from '../components/GridItem';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import PriceRange from '../components/PriceRange';
import {
  Form,
  IndexNavigationProps,
  IndexRouteProps,
  Pagination,
  Product,
} from '../types';

const {width, height} = Dimensions.get('window');
const Listings = () => {
  const navigation = useNavigation<IndexNavigationProps<'Listings'>>();
  const route = useRoute<IndexRouteProps<'Listings'>>();
  // const {name, form} = route.params as {name: string; form: Form};

  const [query, setQuery] = useState('');
  const [delayQuery, setDelayQuery] = useState('');
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('desc');
  const [data, setData] = useState<Product[]>([]);
  const [Grid, setGrid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [fistTimeRender, setFistTimeRender] = useState(true);
  useEffect(() => {
    const timeOutId = setTimeout(() => setQuery(delayQuery), 300);
    return () => clearTimeout(timeOutId);
  }, [delayQuery]);

  useEffect(() => {
    setForm(route.params.form);
    if (route.params.form.brand) {
      setQuery(route.params.form.brand);
    }
  }, [route.params.form]);

  const [form, setForm] = useState<Form>({});
  const clear = () => {
    setDelayQuery('');
  };
  useEffect(() => {
    if (fistTimeRender) {
      setFistTimeRender(false);
      return;
    }

    loadData(1);
  }, [query, sort, order, form]);

  const loadData = pageNumber => {
    console.log({
      search: query,
      sort: sort,
      order: order,
      ...form,
    });
    axios
      .post(CATEGORY + `?page=${pageNumber}`, {
        search: query,
        sort: sort,
        order: order,
        ...form,
      })
      .then(response => {
        const pagination: Pagination = response.data.data;
        // console.log({pagination});
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

  const handleValueChange = useCallback((lowValue, highValue) => {
    setForm({...form, max_price: highValue, min_price: lowValue});
  }, []);

  if (!data) return <Loading />;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.header}>
        <Header title={String(form.category).toUpperCase()}></Header>
        <View style={tw`relative rounded-md flex-1`}>
          <View style={tw`flex-1 z-10`}>
            <TextInput
              placeholder="Search"
              onChangeText={setDelayQuery}
              value={delayQuery}
              placeholderTextColor={'white'}
              style={{
                width: '100%',
                height: 43,
                borderRadius: 4,
                backgroundColor: '#4894F1',
                paddingLeft: 32,
                paddingHorizontal: 8,
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                color: 'white',
              }}
            />
            <Entypo
              style={tw`absolute top-9 left-2`}
              name="magnifying-glass"
              size={20}
              color={'white'}
            />
            <TouchableOpacity
              style={tw`absolute top-9 right-2`}
              onPress={clear}>
              <Entypo name="cross" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={tw` flex-row items-center justify-between m-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() => navigation.navigate('Filter', {form})}>
          <Ionicons name="filter" color={color.black} size={20} />
          <Text
            style={{paddingHorizontal: 5, fontWeight: '700', color: 'black'}}>
            Filter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            console.log('click');
            setModalVisible(true);
          }}>
          <Sort name="sort" color="black" size={20} />
          <Text
            style={{paddingHorizontal: 5, fontWeight: '700', color: 'black'}}>
            Sort
          </Text>
        </TouchableOpacity>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{color: 'black'}}> Sort Order by: {sort}</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setSort('price');
                      setOrder('desc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="first"
                        status={
                          order === 'desc' && sort === 'price'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                      <Text style={{color: 'black'}}>{sort} high to low</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSort('price');
                      setOrder('asc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="second"
                        status={
                          order === 'asc' && sort === 'price'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                      <Text style={{color: 'black'}}>{sort} low to high</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setSort('Recently Added')
                      setSort('created_at');
                      setOrder('asc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="third"
                        status={
                          order === 'asc' && sort === 'created_at'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                      <Text style={{color: 'black'}}>Recently Added</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSort('created_at');
                      setOrder('desc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="fourth"
                        status={
                          order === 'desc' && sort === 'created_at'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />

                      <Text style={{color: 'black'}}>Default</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{color: 'black'}}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`px-2 flex-1`}>
          <Chip
            style={tw`mr-2  bg-blue-600`}
            textStyle={{color: 'white'}}
            onPress={() => setPriceModalVisible(true)}>
            Price Range
          </Chip>
          {/* <Chip
            style={tw`mr-2  bg-blue-600`}
            icon={sort == 'ram' ? 'check' : ''}
            textStyle={{color: 'white'}}
            onPress={() => {
              setSort('ram');
              setModalVisible(true);
            }}>
            ram
          </Chip> */}
        </ScrollView>

        <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
          <ListIcon
            name="list"
            color={Grid ? color.black : color.red}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGrid(true)}>
          <Entypo
            name="grid"
            color={Grid ? color.red : color.black}
            size={20}
          />
        </TouchableOpacity>
      </View>
      {Grid ? (
        <FlatList
          data={data}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
            // paddingBottom: 100,
          }}
          // onRefresh={() => setQuery('')}
          // refreshing={loadingMore}
          ListHeaderComponent={
            <View style={styles.listheader}>
              <Text style={styles.title}>
                Displaying {data.length} Items out of {totalItems}
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.listfooter}>
              {loadingMore && (
                <Text style={styles.title}>
                  <Text style={styles.footerText}>Loading More...</Text>
                </Text>
              )}
            </View>
          }
          scrollEventThrottle={250}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            loadMoreResults(info);
          }}
          numColumns={2}
          renderItem={({item}) => <GridItem item={item}></GridItem>}
        />
      ) : (
        <FlatList
          data={data}
          key={'#'}
          keyExtractor={item => '#' + item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 15,
            // paddingBottom: 100,
          }}
          // onRefresh={() => setQuery('')}
          // refreshing={loadingMore}
          ListHeaderComponent={
            <View style={styles.listheader}>
              <Text style={styles.title}>
                Displaying {data.length} Items out of {totalItems}
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.listfooter}>
              {loadingMore && (
                <Text style={styles.footerText}>Loading More...</Text>
              )}
            </View>
          }
          scrollEventThrottle={250}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            loadMoreResults(info);
          }}
          numColumns={1}
          renderItem={({item}) => <ListItem item={item}></ListItem>}
        />
      )}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={priceModalVisible}
          onRequestClose={() => setPriceModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, tw`bg-[#015DCF] `]}>
              <View style={styles.radioContainer}>
                <PriceRange handleValueChange={handleValueChange} />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPriceModalVisible(false)}>
                <Text style={{color: 'white'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Listings;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  radioContainer: {
    marginTop: 10,
    marginBottom: 20,
    // width: 200,
    zIndex: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  small_text: {
    color: 'black',
    fontSize: 10,
    fontWeight: '700',
  },
  header: {
    width: width,
    paddingHorizontal: 24,
    height: 150,
    borderBottomWidth: 1,
    backgroundColor: '#015dcf',
    zIndex: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  listheader: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  listfooter: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontWeight: '600',
    color: 'black',
  },
});
