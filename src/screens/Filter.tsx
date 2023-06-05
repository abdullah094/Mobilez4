import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Menu from 'react-native-vector-icons/Entypo';
import tw from 'twrnc';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import {color} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import Slider from 'rn-range-slider';

import RangeSlider from 'rn-range-slider';
import {useDispatch, useSelector} from 'react-redux';
import Thumb from '../components/Thumb';
import Rail from '../components/Rail';
import RailSelected from '../components/RailSelected';
import Notch from '../components/Notch';
import Label from '../components/Label';
import style from './style';
import {
  reduxSetAccessToken,
  setProfileData,
  reduxRemoveAccessToken,
} from '../Redux/Slices';
import {GET_PROFILE_DATA} from '@env';
import {
  Ram,
  Storage,
  Pta_status,
  Condition,
  Warranty,
  City,
} from '../constants/Data';
import Header from '../components/Header';
import {Appbar, Searchbar} from 'react-native-paper';
import SearchScreen from './SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Filter = ({navigation}) => {
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState();
  const isFocused = useIsFocused();
  const [value, setValue] = useState(0);

  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(name => <Thumb name={name} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);
  const toggleRangeEnabled = useCallback(
    () => setRangeDisabled(!rangeDisabled),
    [rangeDisabled],
  );
  const setMinTo50 = useCallback(() => setMin(50), []);
  const setMinTo0 = useCallback(() => setMin(0), []);
  const setMaxTo100 = useCallback(() => setMax(100), []);
  const setMaxTo500 = useCallback(() => setMax(500), []);
  const toggleFloatingLabel = useCallback(
    () => setFloatingLabel(!floatingLabel),
    [floatingLabel],
  );

  const _accesstoken = useSelector(state => state.todo.accessToken);
  // const name = DeviceInfo.getBrand();
  // setTimeout(() => {
  //   setHeading(`${name}'s ${deviceName}`);
  // }, 5000);
  // DeviceInfo.getDeviceName().then(res => {
  //   setDeviceName(res);
  // });
  let _accessToken;
  _accessToken = useSelector(state => state.todo.accessToken);
  const dispatch = useDispatch();
  const [ramData, setRamData] = useState({
    ram: ' ',
    storage: '',
    pta_status: '',
    condition: '',
    Warranty: '',
    city: '',
  });

  const [form, setForm] = useState({
    search: [
      ramData.ram,
      ramData.storage,
      ramData.pta_status,
      ramData.condition,
      ramData.Warranty,
      ramData.city,
    ],
    max_price: '',
    min_price: '',
  });
  const image_url = 'https://www.mobilezmarket.com/images/';
  const fetchProfileData = async () => {
    await axios
      .get(GET_PROFILE_DATA, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        const _profile = response.data.profile;
        setProfile(_profile);
        dispatch(setProfileData(_profile));
      })
      .catch(error => {
        console.log('ProfileData ' + error);
      });
  };

  useEffect(() => {
    setForm({
      ...form,
      search: [
        ramData.ram,
        ramData.storage,
        ramData.pta_status,
        ramData.condition,
        ramData.Warranty,
        ramData.city,
      ],
    });
  }, [ramData]);
  useEffect(() => {
    console.log('fetch access token HOme useeffect');
    let user_token;
    setTimeout(async () => {
      user_token = null;
      console.log(user_token);
      try {
        user_token = await AsyncStorage.getItem('@user_token');
        setAccessToken(user_token);
        dispatch(reduxSetAccessToken(user_token));
      } catch (e) {
        if (user_token === null) {
          setAccessToken();
          dispatch(reduxRemoveAccessToken());
        }
        console.log(e);
      }
    }, 200);
  }, [isFocused]);

  useEffect(() => {
    if (accessToken) fetchProfileData();
  }, [accessToken]);

  console.log(form);
  console.log('heloooo', accessToken);
  console.log('min ' + min + ' ' + 'max' + max);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <View style={tw`w-full mx-4  bg-[#015DCF]`}>
          <View style={tw` p-4`}>
            <View style={tw`flex-row items-center justify-between  p-2`}>
              <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons
                  name="ios-arrow-back-sharp"
                  color={color.white}
                  size={25}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  flex: 1,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Filters
              </Text>
            </View>

            <View style={tw`flex-row `}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: '400',
                  fontSize: 15,
                  paddingVertical: 16,
                }}>
                Price Range
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 8,
                  width: 100,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white'}}>{low}</Text>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 8,
                  width: 100,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white'}}>{high}</Text>
              </View>
            </View>
            <Slider
              style={{width: '100%'}}
              min={min}
              max={max}
              step={1}
              disableRange={rangeDisabled}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
          </View>
          <View
            style={{
              padding: 16,
              paddingTop: 32,
              borderWidth: 1,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: 'white',
              borderColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <SelectList
                boxStyles={{
                  backgroundColor: color.white,
                  borderColor: '#D3D3D3',
                  marginTop: 16,
                }}
                inputStyles={{color: 'grey'}}
                search={false}
                placeholder="Category"
                setSelected={val => setRamData({...ramData, ram: val})}
                data={Ram}
                save="value"
              />
              <SelectList
                boxStyles={{
                  backgroundColor: color.white,
                  borderColor: '#D3D3D3',
                  marginTop: 16,
                }}
                inputStyles={{color: 'grey'}}
                search={false}
                placeholder="Brands"
                setSelected={val => setRamData({...ramData, storage: val})}
                data={Storage}
                save="value"
              />
            </View>

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="RAM"
              setSelected={val => setRamData({...ramData, ram: val})}
              data={Ram}
              save="value"
            />

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="Storage"
              setSelected={val => setRamData({...ramData, storage: val})}
              data={Storage}
              save="value"
            />

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="PTA Status"
              setSelected={val => setRamData({...ramData, pta_status: val})}
              data={Pta_status}
              save="value"
            />

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="Condition"
              setSelected={val => setRamData({...ramData, condition: val})}
              data={Condition}
              save="value"
            />

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="Warranty"
              setSelected={val => setRamData({...ramData, Warranty: val})}
              data={Warranty}
              save="value"
            />

            <SelectList
              boxStyles={{
                backgroundColor: color.white,
                borderColor: '#D3D3D3',
                marginTop: 16,
              }}
              inputStyles={{color: 'grey'}}
              search={false}
              placeholder="City"
              setSelected={val => setRamData({...ramData, city: val})}
              data={City}
              save="value"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('FindMyDevice', {_form: form})}
              style={{
                backgroundColor: color.orange,
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  min_max_input: {
    borderWidth: 1,
    borderColor: 'white',
    width: 100,
    borderRadius: 10,
    backgroundColor: '#015DCF',
    textAlign: 'center',
    marginTop: 0,
    height: 35,
    padding: 1,
    color: 'white',
  },
  min_max_heading: {
    color: color.white,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: color.white,
    paddingHorizontal: 15,
    marginTop: 5,
    height: 45,
  },
  heading: {color: color.black, fontWeight: '500', fontSize: 17},
});