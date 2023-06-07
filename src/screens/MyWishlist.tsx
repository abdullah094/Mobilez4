import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../constants/Colors';
import axios, {AxiosError} from 'axios';
import {WISHLIST_GET} from '@env';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';
import GridItem from '../components/GridItem';
import ListItem from '../components/ListItem';

const {width, height} = Dimensions.get('window');
const MyWishlist = ({navigation}) => {
  const [Grid, setGrid] = useState(false);
  const [data, setData] = useState([]);
  const accessToken = useSelector(state => state.todo.accessToken);
  const initialLoginState = {
    isloading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isloading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isloading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isloading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isloading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  console.log('accessToken', accessToken);

  useEffect(() => {
    axios
      .get(WISHLIST_GET, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch({type: 'LOGOUT'});
          navigation.navigate('Login');
        }
        console.log(reason.message);
      });
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View
        style={tw`h-16 flex-row items-center justify-between px-2 bg-[#015dcf]`}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back-sharp" color={color.white} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: color.white,
            textAlign: 'center',
            fontWeight: '500',
            flex: 1,
          }}>
          WishList
        </Text>
      </View>
      <View style={tw`flex-row items-center justify-end px-4  h-10`}>
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

export default MyWishlist;

const styles = StyleSheet.create({});
