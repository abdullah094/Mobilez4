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
import React, {useState, useEffect} from 'react';
import Menu from 'react-native-vector-icons/Entypo';
import tw from 'twrnc';

import {color} from '../constants/Colors';
import {SelectList} from 'react-native-dropdown-select-list';
import {Ram, Storage, Pta_status, Condition, Warranty} from '../constants/Data';
import Header from '../components/Header';
const {width, height} = Dimensions.get('window');
const Filter = ({navigation}) => {
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState();

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

  console.log(form);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 100,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Menu name="menu" size={30} color={'black'} />
        <Text>Filter</Text>
        {/* <Image
          style={tw`h-12 w-12 rounded-full`}
          source={{uri: image_url + profile.photo}}
        /> */}
      </View>
      <View style={{width: 270}}>
        <Text style={styles.heading}>Price Range</Text>
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
            <Text style={styles.min_max_heading}>Min</Text>
            <TextInput
              value={form.min_price}
              onChangeText={text => setForm({...form, min_price: text})}
              keyboardType="number-pad"
              style={styles.min_max_input}
              placeholder="0"
            />
          </View>
          <View style={styles.min_max_box}>
            <Text style={styles.min_max_heading}>Max</Text>
            <TextInput
              value={form.max_price}
              onChangeText={text => setForm({...form, max_price: text})}
              keyboardType="number-pad"
              style={styles.min_max_input}
              placeholder="10000"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>Ram</Text>
          <View style={{marginTop: 5}}>
            <SelectList
              boxStyles={{backgroundColor: color.white}}
              search={false}
              placeholder="Choose Ram"
              setSelected={val => setRamData({...ramData, ram: val})}
              data={Ram}
              save="value"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>Storage</Text>
          <View style={{marginTop: 5}}>
            <SelectList
              boxStyles={{backgroundColor: color.white}}
              search={false}
              placeholder="Choose Storage"
              setSelected={val => setRamData({...ramData, storage: val})}
              data={Storage}
              save="value"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>PTA status</Text>
          <View style={{marginTop: 5}}>
            <SelectList
              boxStyles={{backgroundColor: color.white}}
              search={false}
              placeholder="Approved/Non-Approved"
              setSelected={val => setRamData({...ramData, pta_status: val})}
              data={Pta_status}
              save="value"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>Product condition</Text>
          <View style={{marginTop: 5}}>
            <SelectList
              boxStyles={{backgroundColor: color.white}}
              search={false}
              placeholder="Product condition"
              setSelected={val => setRamData({...ramData, condition: val})}
              data={Condition}
              save="value"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>Warranty</Text>
          <View style={{marginTop: 5}}>
            <SelectList
              boxStyles={{backgroundColor: color.white}}
              search={false}
              placeholder="Choose Warrnaty"
              setSelected={val => setRamData({...ramData, Warranty: val})}
              data={Warranty}
              save="value"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.heading}>City</Text>
          <TextInput
            value={ramData.city}
            onChangeText={text => setRamData({...ramData, city: text})}
            style={[styles.input]}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindMyDevice', {_form: form})}
          style={{
            backgroundColor: color.orange,
            marginTop: 15,
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
    borderColor: 'gray',
    width: 100,
    borderRadius: 10,
    backgroundColor: color.white,
    textAlign: 'center',
    marginTop: 2,
    height: 40,
  },
  min_max_heading: {
    color: color.black,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: color.white,
    paddingHorizontal: 15,
    marginTop: 5,
    height: 40,
  },
  heading: {color: color.black, fontWeight: '500', fontSize: 17},
});
