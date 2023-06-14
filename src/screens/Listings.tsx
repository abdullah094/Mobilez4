import {CATEGORY} from '@env';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('desc');
  const [data, setData] = useState<Product[]>([]);
  const [Grid, setGrid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setForm(route.params.form);
  }, [route.params.form]);

  const [form, setForm] = useState<Form>({});
  console.log({form});

  const clear = () => {};
  useEffect(() => {
    // setData([]);
    if (form.brand) {
      setQuery(form.brand);
    }
    // let filter = {};
    // if (form) {

    //   filter = Object.fromEntries(
    //     Object.entries(form).filter(([_, value]) => value !== null),
    //   );
    // }
    axios
      .post(CATEGORY + `?page=${pageNumber}`, {
        search: query,
        sort: sort,
        order: order,

        ...form,
      })
      .then(response => {
        const pagination: Pagination = response.data.data;
        console.log(pagination);
        // setPageNumber(pagination.current_page);
        setData([...data, ...pagination.data]);
        setIsRefreshing(false);
      });
  }, [query, sort, route, pageNumber, form, order]);

  const handleValueChange = useCallback((lowValue, highValue) => {
    setForm({...form, max_price: highValue, min_price: lowValue});
  }, []);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    setQuery('');
    // and set isRefreshing to false at the end of your callApiMethod()
  };
  if (!data) return <Loading />;

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPageNumber(pageNumber + 1)}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {isRefreshing ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.header}>
        <Header title={String(form.category).toUpperCase()}></Header>
        <View style={tw`relative rounded-md flex-1`}>
          <View style={tw`flex-1 z-10`}>
            <TextInput
              placeholder="Search"
              onChangeText={setQuery}
              value={query}
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
        <View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Sort name="sort" color="black" size={20} />
            <Text
              style={{paddingHorizontal: 5, fontWeight: '700', color: 'black'}}>
              Sort
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{color: 'black'}}>Sort Order by:</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setOrder('desc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="first"
                        status={order === 'desc' ? 'checked' : 'unchecked'}
                      />
                      <Text style={{color: 'black'}}>Price High to low</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOrder('asc');
                      setModalVisible(false);
                    }}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="second"
                        status={order === 'asc' ? 'checked' : 'unchecked'}
                      />
                      <Text style={{color: 'black'}}>Price High to low</Text>
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
            icon={sort == 'price' ? 'check' : ''}
            style={tw`mr-2 bg-blue-600`}
            textStyle={{color: 'white'}}
            onPress={() => setModalVisible(true)}
            selectedColor={'black'}>
            Price
          </Chip>
          <Chip
            icon={sort == 'City' ? 'check' : ''}
            style={tw`mr-2  bg-blue-600`}
            textStyle={{color: 'white'}}
            onPress={() => setPriceModalVisible(true)}>
            Price Range
          </Chip>
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
            paddingBottom: 100,
          }}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListFooterComponent={renderFooter}
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
            paddingBottom: 100,
          }}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListFooterComponent={renderFooter}
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
                <Text style={{color: 'black'}}>Close</Text>
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
});
