import {MY_ADS} from '@env';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import ListIcon from 'react-native-vector-icons/Feather';

import {useRoute} from '@react-navigation/native';
import Thumb from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import AdDeleteModaleScreen from '../components/AdDeleteModaleScreen';
import AdEditModaleScreen from '../components/AdEditModaleScreen';
import GridItem from '../components/GridItem';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import {color} from '../constants/Colors';
import WishlistComponent from './WishlistComponent';

const {width, height} = Dimensions.get('window');
const MyAds = ({navigation, isActive}) => {
  const route = useRoute();
  const id = route?.params?.id || 20;
  const from = route.params?.from || 'Post';
  const image_url = 'https://www.mobilezmarket.com/images/';
  const [data, setData] = useState([]);
  const _accessToken = useSelector(selectAccessToken);
  const [activeModal, setActiveModal] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [sellAD, setsellAD] = useState();
  const [Grid, setGrid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAd, setselectedAd] = useState<number | null>(null);
  const [soldDisabled, setSoldDisabled] = useState<boolean>(false);
  const [deleteModale, setDeleteModale] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const myAdd = () => {
    axios
      .get(MY_ADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        if (response.data.my_adds) {
          setData(response.data.my_adds);
          setLoading(false);
        } else {
        }
      })
      .catch(error => {
        console.log('hello', error);
      });
  };

  useEffect(() => {
    myAdd();
    setLoading(true);
  }, [_accessToken, route]);

  const soldFunc = useCallback(() => {
    axios
      .get(`https://www.mobilezmarket.com/api/sell-ad/${selectedAd}`, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        // setsellAD(response.data);
        setData([]);
        myAdd();
        setLoading(true);
      })
      .catch(error => {
        console.log('hello', error);
      });
  }, [selectedAd]);

  //   axios
  //     .post(
  //       `https://www.mobilezmarket.com/api/update-ad/${selectedAd}`,
  //       {
  //         brand: brand,
  //         model: model,
  //         storage: storage,
  //         price: price,
  //         ram: ram,
  //         productType: productType,
  //         description: description,
  //         warrenty: warrenty,
  //         category: category,
  //         ptaStatus: ptaStatus,
  //       },
  //       {
  //         headers: {Authorization: `Bearer ${_accessToken}`},
  //       },
  //     )
  //     .then(response => {
  //       navigation.navigate('PostAnAd', {
  //         params: {from: 'Edit', id: selectedAd},
  //       });
  //       console.log('Updated Ad ');
  //     })
  //     .catch(error => {
  //       console.log('hello', error);
  //     });
  // }, [selectedAd, _accessToken]);

  const onOpenListModal = useCallback(
    (id: number) => {
      setActiveModal(true);
      setselectedAd(id);

      let adStatus: any = data.find((item: any) => item.id === id);

      if (adStatus?.sell_status === 'Sold') {
        setSoldDisabled(true);
      } else {
        setSoldDisabled(false);
      }
    },
    [data],
  );

  const onHideListModal = useCallback(() => {
    setActiveModal(false);
  }, []);

  // const onSoldClick = useCallback(() => {
  //   let findAdd = data.find((item: any) => item.id === selectedAd);

  //   console.log(findAdd);
  // }, [selectedAd]);
  const deleteFunc = useCallback(() => {
    const url = `https://www.mobilezmarket.com/api/delete-my-add/${selectedAd}`;
    axios
      .post(
        url,
        {},
        {
          headers: {Authorization: `Bearer ${_accessToken}`},
        },
      )
      .then(response => {
        // setsellAD(response.data);
        myAdd();
        console.log('Ad deleted ');
        setLoading(true);
      })
      .catch(error => {
        console.log('hello', error);
      });
  }, [selectedAd, _accessToken]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <Header title="My Ads" />
        <View style={tw`flex-row justify-center p-2 `}>
          <Button
            style={[tw`w-30 border border-blue-500 mx-3`]}
            mode={isWishlist ? 'text' : 'contained'}
            textColor={isWishlist ? 'black' : 'white'}
            buttonColor={isWishlist ? 'white' : '#015dcf'}
            onPress={() => setIsWishlist(false)}>
            My Ads
          </Button>

          <Button
            style={tw`w-30 border border-blue-500 mx-3`}
            textColor={isWishlist ? 'white' : 'black'}
            buttonColor={isWishlist ? '#015dcf' : 'white'}
            mode={isWishlist ? 'contained' : 'text'}
            onPress={() => setIsWishlist(true)}>
            Wishlist
          </Button>
        </View>

        {!isWishlist ? (
          <>
            {loading ? (
              <ActivityIndicator
                size={55}
                color={color.orange}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 280,
                }}
              />
            ) : data.length > 0 ? (
              <View style={tw`flex-row items-center justify-end m-6`}>
                <TouchableOpacity
                  style={tw`px-2`}
                  onPress={() => setGrid(false)}>
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
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  height: '90%',
                  alignItems: 'center',
                }}>
                <Thumb name="thumbsdown" color={'black'} size={40} />
                <Text style={{color: 'black', fontWeight: '700'}}>
                  You haven't posted anything
                </Text>
              </View>
            )}

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
                  <GridItem
                    item={item}
                    onPressList={() => onOpenListModal(item.id)}
                  />
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
                  <ListItem
                    onPressList={() => onOpenListModal(item.id)}
                    item={item}
                  />
                )}
              />
            )}
          </>
        ) : (
          <WishlistComponent />
        )}

        <Modal animationType="slide" transparent={true} visible={activeModal}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeText} onPress={onHideListModal}>
              <Text style={{color: 'white'}}>Close</Text>
            </Pressable>

            <View style={styles.modalContent}>
              <TouchableOpacity
                disabled={false}
                style={styles.optionButton}
                onPress={async () => {
                  setModalVisible(true);
                  onHideListModal();
                }}>
                <Text style={styles.optionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                  soldFunc();
                }}>
                <Text
                  style={[
                    styles.optionText,
                    soldDisabled ? styles.optionTextDisabled : {},
                  ]}>
                  {soldDisabled ? 'Item Already Sold' : 'Sold'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={async () => {
                  setDeleteModale(true);
                  onHideListModal();
                }}
                onPressOut={onHideListModal}>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {modalVisible && (
        <AdEditModaleScreen
          id={selectedAd}
          alert={modalVisible}
          setAlert={setModalVisible}
        />
      )}
      {deleteModale && (
        <AdDeleteModaleScreen
          id={selectedAd}
          alert={deleteModale}
          setAlert={setDeleteModale}
          deleteFunc={deleteFunc}
        />
      )}
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  optionTextDisabled: {
    opacity: 0.5,
  },

  closeText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 200,
  },
});
