import {WISHLIST_GET} from '@env';
import axios, {AxiosError} from 'axios';
import Lottie from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';
import Thumb from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, setWishList} from '../Redux/Slices';
import GridItem from '../components/GridItem';
import ListItem from '../components/ListItem';
import {color} from '../constants/Colors';

const WishlistComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [Grid, setGrid] = useState(false);

  useEffect(() => {
    axios
      .get(WISHLIST_GET, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        dispatch(setWishList(response.data.data.map(x => x.id)));
        setData(response.data.data.sort(x => x.created_at));
        setLoading(false);
      })
      .catch((reason: AxiosError) => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={tw`flex-1`}>
      {loading ? (
        <Lottie
          source={require('../assets/animations/animationSkeleton.json')}
          autoPlay
          loop
          style={{
            width: '95%',
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: color.white,
          }}
          resizeMode="cover"
          speed={0.7}
        />
      ) : // <ActivityIndicator
      //   size={55}
      //   color={color.orange}
      //   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      // />
      data.length <= 0 ? (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Thumb name="thumbsdown" color={'black'} size={40} />
          <Text style={{color: 'black', fontWeight: '700'}}>
            You have nothing in wishlist
          </Text>
        </View>
      ) : (
        <>
          <View
            style={[
              tw`flex-row items-center m-3`,
              {paddingHorizontal: 10, justifyContent: 'space-between'},
            ]}>
            <View>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 18}}>
                Showing Results ({data?.length})
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={tw`px-2`} onPress={() => setGrid(false)}>
                <ListIcon
                  name="list"
                  color={Grid ? color.black : color.blue}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGrid(true)}>
                <Entypo
                  name="grid"
                  color={Grid ? color.blue : color.black}
                  size={30}
                />
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
              showsVerticalScrollIndicator={false}
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
                justifyContent: 'space-between',
                marginHorizontal: 15,
                paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              renderItem={({item}) => (
                <ListItem hideIcon={true} item={item}></ListItem>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default WishlistComponent;
