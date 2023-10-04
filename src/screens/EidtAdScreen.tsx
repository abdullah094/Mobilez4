import {BRANDS, DESCRIPTION, MODELS} from '@env';

import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import React, {ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import {color} from '../constants/Colors';
import {
  CategoryData,
  ConditionData,
  RamData,
  StorageData,
  WarrantyData,
} from '../data';
import {
  BrandAPI,
  Form,
  IDropDown,
  IndexNavigationProps,
  ModelAPI,
  Profile,
} from '../types';

const {width, height} = Dimensions.get('window');

const EditScreen = () => {
  const route = useRoute();
  const id = route?.params?.id || 20;
  const from = route.params?.from || 'Post';

  const profileData = useSelector(selectProfileData) as Profile;
  const [IsVerifiedStorage, setIsVerifiedStorage] = useState(false);
  const [submitText, setSubmitText] = useState('Submit');

  const navigation = useNavigation<IndexNavigationProps<'PostAnAd'>>();
  const [brands, setBrands] = useState<IDropDown[] | null>([]);
  const [models, setModels] = useState<IDropDown[]>([]);
  const [viewType, setViewType] = useState<string>('');
  const [condition, setCondition] = useState(false);
  const _accessToken = useSelector(selectAccessToken);
  const [otherModels, setOtherModels] = useState(false);
  const [approved, setApproved] = useState([
    {key: 1, value: 'Approved'},
    {key: 2, value: 'Not Approved'},
  ]);

  const [toggleAccessories, setToggleAccessories] = useState({
    box: false,
    charger: false,
    data_cable: false,
    handfree: false,
    kit_only: false,
  });
  const [brand, setBrand] = useState<string>();
  const [button, setButton] = useState<ReactNode | String>('Update Product');
  const [uploadButton, setUploadButton] = useState<ReactNode | String>(
    'Upload Image',
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtp, setOTP] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOtherModel, setIsOtherModel] = useState(true);
  const [isOtherBrand, setIsOtherBrand] = useState(true);
  const [isMobile, setisMobile] = useState<boolean>(true);
  const [isTablet, setisTablet] = useState<boolean>(true);

  const [desc, setDesc] = useState();
  // const [brand, setBrand] = useState<string>();

  useEffect(() => {
    // console.log(profileData.account_status);
    if (profileData.account_status == '1') {
      setIsVerifiedStorage(true);
    } else {
      setIsVerifiedStorage(false);
    }
  }, [profileData]);
  const [form, setForm] = useState<Form | null>(null);

  console.log('form===>>>', form);
  // condition logic
  if (form?.product_type === 'Used' || form?.product_type === 'Refurbished') {
    setTimeout(() => {
      setCondition(true);
    }, 300);
  } else {
    setTimeout(() => {
      setCondition(false);
    }, 300);
  }

  useEffect(() => {
    if (form?.category) {
      getBrandFunc();
    }
  }, [form]);

  const getBrandFunc = () => {
    axios
      .get(BRANDS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const data: BrandAPI = response.data;
        let brands = data.brands
          .filter(x => x.category == form?.category)
          .map(y => {
            return {key: y.id, value: y.title};
          });

        setBrands(brands);
      })
      .catch(error => {
        console.log('Brands ' + error);
      });
  };
  const getModelFunc = () => {
    const api = MODELS + form?.brand;
    axios
      .get(api, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const data: ModelAPI = response.data;
        const models = data.models.map(y => {
          return {key: y.id, value: y.model_name};
        });
        setModels(models);
      })
      .catch(error => {
        console.log('Brands ' + error);
      });
  };

  const ImageUpload = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 10,
    };
    setUploadButton(<ActivityIndicator size={15} color={color.white} />);
    //Image upload Function
    let images: Asset[] = [];
    const result = await launchImageLibrary(options);

    result.assets?.forEach(element => {
      images.push(element);
    });
    setForm({...form, image: images});
    setUploadButton('Upload Image');
  };
  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'red', // Change the color value to your desired text color
    }),
  };

  useEffect(() => {
    getModelFunc();
  }, [form?.brand]);

  useEffect(() => {
    form?.model?.includes('Other')
      ? setOtherModels(true)
      : setOtherModels(false);
  }, [form?.model]);

  const fetchData = () => {
    const api = DESCRIPTION + id;
    // console.log(api)
    axios
      .get(api)
      .then(response => {
        let {
          brand,
          img,
          category,
          model,
          price,
          storage,
          ram,
          description,
          product_type,
          productimages,
          pta_status,
          warranty,
          accessories,
        } = response.data.details;

        setForm({
          brand,
          category,
          productimages,
          model,
          price,
          storage,
          ram,
          description,
          product_type,
          pta_status,
          warranty,
          accessories,
        });
        setLoading(false);
      })
      .catch((reason: AxiosError) => {
        console.log(reason?.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateMyAd = () => {
    // console.log({form});
    axios
      .post(`https://www.mobilezmarket.com/api/update-ad/${id}`, form, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })

      .then(response => {
        const data = response.data;
        console.log('=============>', response.data);
        if (data.status === 400) {
          let error = '';
          for (const [key, value] of Object.entries(data.errors)) {
            error += `${key}: ${value} \n`;
          }
          Alert.alert('Response Returned with Errors', error);
        } else if (data.status === 200) {
          Alert.alert('Product Updated');
        }
      })
      .catch(error => {
        // navigation.navigate('Home');
        console.log('weee', error);
      });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      {!loading && (
        <View style={tw`bg-[#edf2f2] flex-1`}>
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
                Edit Your Ad
              </Text>
            </View>
            <View style={tw` w-full items-start justify-center px-4`}>
              <View style={tw`w-full`}>
                <View style={tw`flex-row pt-2 items-center justify-between`}>
                  <View style={tw`w-1/2  pr-2`}>
                    <SelectList
                      boxStyles={styles.box}
                      // placeholder={desc?.details?.category}

                      inputStyles={{color: 'grey'}}
                      setSelected={val => {
                        setForm({...form, category: val});
                      }}
                      data={CategoryData}
                      defaultOption={{key: form.category, value: form.category}}
                      save="value"
                      dropdownTextStyles={{color: 'black'}}
                    />
                  </View>
                  <View style={tw`w-1/2 pl-2`}>
                    <SelectList
                      boxStyles={styles.box}
                      defaultOption={{key: form.brand, value: form.brand}}
                      inputStyles={{
                        color: 'grey',
                        // fontFamily: 'Geologica_Auto-Black',
                      }}
                      setSelected={val => {
                        setForm({...form, brand: val});
                        setisTablet(false);
                      }}
                      data={brands || []}
                      save="value"
                      dropdownTextStyles={{color: 'black'}}
                    />
                  </View>
                </View>
                {/* {isOtherBrand && (
                

              )} */}
                {form.category === 'Mobile' && form.brand?.includes('Other') ? (
                  <>
                    <TextInput
                      placeholderTextColor={'gray'}
                      style={styles.box_input}
                      value={form.brand}
                      onChangeText={text => setBrand(text)}
                    />
                    <TextInput
                      placeholderTextColor={'gray'}
                      value={form?.model}
                      style={styles.box_input}
                      onChangeText={text => {
                        {
                          setForm({...form, model: text});
                        }
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}

                {form.category === 'Tablet' || form.category === 'Watch' ? (
                  <>
                    <TextInput
                      value={form?.model}
                      placeholderTextColor={'gray'}
                      style={styles.box_input}
                      onChangeText={text => {
                        {
                          setForm({...form, model: text});
                        }
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}

                {form.category === 'Mobile' &&
                !form.brand?.includes('Other') ? (
                  <>
                    <TextInput
                      value={form?.model}
                      placeholderTextColor={'gray'}
                      style={styles.box_input}
                      onChangeText={text => {
                        {
                          setForm({...form, model: text});
                        }
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                {form.category === 'Mobile' &&
                !form.brand?.includes('Other') &&
                form.model === 'Other' ? (
                  <TextInput
                    placeholderTextColor={'grey'}
                    style={styles.box_input}
                    value={form.otherModel}
                    onChangeText={text => {
                      {
                        setForm({...form, otherModel: text});
                      }
                    }}
                  />
                ) : null}
                {/* {otherModels &&
                form.category === 'Mobile' &&
                form.model == 'Other' && (
                
                )} */}

                <TextInput
                  style={styles.box_input}
                  keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  value={form?.price?.toString()}
                  onChangeText={text => setForm({...form, price: text})}
                />
                {form.category === 'Watch' || (
                  <SelectList
                    boxStyles={styles.box}
                    // inputStyles={styles.box}
                    defaultOption={{
                      key: form.ram?.toString(),
                      value: form.ram?.toString(),
                    }}
                    inputStyles={{color: 'black'}}
                    setSelected={val =>
                      setForm({...form, ram: val.replace(' GB', '')})
                    }
                    data={RamData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                )}
                {form.category === 'Watch' || (
                  <SelectList
                    boxStyles={styles.box}
                    defaultOption={{
                      key: form?.pta_status,
                      value: form?.pta_status,
                    }}
                    inputStyles={{color: 'black'}}
                    setSelected={val => setForm({...form, pta_status: val})}
                    data={approved}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                )}
                {form.category === 'Watch' || (
                  <SelectList
                    boxStyles={styles.box}
                    defaultOption={{
                      key: form?.storage?.toString(),
                      value: form?.storage?.toString(),
                    }}
                    inputStyles={{color: 'black'}}
                    setSelected={val =>
                      setForm({...form, storage: val.replace(' GB', '')})
                    }
                    data={StorageData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                )}
                <SelectList
                  boxStyles={styles.box}
                  defaultOption={{
                    key: form?.product_type,
                    value: form?.product_type,
                  }}
                  inputStyles={{color: 'black'}}
                  setSelected={val => setForm({...form, product_type: val})}
                  data={ConditionData}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
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
                        value={toggleAccessories.box}
                        tintColors={{true: color.black, false: color.black}}
                        onValueChange={newValue =>
                          setToggleAccessories({
                            ...toggleAccessories,
                            box: newValue,
                          })
                        }
                      />
                      <Text style={styles.check_box_text}>Box</Text>
                    </View>

                    <View style={styles.check_box_box}>
                      <CheckBox
                        disabled={false}
                        tintColors={{true: color.black, false: color.black}}
                        value={toggleAccessories.charger}
                        onValueChange={newValue =>
                          setToggleAccessories({
                            ...toggleAccessories,
                            charger: newValue,
                          })
                        }
                      />
                      <Text style={styles.check_box_text}>Charger</Text>
                    </View>

                    <View style={styles.check_box_box}>
                      <CheckBox
                        disabled={false}
                        tintColors={{true: color.black, false: color.black}}
                        // tintColors={color.black}
                        value={toggleAccessories.data_cable}
                        onValueChange={newValue =>
                          setToggleAccessories({
                            ...toggleAccessories,
                            data_cable: newValue,
                          })
                        }
                      />
                      <Text style={styles.check_box_text}>Data Cable</Text>
                    </View>

                    <View style={styles.check_box_box}>
                      <CheckBox
                        disabled={false}
                        tintColors={{true: color.black, false: color.black}}
                        value={toggleAccessories.handfree}
                        onValueChange={newValue =>
                          setToggleAccessories({
                            ...toggleAccessories,
                            handfree: newValue,
                          })
                        }
                      />
                      <Text style={styles.check_box_text}>Hand Free</Text>
                    </View>

                    <View style={styles.check_box_box}>
                      <CheckBox
                        disabled={false}
                        tintColors={{true: color.black, false: color.black}}
                        value={toggleAccessories.kit_only}
                        onValueChange={newValue =>
                          setToggleAccessories({
                            ...toggleAccessories,
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
                  defaultOption={{
                    key: form?.warranty,
                    value: form?.warranty,
                  }}
                  inputStyles={{color: 'black'}}
                  setSelected={val => setForm({...form, warranty: val})}
                  data={WarrantyData}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              </View>
              <Text style={{color: 'black', fontWeight: '700', paddingTop: 20}}>
                Product Image
              </Text>
              {form?.image != null ? (
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
                        borderRadius: 15,
                      }}
                      source={{
                        uri: `https:/www.mobilezmarket.com/images/${item.img}`,
                      }}
                    />
                  )}
                />
              ) : (
                <FlatList
                  horizontal
                  data={form?.productimages}
                  contentContainerStyle={{paddingVertical: 10, zIndex: 999}}
                  renderItem={({item}) => (
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        marginRight: 15,
                        zIndex: 999,
                        marginVertical: 5,
                        borderRadius: 15,
                      }}
                      source={{
                        uri: `https:/www.mobilezmarket.com/images/${item.img}`,
                      }}
                    />
                  )}
                />
              )}

              <Text
                style={{marginVertical: 5, color: 'black', fontWeight: '700'}}>
                Upload upto 20 images
              </Text>
              <TouchableOpacity
                onPress={ImageUpload}
                style={{
                  backgroundColor: color.orange,
                  width: width - 50,
                  height: 42,
                  borderRadius: 10,
                  marginTop: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 12,
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {uploadButton}
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
                placeholder={desc?.details?.description}
                multiline={true}
                value={form.description ?? ''}
                onChangeText={text => setForm({...form, description: text})}
                numberOfLines={5}
              />

              <TouchableOpacity
                onPress={updateMyAd}
                style={{
                  backgroundColor: color.orange,
                  width: width - 50,
                  height: 42,
                  borderRadius: 10,
                  marginTop: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {button}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditScreen;

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
    padding: 9,
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
    alignContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
function dispatch(arg0: {payload: any; type: 'todo/setProfileData'}) {
  throw new Error('Function not implemented.');
}
