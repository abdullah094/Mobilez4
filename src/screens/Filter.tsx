import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import tw from 'twrnc';
import {color} from '../constants/Colors';

import {
  CategoryList,
  City,
  Condition,
  Pta_status,
  Ram,
  Storage,
  Warranty,
} from '../constants/Data';

import {BRANDS_NO_AUTH, MODELS} from '@env';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectAccessToken} from '../Redux/Slices';
import Header from '../components/Header';
import PriceRange from '../components/PriceRange';
import {Form, IndexNavigationProps, IndexRouteProps} from '../types';

const Filter = () => {
  const navigation = useNavigation<IndexNavigationProps<'Filter'>>();
  const route = useRoute<IndexRouteProps<'Filter'>>();
  const [otherBrand, setOtherBrand] = useState(false);
  const [brand, setBrand] = useState<Array<{key: string; value: string}>>([]);
  const [models, setModels] = useState<Array<{key: string; value: string}>>([]);
  const [open, setOpen] = useState(false);

  const handleValueChange = useCallback((lowValue, highValue) => {
    setForm({...form, max_price: highValue, min_price: lowValue});
  }, []);
  const _accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    setForm(route.params.form);
  }, [route.params.form]);
  const [form, setForm] = useState<Form>({});
  console.log({form});
  const getBrandFunc = () => {
    //Get brands with this function
    axios
      .get(BRANDS_NO_AUTH, {})
      .then(response => {
        let brand_array: Array<{key: string; value: string}> = [];
        response.data.product_brands.forEach(element => {
          brand_array.push({
            key: element.id,
            value: element.title,
          });
        });
        setBrand(brand_array);
      })
      .catch(error => {
        console.log('Brands ' + error);
      });
  };
  const getModelFunc = () => {
    //Get models with this function
    const api = MODELS + form.brand;
    axios
      .get(api, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        let brand_array: Array<{key: string; value: string}> = [];
        response.data.models.forEach(element => {
          brand_array.push({
            key: element.id,
            value: element.model_name,
          });
        });
        setModels(brand_array);
      })
      .catch(error => {
        console.log('Brands ' + error);
      });
  };
  useEffect(() => {
    getBrandFunc();
    getModelFunc();
  }, [form.brand]);
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 100,
          }}>
          <View style={tw`w-full mx-4  bg-[#015DCF]`}>
            <Header title="Filters" />
            <View style={tw` p-4`}>
              <PriceRange handleValueChange={handleValueChange} />
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
                  setSelected={val => setForm({...form, category: val})}
                  data={CategoryList}
                  save="value"
                  // defaultOption={CategoryList.find(x => x.value == form.category)}
                  dropdownTextStyles={{color: 'black'}}
                />
                <SelectList
                  boxStyles={{
                    backgroundColor: color.white,
                    borderColor: '#D3D3D3',
                    marginTop: 16,
                  }}
                  placeholder="Choose Brands"
                  inputStyles={{
                    color: 'grey',
                  }}
                  setSelected={val => {
                    if (val === 'Other') {
                      setOtherBrand(true);
                      setForm({...form, brand: ''});
                    } else {
                      setOtherBrand(false);
                      setForm({...form, brand: val});
                    }
                  }}
                  data={brand}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              </View>

              {otherBrand ? (
                <TextInput
                  placeholder="Choose Model"
                  style={styles.box_input}
                  value={form.brand ?? ''}
                  onChangeText={text => setForm({...form, model: text})}
                />
              ) : (
                <SelectList
                  boxStyles={{
                    backgroundColor: color.white,
                    borderColor: '#D3D3D3',
                    marginTop: 16,
                  }}
                  placeholder="Choose model"
                  inputStyles={{color: 'black'}}
                  setSelected={val => {
                    setForm({...form, model: val});
                  }}
                  defaultOption={models.find(x => x.value == form.model)}
                  data={models}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              )}
              <SelectList
                boxStyles={{
                  backgroundColor: color.white,
                  borderColor: '#D3D3D3',
                  marginTop: 16,
                }}
                inputStyles={{color: 'grey'}}
                search={false}
                placeholder="RAM"
                setSelected={val => setForm({...form, ram: val})}
                data={Ram}
                save="value"
                dropdownTextStyles={{color: 'black'}}
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
                // defaultOption={Storage.find(x => x.value == form.storage)}
                setSelected={val => setForm({...form, storage: val})}
                data={Storage}
                save="value"
                dropdownTextStyles={{color: 'black'}}
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
                // defaultOption={Pta_status.find(x => x.value == form.pta_status)}
                setSelected={val => setForm({...form, pta_status: val})}
                data={Pta_status}
                save="value"
                dropdownTextStyles={{color: 'black'}}
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
                // defaultOption={Condition.find(x => x.value == form.condition)}
                setSelected={val => setForm({...form, condition: val})}
                data={Condition}
                save="value"
                dropdownTextStyles={{color: 'black'}}
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
                // defaultOption={Warranty.find(x => x.value == form.Warranty)}
                setSelected={val => setForm({...form, Warranty: val})}
                data={Warranty}
                save="value"
                dropdownTextStyles={{color: 'black'}}
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
                // defaultOption={City.find(x => x.value == form.city)}
                setSelected={val => setForm({...form, city: val})}
                data={City}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate({
                    name: 'Listings',
                    params: {form: form},
                    merge: true,
                  })
                }
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
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    width: '100%',
  },

  box_input: {
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 10,
    color: color.black,
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
  },
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
