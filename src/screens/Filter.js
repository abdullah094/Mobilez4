import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
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
import {Ram, Storage, Pta_status, Condition, Warranty} from '../constants/Data';
import Header from '../components/Header';
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
  const image_url = 'https://mobilezmarket.com/images/';
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
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: '#015DCF',
        paddingBottom: 100,
      }}>
      <View
        style={{
          backgroundColor: '#015DCF',
          width: width,
          alignItems: 'center',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            // borderWidth: 1,
            width: width - 50,
          }}>
          {/* <View style={{width: 90}}>
            <Menu name="menu" size={30} color={'white'} />
          </View> */}

          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Filters
            </Text>
          </View>

          {/* <Image
          style={tw`h-12 w-12 rounded-full`}
          source={{uri: image_url + profile.photo}}
        /> */}

          {/* <View>
            {accessToken ? (
              <TouchableOpacity
                disabled
                onPress={() => navigation.navigate('Profile')}>
                {profile && (
                  <Image
                    style={tw`h-12 w-12 rounded-full`}
                    source={{uri: image_url + profile.photo}}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: color.white, fontSize: 15}}>
                  {'Login/Register'}
                </Text>
              </TouchableOpacity>
            )}
          </View> */}
        </View>
        <View style={tw`relative rounded-md`}>
          <TextInput
            onFocus={() => navigation.navigate('SearchScreen')}
            placeholder="Search"
            placeholderTextColor={'white'}
            style={{
              width: width - 50,
              height: 43,
              borderRadius: 4,
              backgroundColor: '#4894F1',
              paddingLeft: 32,
              paddingHorizontal: 8,
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}></TextInput>
          <Icon
            style={tw`absolute top-9 left-2`}
            name="magnifying-glass"
            size={20}
            color={'white'}
          />
        </View>
        <View style={{width: 372}}>
          <Text
            style={{
              color: color.white,
              fontWeight: '400',
              fontSize: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}>
            Price Range
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={styles.min_max_box}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 8,
                  width: width - 310,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white'}}>{low}</Text>
              </View>
            </View>
            <View style={styles.min_max_box}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 8,
                  width: width - 310,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white'}}>{high}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 250,
          paddingBottom: 20,
        }}>
        <Slider
          style={{width: '140%'}}
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
          width: 412,
          padding: '5%',
          borderWidth: 1,
          borderRadius: 40,
          backgroundColor: 'white',
          height: '100%',
          borderColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <View style={{marginTop: 5}}>
              <SelectList
                boxStyles={{
                  backgroundColor: color.white,
                  borderColor: '#D3D3D3',
                }}
                search={false}
                placeholder="Category"
                setSelected={val => setRamData({...ramData, ram: val})}
                data={Ram}
                save="value"
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{marginTop: 5}}>
              <SelectList
                boxStyles={{
                  backgroundColor: color.white,
                  borderColor: '#D3D3D3',
                }}
                search={false}
                placeholder="Brands"
                setSelected={val => setRamData({...ramData, storage: val})}
                data={Storage}
                save="value"
              />
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View style={{marginTop: 5}}>
            <TextInput
              value={ramData.city}
              placeholder="RAM"
              onChangeText={text => setRamData({...ramData, ram: text})}
              style={[styles.input]}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <View style={{marginTop: 5}}>
            <TextInput
              value={ramData.city}
              placeholder="Storage"
              onChangeText={text => setRamData({...ramData, storage: text})}
              style={[styles.input]}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <View style={{marginTop: 5}}>
            <TextInput
              value={ramData.city}
              placeholder="PTA Status"
              onChangeText={text => setRamData({...ramData, pta_status: text})}
              style={[styles.input]}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <TextInput
            value={ramData.city}
            placeholder="Product Condition"
            onChangeText={text => setRamData({...ramData, condition: text})}
            style={[styles.input]}
          />
        </View>
        <View style={{marginTop: 10}}>
          <TextInput
            value={ramData.city}
            placeholder="Warranty"
            onChangeText={text => setRamData({...ramData, Warranty: text})}
            style={[styles.input]}
          />
        </View>
        <View style={{marginTop: 10}}>
          <TextInput
            value={ramData.city}
            placeholder="Location"
            onChangeText={text => setRamData({...ramData, Warranty: text})}
            style={[styles.input]}
          />
        </View>
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
          <Text style={{color: color.white, fontWeight: 'bold', fontSize: 20}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  min_max_box: {},
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
