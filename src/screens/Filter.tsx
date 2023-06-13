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
import tw from 'twrnc';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {color} from '../constants/Colors';
import {SelectList} from 'react-native-dropdown-select-list';
import Slider from 'rn-range-slider';

import Thumb from '../components/Thumb';
import Rail from '../components/Rail';
import RailSelected from '../components/RailSelected';
import Notch from '../components/Notch';
import Label from '../components/Label';
import {
  Ram,
  Storage,
  Pta_status,
  Condition,
  Warranty,
  City,
  CategoryList,
} from '../constants/Data';

import {BRANDSNOAUTH,MODELS} from '@env';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Category, Form } from '../../type';
import { useSelector } from 'react-redux';


const Filter = ({navigation}) => {
  const route =useRoute();
  const isFocused = useIsFocused();
  const [value, setValue] = useState(0);
  const [otherBrand, setOtherBrand] = useState(false);
  const [brand, setBrand] = useState<Array<{key:string,value:string}>>([]);
const [category,setCategory]= useState<string>(route.params?.name===Category.PHONE ?"Mobile"  : route.params?.name=== Category.TABLET ?"Tablet" : "Watch")

  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);
  const [floatingLabel, setFloatingLabel] = useState(false);
  const [models, setModels] = useState([]);

  const renderThumb = useCallback(name => <Thumb name={name} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
    setForm({...form , max_price: highValue , min_price :lowValue})
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
  const _accessToken = useSelector(state => state.todo.accessToken);


  const [form, setForm] = useState<Form>({
    brand: null,
    ram: ' ',
    storage: null,
    pta_status: null,
    condition: null,
    Warranty: null,
    city: null,
   
    max_price: null,
    min_price: null,
  });

  

  const getBrandFunc = () => {
    //Get brands with this function
    axios
      .get(BRANDSNOAUTH, {

      })
      .then(response => {
        let brand_array:Array<{key:string,value:string}> = [];
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
        console.log("bhia ya error ni day raha hay ")
        let brand_array = [];
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
useEffect(()=>{
  getBrandFunc()
  getModelFunc()
},[form.brand])
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
                setSelected={val => setCategory(val)}
                data={CategoryList}
                save="value"
                defaultOption={CategoryList.find(x=>x.value==category)}
                dropdownTextStyles={{color:'black'}}
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
                    // fontFamily: 'Geologica_Auto-Black',
                  }}
                  setSelected={val =>{
                    if(val==="Other"){
                      setOtherBrand(true)
                      setForm({...form, brand: ""})
                    }
                    else{
                      setOtherBrand(false)
                      setForm({...form, brand: val})
                    }
                  }}
                  data={brand}
                  save="value"
                  dropdownTextStyles={{color:'black'}}
                />
            </View>
            
           {otherBrand ? (
              <TextInput
                placeholder="Choose Model"
                style={styles.box_input}
                value={form.brand}
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
                  setForm({...form, model: val})
                }}
                data={models}
                save="value"
                dropdownTextStyles={{color:'black'}}
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
              dropdownTextStyles={{color:'black'}}
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
              setSelected={val => setForm({...form, storage: val})}
              data={Storage}
              save="value"
              dropdownTextStyles={{color:'black'}}
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
              setSelected={val => setForm({...form, pta_status: val})}
              data={Pta_status}
              save="value"
              dropdownTextStyles={{color:'black'}}
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
              setSelected={val => setForm({...form, condition: val})}
              data={Condition}
              save="value"
              dropdownTextStyles={{color:'black'}}
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
              setSelected={val => setForm({...form, Warranty: val})}
              data={Warranty}
              save="value"
              dropdownTextStyles={{color:'black'}}
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
              setSelected={val => setForm({...form, city: val})}
              data={City}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Listings', {
                name: category ==="Mobile"? Category.PHONE : category==="Tablet" ? Category.TABLET : Category.SMARTWATCH,
                form:form
              })}
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
