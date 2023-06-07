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
import {CATEGORY} from '@env';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Category} from '../../type';

const {width, height} = Dimensions.get('window');
const Listings = ({params}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name} = route.params;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('created_at');

  const [data, setData] = useState([]);

  const [Grid, setGrid] = useState(false);
  const clear = () => {};
  useEffect(() => {
    setData([]);
    axios
      .post(CATEGORY, {category: name, search: query, sort: sort})
      .then(response => {
        setData(response.data.data);
      });
    console.log(query);
  }, [query, sort]);

  if (!data) return <Loading />;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.header}>
        <View style={tw`h-16 flex-row items-center justify-between px-2`}>
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
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => navigation.navigate('Filter')}>
            <Ionicons name="filter" color={color.white} size={25} />
            {/* <Text style={{color: color.white, fontWeight: '500'}}>Filter</Text> */}
          </TouchableOpacity>
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
        <Sort st name="sort" color={color.black} size={30} />
        <Text style={tw`px-2 font-bold text-lg`}>Sort</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`px-2 flex-1`}>
          <Chip
            icon={sort == 'price' ? 'check' : ''}
            style={tw`mr-2`}
            onPress={() => setSort('price')}>
            Price
          </Chip>
          <Chip
            icon={sort == 'ram' ? 'check' : ''}
            style={tw`mr-2`}
            onPress={() => setSort('ram')}>
            Ram
          </Chip>
          <Chip
            icon={sort == 'storage' ? 'check' : ''}
            style={tw`mr-2`}
            onPress={() => setSort('storage')}>
            Storage
          </Chip>
          <Chip
            icon={sort == 'warranty' ? 'check' : ''}
            style={tw`mr-2`}
            onPress={() => setSort('warranty')}>
            Warrant
          </Chip>
          <Chip
            selected={sort == 'pta_status'}
            icon={sort == 'pta_status' ? 'check' : ''}
            style={tw`mr-2`}
            onPress={() => setSort('pta_status')}>
            PTA
          </Chip>
        </ScrollView>
        <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
          <ListIcon
            name="list"
            color={Grid ? color.black : color.red}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGrid(true)}>
          <Entypo
            name="grid"
            color={Grid ? color.red : color.black}
            size={30}
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
  small_text: {
    color: 'gray',
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
