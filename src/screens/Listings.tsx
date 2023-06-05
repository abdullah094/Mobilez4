import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../constants/Colors';
import {NEW_USED_PHONES} from '@env';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../components/Loading';
import tw from 'twrnc';
import HomeSlider from '../components/HomeSlider';
import {Button, Chip} from 'react-native-paper';
import ListIcon from 'react-native-vector-icons/Feather';

import GridItem from '../components/GridItem';
import ListItem from '../components/ListItem';

const {width, height} = Dimensions.get('window');
const Listings = ({route, navigation, props}) => {
  const [filter, setFilter] = useState(1);
  const {name} = route.params ?? 'New Phones';
  const [data, setData] = useState();
  const used_phone_api = NEW_USED_PHONES.replace('new', 'used');
  const image_url = 'https://www.mobilezmarket.com/images/';
  const fetchData = () => {
    const api = name === 'New Phones' ? NEW_USED_PHONES : used_phone_api;
    const data_collect = name === 'New Phones' ? `new_devices` : `used_devices`;
    // console.log(data_collect)
    axios.get(api).then(response => {
      const data = response.data[data_collect];
      console.log(response.data[data_collect]);
      data.filter(item => {
        item.price == '';
        item.created_at;
      });
      setData(response.data[data_collect]);
    });
  };
  const [Grid, setGrid] = useState(false);
  const column = Grid ? 2 : 1;
  const clear = () => {};
  useEffect(() => {
    fetchData();
  }, []);

  const Header = () => {
    return (
      <>
        <View style={styles.header}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                marginTop: 25,
              },
            ]}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons
                name="ios-arrow-back-sharp"
                color={color.white}
                size={25}
              />
            </TouchableOpacity>

            <View style={tw`flex flex-row items-center px-2`}>
              <Ionicons name="filter" color={color.white} size={25} />
              <Text style={{color: color.white, fontWeight: '500'}}>
                Filter
              </Text>
            </View>
            {/* // price/ location /model/modelyear */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tw`px-2`}>
              <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
                Price
              </Chip>
              <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
                Location
              </Chip>
              {/* <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Model
            </Chip>
            <Chip style={tw`mr-2`} onPress={() => console.log('Pressed')}>
              Year Model
            </Chip> */}
            </ScrollView>
          </View>
          <View style={tw`relative rounded-md flex-1`}>
            <View style={tw`flex-1 z-10`}>
              <TextInput
                placeholder="Search"
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
            <View
              style={tw`w-full px-6 top-[90px] absolute items-center rounded-[13px] overflow-hidden z-1`}>
              <HomeSlider />
            </View>
          </View>
        </View>
      </>
    );
  };

  if (!data) return <Loading />;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header></Header>

      <View style={tw` flex-row items-center justify-between pt-16 m-6`}>
        <TouchableOpacity>
          <View style={tw`flex flex-row items-center`}>
            <Sort st name="sort" color={color.black} size={30} />
            <Text style={tw`px-2 font-bold text-lg`}>Sort</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-row`}>
          <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
            <ListIcon name="list" color={color.black} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGrid(true)}>
            <Entypo name="grid" color={color.black} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {Grid ? (
        <FlatList
          data={data}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 15,
            paddingBottom: 100,
          }}
          numColumns={column}
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
          numColumns={column}
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
  small_text: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '700',
  },
  header: {
    width: width,
    paddingHorizontal: 24,
    height: 200,
    borderBottomWidth: 1,
    backgroundColor: '#015dcf',
    zIndex: 10,
  },
});
