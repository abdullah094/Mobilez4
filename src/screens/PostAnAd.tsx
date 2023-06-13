import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Button,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../constants/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {POSTANAD, BRANDS, MODELS} from '@env';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../components/Header';
const {width, height} = Dimensions.get('window');
import FormData from 'form-data';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import {selectAccessToken} from '../Redux/Slices';
import {useNavigation} from '@react-navigation/native';

// require the module
var RNFS = require('react-native-fs');

const PostAnAd = () => {
  const navigation = useNavigation();
  const [brands, setBrands] = useState([]);
  const [otherBrand, setOtherBrand] = useState(false);
  const [condition, setCondition] = useState(false);
  const [models, setModels] = useState([]);
  const [approved, setApproved] = useState([
    {key: 1, value: 'Approved'},
    {key: 2, value: 'Non Approved'},
  ]);

  const [toggleAccesories, setToggleAccesories] = useState({
    box: false,
    charger: false,
    data_cable: false,
    handfree: false,
    kit_only: false,
  });
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState<string>();
  const [model, setModel] = useState();
  const [button, setButton] = useState('Save Product');
  const [uploadbtn, setuploadbtn] = useState('Upload Image');
  const [form, setForm] = useState({
    brand: '',
    model: '',
    price: '',
    storage: '',
    ram: '',
    product_type: '',
    pta_status: '',
    image: [],
    description: '',
    warranty: '',
    category: '',
    accessories: ['box'],
  });
  const Ram = [
    {key: 1, value: '1 GB'},
    {key: 2, value: '2 GB'},
    {key: 3, value: '4 GB'},
    {key: 4, value: '6 GB'},
    {key: 5, value: '8 GB'},
    {key: 6, value: '12 GB'},
    {key: 7, value: '16 GB'},
  ];
  const Storage = [
    {key: 1, value: '4 GB'},
    {key: 2, value: '8 GB'},
    {key: 3, value: '16 GB'},
    {key: 4, value: '32 GB'},
    {key: 5, value: '64 GB'},
    {key: 6, value: '32 GB'},
    {key: 7, value: '64 GB'},
    {key: 8, value: '128 GB'},
    {key: 9, value: '256 GB'},
    {key: 10, value: '512 GB'},
    {key: 11, value: '1 TB'},
  ];
  const Warranty = [
    {key: 1, value: 'No Warrenty'},
    {key: 2, value: '1 month'},
    {key: 3, value: '2 months'},
    {key: 4, value: '3 months'},
    {key: 5, value: '4 months'},
    {key: 6, value: '5 months'},
    {key: 7, value: '6 months'},
    {key: 8, value: '7 months'},
    {key: 9, value: '8 months'},
    {key: 10, value: '9 months'},
    {key: 11, value: '10 months'},
    {key: 12, value: '11 months'},
    {key: 13, value: '12 months'},
  ];
  const Condition = [
    {key: 1, value: 'New'},
    {key: 2, value: 'Used'},
    {key: 3, value: 'Refurbished'},
  ];
  const Category = [
    {key: 1, value: 'Mobile'},
    {key: 1, value: 'Tablet'},
    {key: 1, value: 'Watch'},
  ];

  if (form.brand === 'Other') {
    setTimeout(() => {
      setOtherBrand(true);
    }, 300);
  } else {
    setTimeout(() => {
      setOtherBrand(false);
    }, 300);
  }

  // condition logic
  if (form.product_type === 'Used' || form.product_type === 'Refurbished') {
    setTimeout(() => {
      setCondition(true);
    }, 300);
  } else {
    setTimeout(() => {
      setCondition(false);
    }, 300);
  }
  const _accessToken = useSelector(state => state.todo.accessToken);

  const getBrandFunc = () => {
    //Get brands with this function
    axios
      .get(BRANDS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        let brand_array = [];
        response.data.brands.forEach(element => {
          brand_array.push({
            key: element.id,
            value: element.title,
          });
        });
        setBrands(brand_array);
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
  const options = {
    mediaType: 'photo',
    quality: 0.5,
    selectionLimit: 10,
  };
  let body = new FormData();

  const ImageUpload = async () => {
    setuploadbtn(<ActivityIndicator size={15} color={color.white} />);
    //Image upload Function
    let images = [];
    const result = await launchImageLibrary(options);

    result.assets.forEach(element => {
      // images.push(element.base64);
      console.log('element', element);
      images.push(element);
    });
    setForm({...form, image: images});
    setuploadbtn('Upload Image');
  };
  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'red', // Change the color value to your desired text color
    }),
  };

  useEffect(() => {
    getBrandFunc();
  }, []);
  useEffect(() => {
    getModelFunc();
  }, [form.brand]);

  const PostAdFunc = async () => {
    setButton(<ActivityIndicator size={15} color={color.white} />);
    const data = new FormData();

    let images = [];
    form.image.forEach(image => {
      images.push({
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
    });

    console.log('image', images);
    images.forEach((image, index) => {
      data.append('image[]', image, `image${index + 1}.png`);
    });
    data.append('brand', form.brand);
    data.append('model', form.model);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('warranty', form.warranty);
    data.append('category', form.category);
    data.append('product_type', form.product_type);
    data.append('pta_status', form.pta_status);
    data.append('ram', form.ram);
    data.append('storage', form.storage);
    // Create headers manually
    let headers = {
      Authorization: `Bearer ${_accessToken}`,
      'Content-Type': 'multipart/form-data',
    };

    // Make the request
    // Make the request
    _accessToken
      ? axios
          .post(POSTANAD, data, {headers})
          .then(response => {
            if (response.data.status === 200) {
              setForm({
                ...form,
                brand: '',
                model: '',
                price: '',
                storage: '',
                ram: '',
                product_type: '',
                pta_status: '',
                image: [],
                description: '',
                warranty: '',
                category: '',
                accessories: ['box'],
              });
              navigation.navigate('TabNavigation', {screen: 'Home'});
              Alert.alert(response.data.message);
              setButton('Save Product');
            } else {
              setButton('Save Product');
              Alert.alert('Error', 'missing some fields');
            }
          })
          .catch(error => {
            setButton('Save Product');
            console.log('error');
          })
      : Alert.alert('Please Login First');
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 200,
          // backgroundColor: '#015DCF',
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={tw`h-16 flex-row items-center justify-between px-2 bg-[#015dcf]`}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={color.white}
              size={25}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: color.white,
              textAlign: 'center',
              fontWeight: '500',
              flex: 1,
            }}>
            Post An Ad
          </Text>
        </View>
        <View style={tw` w-full items-start justify-center px-4`}>
          <View style={tw`w-full`}>
            <View style={tw`flex-row pt-2 items-center justify-between`}>
              <View style={tw`w-1/2  pr-2`}>
                <SelectList
                  boxStyles={styles.box}
                  placeholder="Category"
                  inputStyles={{color: 'grey'}}
                  setSelected={val => setForm({...form, category: val})}
                  data={Category}
                  save="value"
                  dropdownTextStyles={{color:'black'}}
                />
              </View>
              <View style={tw`w-1/2 pl-2`}>
                <SelectList
                  boxStyles={styles.box}
                  placeholder="Choose Brands"
                  inputStyles={{
                    color: 'grey',
                    // fontFamily: 'Geologica_Auto-Black',
                  }}
                  setSelected={val => setForm({...form, brand: val})}
                  data={brands}
                  save="value"
                  dropdownTextStyles={{color:'black'}}
                />
              </View>
            </View>
            {otherBrand && (
              <TextInput
                placeholder="Choose brand"
                style={styles.box_input}
                value={brand}
                onChangeText={text => setBrand(text)}
              />
            )}
            {otherBrand ? (
              <TextInput
                placeholder="Choose Model"
                style={styles.box_input}
                value={form.model}
                onChangeText={text => setForm({...form, model: text})}
              />
            ) : (
              <SelectList
                boxStyles={styles.box}
                placeholder="Choose model"
                inputStyles={{color: 'black'}}
                setSelected={val => setForm({...form, model: val})}
                data={models}
                save="value"
                dropdownTextStyles={{color:'black'}}
              />
            )}
            <TextInput
              style={styles.box_input}
              keyboardType="number-pad"
              placeholder="Enter Price"
              value={form.price}
              onChangeText={text => setForm({...form, price: text})}
            />

            <SelectList
              boxStyles={styles.box}
              // inputStyles={styles.box}
              placeholder="Choose Ram"
              inputStyles={{color: 'black'}}
              setSelected={val =>
                setForm({...form, ram: val.replace(' GB', '')})
              }
              data={Ram}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />

            <SelectList
              boxStyles={styles.box}
              placeholder="PTA Status"
              inputStyles={{color: 'black'}}
              setSelected={val => setForm({...form, pta_status: val})}
              data={approved}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />
            <SelectList
              boxStyles={styles.box}
              placeholder="Choose Storage"
              inputStyles={{color: 'black'}}
              setSelected={val =>
                setForm({...form, storage: val.replace(' GB', '')})
              }
              data={Storage}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />
            <SelectList
              boxStyles={styles.box}
              placeholder="Product Condition"
              inputStyles={{color: 'black'}}
              setSelected={val => setForm({...form, product_type: val})}
              data={Condition}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />

            {condition ? (
              <View style={{padding: 5, paddingVertical: 15}}>
                <Text
                  style={{
                    color: color.black,
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  Accessories
                </Text>

                <View style={styles.check_box_box}>
                  <CheckBox
                    disabled={false}
                    value={toggleAccesories.box}
                    onValueChange={newValue =>
                      setToggleAccesories({
                        ...toggleAccesories,
                        box: newValue,
                      })
                    }
                  />
                  <Text style={styles.check_box_text}>Box</Text>
                </View>

                <View style={styles.check_box_box}>
                  <CheckBox
                    disabled={false}
                    value={toggleAccesories.charger}
                    onValueChange={newValue =>
                      setToggleAccesories({
                        ...toggleAccesories,
                        charger: newValue,
                      })
                    }
                  />
                  <Text style={styles.check_box_text}>Charger</Text>
                </View>

                <View style={styles.check_box_box}>
                  <CheckBox
                    disabled={false}
                    value={toggleAccesories.data_cable}
                    onValueChange={newValue =>
                      setToggleAccesories({
                        ...toggleAccesories,
                        data_cable: newValue,
                      })
                    }
                  />
                  <Text style={styles.check_box_text}>Data Cable</Text>
                </View>

                <View style={styles.check_box_box}>
                  <CheckBox
                    disabled={false}
                    value={toggleAccesories.handfree}
                    onValueChange={newValue =>
                      setToggleAccesories({
                        ...toggleAccesories,
                        handfree: newValue,
                      })
                    }
                  />
                  <Text style={styles.check_box_text}>Hand Free</Text>
                </View>

                <View style={styles.check_box_box}>
                  <CheckBox
                    disabled={false}
                    value={toggleAccesories.kit_only}
                    onValueChange={newValue =>
                      setToggleAccesories({
                        ...toggleAccesories,
                        kit_only: newValue,
                      })
                    }
                  />
                  <Text style={styles.check_box_text}>Kit-only</Text>
                </View>
              </View>
            ) : null}
            <SelectList
              boxStyles={styles.box}
              placeholder="Warrenty"
              inputStyles={{color: 'black'}}
              setSelected={val => setForm({...form, warranty: val})}
              data={Warranty}
              save="value"
              dropdownTextStyles={{color:'black'}}
            />
          </View>
          <Text style={{color: 'black', fontWeight: '700', paddingTop: 20}}>
            Product Image
          </Text>
          <FlatList
            horizontal
            data={form?.image}
            contentContainerStyle={{paddingVertical: 10, zIndex: 999}}
            renderItem={({item}) => (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 15,
                  zIndex: 999,
                  marginVertical: 5,
                }}
                source={{uri: item.uri}}
              />
            )}
          />
          <Text style={{marginVertical: 5, color: 'black', fontWeight: '700'}}>
            Upload upto 20 images
          </Text>
          {/* <Button title="Upload image" onPress={ImageUpload} /> */}
          <TouchableOpacity
            onPress={ImageUpload}
            style={{
              backgroundColor: color.orange,
              width: width - 50,
              height: 50,
              borderRadius: 20,
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 12,
            }}>
            <Text
              style={{
                color: color.white,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {uploadbtn}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '600',
              color: 'black',
              fontSize: 15,
              marginVertical: 16,
            }}>
            Description
          </Text>

          <TextInput
            style={styles.description}
            multiline={true}
            value={form.description}
            onChangeText={text => setForm({...form, description: text})}
            numberOfLines={5}
          />
          <TouchableOpacity
            onPress={() => PostAdFunc()}
            style={{
              backgroundColor: color.orange,
              width: width - 50,
              height: 50,
              borderRadius: 20,
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: color.white, fontWeight: 'bold', fontSize: 15}}>
              {button}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostAnAd;

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
  check_box_box: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  check_box_text: {color: color.black, paddingLeft: 5},
  selectList: {
    color: 'black',
  },
  description: {
    height: 230,
    borderColor: color.black,
    borderRadius: 10,
    color: color.black,
    width: '100%',
    borderWidth: 1,
    alignContent:'flex-start',
    textAlignVertical:'top'

  },
});
