import {CATEGORY} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
import ListItem from '../components/ListItem';
import {Form, Pagination, Product} from '../types';

const {width, height} = Dimensions.get('window');
const Listings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name, form} = route.params as {name: string; form: Form};
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('desc');
  const [data, setData] = useState<Product[]>([]);
  const [Grid, setGrid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const clear = () => {};
  useEffect(() => {
    setData([]);
    let filter = {};
    if (form) {
      if (form.brand) {
        setQuery(form.brand);
      }
      filter = Object.fromEntries(
        Object.entries(form).filter(([_, value]) => value !== null),
      );
    }
    axios
      .post(CATEGORY, {
        category: name,
        search: query,
        sort: sort,
        order: order,
        ...filter,
      })
      .then(response => {
        const pagination: Pagination = response.data.data;
        setData(pagination.data);
      });
  }, [query, sort, route, name, order]);

  if (!data) return <Loading />;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.header}>
        <View style={tw`h-16  flex-row items-center justify-between  px-2`}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={color.white}
              size={25}
            />
          </TouchableOpacity>
          <Text style={{color: color.white, fontWeight: '500'}}>
            {String(name).toUpperCase()}
          </Text>
          <View></View>
        </View>
        {/* // price/ location /model/modelyear */}
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
          {/* <View
              style={tw`w-full px-6 top-[90px] absolute items-center rounded-[13px] overflow-hidden z-1`}>
              <HomeSlider />
            </View> */}
        </View>
      </View>

      <View style={tw` flex-row items-center justify-between m-6`}>
        <View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setModalVisible(true)}>
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
                  <View style={styles.radioButton}>
                    <RadioButton
                      value="first"
                      status={order === 'desc' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setOrder('desc');
                        setModalVisible(false);
                      }}
                    />
                    <Text style={{color: 'black'}}>Highest to lowest</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton
                      value="false"
                      status={order === 'asc' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setOrder('asc');
                        setModalVisible(false);
                      }}
                    />
                    <Text style={{color: 'black'}}>lowest to highest</Text>
                  </View>
                  <View style={styles.radioButton}>
                    {/* <RadioButton value='false'
                   onPress={() =>{   
                   setModalVisible(false)}} />
                  <Text style={{color:'black'}}>Most Recent</Text> */}
                  </View>
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
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() => navigation.navigate('Filter', {name})}>
          <Ionicons name="filter" color={color.black} size={20} />
          <Text
            style={{paddingHorizontal: 5, fontWeight: '700', color: 'black'}}>
            Filter
          </Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`px-2 flex-1`}>
          <Chip
            icon={sort == 'price' ? 'check' : ''}
            style={tw`mr-2 bg-blue-600`}
            textStyle={{color: 'white'}}
            onPress={() => setSort('price')}
            selectedColor={'black'}>
            Price
          </Chip>
          <Chip
            icon={sort == 'City' ? 'check' : ''}
            style={tw`mr-2  bg-blue-600`}
            textStyle={{color: 'white'}}
            onPress={() => setSort('City')}>
            City
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
          numColumns={2}
          renderItem={({item}) => (
            <GridItem item={item} image={item.image.img}></GridItem>
          )}
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
          numColumns={1}
          renderItem={({item}) => (
            <ListItem item={item} image={item.image.img}></ListItem>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Listings;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  radioContainer: {
    marginTop: 10,
    marginBottom: 20,
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
});
