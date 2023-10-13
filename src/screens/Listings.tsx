import {CATEGORY} from '@env';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
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
import Lottie from 'lottie-react-native';
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
  const [form, setForm] = useState<Form>({});

  const [query, setQuery] = useState('');
  const [delayQuery, setDelayQuery] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [data, setData] = useState<Product[]>([]);
  const [Grid, setGrid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [fistTimeRender, setFistTimeRender] = useState(true);
  useEffect(() => {
    const timeOutId = setTimeout(() => setQuery(delayQuery), 300);
    return () => clearTimeout(timeOutId);
  }, [delayQuery]);

  console.log('form.category', route?.params?.form?.category);

  useEffect(() => {
    setForm(route.params.form);
    if (route.params.form.brand) {
      setQuery(route.params.form.brand);
    }
  }, [route.params.form]);

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
    if (pageNumber == 1) {
      setIsLoading(true);
    }
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
          const alreadyLoadedItemsID = data.map(x => x.id);
          const newItems = pagination.data.filter(
            y => !alreadyLoadedItemsID.includes(y.id),
          );
          setData([...data, ...newItems]);
        }
        // setData(pagination.data);
        // load more complete, set loading more to false
        setLoadingMore(false);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
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
    <>
      <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
        <View style={tw`bg-[#edf2f2] flex-1`}>
          <View style={styles.header}>
            <Header title={route?.params?.form?.category}></Header>
            <View
              style={[tw`relative rounded-md flex-1`, {paddingHorizontal: 20}]}>
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
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    color: 'white',
                  }}
                />
                <Entypo
                  style={tw`absolute top-5.5 left-2`}
                  name="magnifying-glass"
                  size={20}
                  color={'white'}
                />
                <TouchableOpacity
                  style={tw`absolute top-5.5 right-2`}
                  onPress={clear}>
                  <Entypo name="cross" size={20} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={[
              tw` flex-row items-center justify-between m-3`,
              {paddingVertical: 10},
            ]}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginLeft: 2,
                width: '21%',

                // borderWidth: 1,
                backgroundColor: color.orange,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 6,
              }}
              onPress={() => navigation.navigate('Filter', {form})}>
              <Ionicons name="filter" color={color.white} size={20} />
              <Text
                style={{
                  paddingHorizontal: 5,
                  fontWeight: '700',
                  color: 'white',
                }}>
                Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 2,
                width: '21%',
                // borderWidth: 1,
                backgroundColor: color.orange,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 6,
              }}
              onPress={() => {
                console.log('click');
                setModalVisible(true);
              }}>
              <Sort name="sort" color={color.white} size={20} />
              <Text
                style={{
                  paddingHorizontal: 5,
                  fontWeight: '700',
                  color: 'white',
                }}>
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
                    <Text style={{color: 'black'}}> Sort Order by:Price</Text>
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
                          <Text style={{color: 'black'}}> high to low</Text>
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
                          <Text style={{color: 'black'}}> low to high</Text>
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

            {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`px-2 flex-1`}> */}
            <Chip
              style={{
                backgroundColor: color.orange,
                width: '33%',
              }}
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
            {/* </ScrollView> */}

            <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
              <ListIcon
                name="list"
                color={Grid ? color.black : color.blue}
                size={27}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGrid(true)}>
              <Entypo
                name="grid"
                color={Grid ? color.blue : color.black}
                size={27}
              />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <Lottie
              source={require('../assets/animations/animationSkeleton.json')}
              autoPlay
              loop
              style={{
                width: '95%',

                alignSelf: 'center',
                backgroundColor: color.white,
              }}
              resizeMode="cover"
              speed={0.7}
            />
          ) : Grid ? (
            <FlatList
              data={data}
              key={'_'}
              keyExtractor={item => '_' + item.id}
              contentContainerStyle={{
                // justifyContent: 'space-between',
                // alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                // paddingBottom: 100,
                // borderWidth: 1,
              }}
              showsVerticalScrollIndicator={false}
              // onRefresh={() => setQuery('')}
              // refreshing={loadingMore}
              ListHeaderComponent={
                <View style={[styles.listHeader, {alignSelf: 'flex-start'}]}>
                  <Text style={styles.title}>
                    Displaying {data.length} Items out of {totalItems}
                  </Text>
                </View>
              }
              ListFooterComponent={
                <View style={styles.listFooter}>
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
              renderItem={({item}) => (
                <GridItem hideIcon={true} item={item}></GridItem>
              )}
            />
          ) : (
            <FlatList
              data={data}
              key={'#'}
              keyExtractor={item => '#' + item.id}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                // paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
              // onRefresh={() => setQuery('')}
              // refreshing={loadingMore}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <Text style={styles.title}>
                    Displaying {data.length} Items out of {totalItems}
                  </Text>
                </View>
              }
              ListFooterComponent={
                <View style={styles.listFooter}>
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
              renderItem={({item}) => (
                <ListItem hideIcon={true} item={item}></ListItem>
              )}
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
        </View>
      </SafeAreaView>
    </>
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
    paddingHorizontal: 5,
    height: 150,
    // borderBottomWidth: 1,
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
  listHeader: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    // borderWidth: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  listFooter: {
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
