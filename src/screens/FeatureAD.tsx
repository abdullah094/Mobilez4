import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Check from 'react-native-vector-icons/Entypo';
import PostIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import Header from '../components/Header';
import {IPackage} from '../types';

const {width, height} = Dimensions.get('window');

const FeatureAD = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);

  const _accessToken = useSelector(selectAccessToken);

  const [packeges, setPackeges] = useState<IPackage[]>();
  const handleBuyPress = () => {
    // Show the modal
    setModalVisible(true);
  };

  const handleModalClose = () => {
    // Hide the modal
    setModalVisible(false);
  };
  const handleCardPress = index => {
    setSelectedCardIndex(index);
  };
  const handleProceedToBuy = () => {
    setModalVisible(false);
  };

  const getPackegeData = () => {
    axios
      .get('https://www.mobilezmarket.com/api/subscription-packages', {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })

      .then(response => {
        setPackeges(response.data.packages);
        setLoadingMore(false);
      })
      .catch(error => {
        console.log('packeges ' + error);
      });
  };

  useEffect(() => {
    getPackegeData();
  }, [_accessToken]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1 `}>
        <ScrollView>
          <Header title="Feature Ad" />
          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                margin: 25,
              }}>
              <View
                style={{
                  backgroundColor: '#F3F3CE',
                  paddingHorizontal: 55,
                  paddingVertical: 30,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
                    Heavy Discounts Available
                  </Text>
                </View>

                <View>
                  <Image
                    source={require('../assets/tag.png')}
                    style={{height: 40, width: 40, tintColor: '#E8960F'}}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <PostIcon name="post-outline" size={30} color={'black'} />
                </View>
                <View style={{marginHorizontal: 20, alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: '700'}}>
                    Post More Ads and get Featured
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 35,
                  paddingVertical: 5,
                }}>
                <Check name="check" size={20} color={'red'} />
                <Text style={{color: 'black'}}>
                  Post More Ads and featured in searches belonging to the
                  category of your
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 35,
                }}>
                <Check name="check" size={20} color={'red'} />
                <Text style={{color: 'black'}}>
                  Post More Ads and featured in searches belonging to the
                  category of your
                </Text>
              </View>
            </View>

            <View style={{paddingTop: 50}}>
              <Text style={{color: 'black'}}>
                Post Ads valid for 30 Days and get Featured for 7 days.
              </Text>
            </View>
            {loadingMore ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={'large'} color={'#306CCE'} />
              </View>
            ) : (
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  flex: 1,
                  gap: 20,

                  justifyContent: 'space-between',
                }}>
                {packeges?.slice(0, 7).map((packege, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCardPress(index)}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        selectedCardIndex === index ? '#015dcf' : 'gray',

                      borderRadius: 10,
                      minHeight: 180,
                      margin: 10,
                      width: '28%',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '600',
                          textAlign: 'center',
                        }}>
                        {packege.package_name}
                      </Text>
                      <Text style={{color: '#015dcf', fontWeight: '600'}}>
                        {packege.package_price}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          textAlign: 'center',
                          fontWeight: '600',
                          padding: 2,
                        }}>
                        packege Validity {packege.package_availablity} Days
                      </Text>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          width: 60,
                          alignItems: 'center',
                          borderRadius: 10,
                          padding: 5,
                          backgroundColor: '#015dcf',
                          borderColor: '#015dcf',
                        }}
                        onPress={handleBuyPress}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'white',
                            fontWeight: '600',
                          }}>
                          Buy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Modal
              visible={modalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={handleModalClose}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Do you want to proceed to buy?
                </Text>
                <TouchableOpacity
                  style={styles.proceedButton}
                  onPress={handleProceedToBuy}>
                  <Text style={styles.proceedButtonText}>Proceed to Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModalClose}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FeatureAD;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
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
