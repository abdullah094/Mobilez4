import {BRANDS, DESCRIPTION, MODELS, POST_AN_AD, SUBMIT_OTP} from '@env';

import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import FormData from 'form-data';
import React, {ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
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
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  selectAccessToken,
  selectOtpVerify,
  selectProfileData,
  setProfileData,
} from '../Redux/Slices';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {
  CategoryData,
  CityData,
  ConditionData,
  RamData,
  StorageData,
  WarrantyData,
} from '../data';
import {
  BrandAPI,
  Category,
  Form,
  IDropDown,
  IndexNavigationProps,
  ModelAPI,
  Profile,
} from '../types';
const {width, height} = Dimensions.get('window');

const PostAnAd = () => {
  const route = useRoute();
  const id = route?.params?.id || 20;
  const from = route.params?.from || 'Post';

  console.log(id, from);
  const otpVerifiction = useSelector(selectOtpVerify);
  const profileData = useSelector(selectProfileData) as Profile;
  const [IsVerifiedStorage, setIsVerifiedStorage] = useState(true);
  const [submitText, setSubmitText] = useState('Submit');
  const [otp, setOtp] = useState('');

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
  const data = [
    {label: 'individual', value: 'individual'},
    {label: 'business', value: 'business'},
  ];
  console.log('otppppppppppp', otpVerifiction);
  const [toggleAccessories, setToggleAccessories] = useState({
    box: false,
    charger: false,
    data_cable: false,
    handfree: false,
    kit_only: false,
  });
  const [brand, setBrand] = useState<string>();
  const [button, setButton] = useState<ReactNode | String>('Save Product');
  const [uploadButton, setUploadButton] = useState<ReactNode | String>(
    'Upload Image',
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtp, setOTP] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isOtherModel, setIsOtherModel] = useState(true);

  const [isTablet, setisTablet] = useState<boolean>(true);
  // const [brand, setBrand] = useState<string>();

  const [desc, setDesc] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      profileData.account_status == '1' &&
      profileData.social_login === null
    ) {
      setIsVerifiedStorage(true);
    } else {
      setIsVerifiedStorage(false);
    }
  }, [profileData]);

  console.log(profileData);
  const [form, setForm] = useState<Form>({
    brand: null,
    model: null,
    price: null,
    storage: null,
    ram: null,
    product_type: null,
    pta_status: null,
    image: [],
    description: null,
    warranty: null,
    otherModel: null,
    category: Category.PHONE,
    accessories: ['box'],
    city: null,
    acc_type: null,
  });
  useEffect(() => {
    setToggleAccessories({
      box: false,
      charger: false,
      data_cable: false,
      handfree: false,
      kit_only: false,
    });

    setForm(prevForm => ({
      ...prevForm,
      brand: null,
      model: null,
      price: null,
      storage: null,
      ram: null,
      product_type: null,
      pta_status: null,
      image: [],
      description: null,
      warranty: null,
      city: null,
      acc_type: null,
      otherModel: null,
    }));
  }, [form.category]);

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

  useEffect(() => {
    getBrandFunc();
  }, [form.category]);

  const getBrandFunc = () => {
    axios
      .get(BRANDS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const data: BrandAPI = response.data;
        let brands = data.brands
          .filter(x => x.category == form.category)
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
    const api = MODELS + form.brand;
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

  const OTPVerify = () => {
    if (otp.length < 5) {
      Alert.alert('OTP is not valid');
      return;
    }

    axios
      .post(
        SUBMIT_OTP,
        {
          otp_code: otp,
          phone_number: phoneNumber,
        },
        {
          headers: {Authorization: `Bearer ${_accessToken}`},
        },
      )
      .then(response => {
        const data = response.data;
        console.log({data});
        if (data.status === 419) {
          Alert.alert(response.data.message);
          setSubmitText('Submit');
          return;
        }
        if (data.status) {
          setSubmitText('Submit');
          setOTP(false);
          setOtp('');
          Alert.alert(data.message);

          dispatch(setProfileData(data.data));
        }
      })
      .catch(error => {
        Alert.alert('Failed', error.message);
        setSubmitText('Submit');
        setOtp('');
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

  const SendOTP = () => {
    setDisabled(true);
    if (phoneNumber.length < 7 || phoneNumber.length > 13) {
      Alert.alert('Phone Number is invalid');
      return;
    }
    axios
      .post(
        'https://www.mobilezmarket.com/api/send-otp',
        {
          phone_number: phoneNumber,
        },
        {
          headers: {Authorization: `Bearer ${_accessToken}`},
        },
      )
      .then(response => {
        const data = response.data;

        if (data.errors) {
          Alert.alert(JSON.stringify(data.errors.phone_number[0]));
          setOTP(false);
        } else {
          Alert.alert(data.message);
          setOTP(true);
        }

        setTimeout(() => {
          setDisabled(false);
        }, 30000);
      })
      .catch(error => {
        Alert.alert('Failed', error.message);
      });
  };

  useEffect(() => {
    getModelFunc();
  }, [form.brand]);

  const PostAdFunc = async () => {
    setButton(<ActivityIndicator size={15} color={color.white} />);
    const data = new FormData();

    let images: {uri: any; name: any; type: any}[] = [];
    form.image?.forEach(image => {
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
          .post(POST_AN_AD, data, {headers})
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
                category: Category.PHONE,
                accessories: ['box'],
              });
              navigation.navigate('Home');
              Alert.alert(response.data.message);
              setButton('Save Product');
            } else {
              setButton('Save Product');
              Alert.alert('Error', 'missing some fields');
            }
          })
          .catch(error => {
            setButton('Save Product');
            Alert.alert('error', error);
          })
      : Alert.alert('Please Login First');
  };

  useEffect(() => {
    form.model?.includes('Other')
      ? setOtherModels(true)
      : setOtherModels(false);
  }, [form.model]); // useEffect(() => {
  //   console.log(form.brand, 'form.brand');
  //   if (form.category === 'Mobile' && form.brand?.includes('Other')) {
  //     setViewType('brand_model');
  //   } else {
  //     setViewType('');
  //   }

  //   if (form.category === 'Tablet') {
  //     setViewType('model');
  //   } else if (form.category === 'Tablet' && form.brand?.includes('Other')) {
  //   }
  // }, [form]);

  // console.log(
  //   viewType,
  //   'setTextInput__________________________________________________________',
  // );
  console.log('this is the form', form);

  const fetchData = () => {
    const api = DESCRIPTION + id;
    // console.log(api)
    axios
      .get(api)
      .then(response => {
        setDesc(response?.data);

        // console.log('Response======', response.data.related_ads);
      })
      .catch((reason: AxiosError) => {
        console.log(reason?.message);
      });
  };
  if (from === 'Edit') {
    useEffect(() => {
      fetchData();
    }, []);
  }

  return (
    <SafeAreaView style={tw`h-full bg-[#015dcf]`}>
      <Header title="Post an Ad" />
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 200,
            // backgroundColor: '#015DCF',
          }}
          keyboardShouldPersistTaps="handled">
          <View style={tw` w-full items-start justify-center px-4`}>
            <View style={tw`w-full`}>
              <View style={tw`flex-row pt-2 items-center justify-between`}>
                <View style={tw`w-1/2  pr-2`}>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="Category"
                    inputStyles={{color: 'grey'}}
                    setSelected={val => {
                      setForm({...form, category: val});
                    }}
                    data={CategoryData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
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
                    setSelected={val => {
                      setForm({...form, brand: val});
                      setisTablet(false);
                    }}
                    data={brands}
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
                    placeholder="Enter brand"
                    placeholderTextColor={'gray'}
                    style={styles.box_input}
                    value={brand}
                    onChangeText={text => setBrand(text)}
                  />
                  <TextInput
                    placeholder="Enter Model"
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

              {form.category === 'Tablet' || form.category === 'Watch' ? (
                <>
                  <TextInput
                    placeholder="Choose model "
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

              {form.category === 'Mobile' && !form.brand?.includes('Other') ? (
                <>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="Choose model"
                    inputStyles={{color: 'black'}}
                    setSelected={val => {
                      setIsOtherModel(false);
                      setForm({...form, model: val});
                    }}
                    data={models}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                </>
              ) : (
                <></>
              )}
              {form.category === 'Mobile' &&
              !form.brand?.includes('Other') &&
              form.model === 'Other' ? (
                <TextInput
                  placeholder="Enter Model"
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
                placeholder="Enter Price"
                placeholderTextColor={'gray'}
                value={form.price ?? ''}
                onChangeText={text => setForm({...form, price: text})}
              />
              {form.category === 'Watch' || (
                <SelectList
                  boxStyles={styles.box}
                  // inputStyles={styles.box}
                  placeholder="Choose Ram"
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
                  placeholder="PTA Status"
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
                  placeholder="Choose Storage"
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
                placeholder="Product Condition"
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
                placeholder="Warranty"
                inputStyles={{color: 'black'}}
                setSelected={val => setForm({...form, warranty: val})}
                data={WarrantyData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
              {profileData.city === null && (
                <>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="City"
                    inputStyles={{color: 'black'}}
                    setSelected={val => setForm({...form, city: val})}
                    data={CityData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                </>
              )}
              {profileData.account_status === null && (
                <SelectList
                  placeholder="Account Type"
                  inputStyles={{color: 'black'}}
                  boxStyles={styles.box}
                  maxHeight={100}
                  setSelected={val => {
                    setForm({...form, acc_type: val});
                  }}
                  data={data}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{borderCurve: 'continuous'}}
                />
              )}

              {IsVerifiedStorage || (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 10,
                      justifyContent: 'space-between',
                    }}>
                    {isOtp ? (
                      <>
                        <TextInput
                          style={{
                            paddingHorizontal: 8,
                            borderWidth: 1,
                            flex: 1,
                            borderRadius: 5,
                            color: 'black',
                            marginRight: 5,
                          }}
                          keyboardType="number-pad"
                          placeholder="Enter OTP"
                          placeholderTextColor={'lightgrey'}
                          value={otp}
                          onChangeText={text =>
                            setOtp(text?.replace(/[^0-9]/g, ''))
                          }
                        />
                        <Button
                          theme={{
                            colors: {primary: color.orange},
                            roundness: 90,
                          }}
                          mode={'contained'}
                          onPress={OTPVerify}
                          compact
                          textColor="white">
                          VERIFY OTP
                        </Button>

                        <Button
                          theme={{
                            colors: {primary: color.orange},
                            roundness: 90,
                          }}
                          mode={'contained'}
                          compact
                          textColor="white"
                          onPress={SendOTP}
                          disabled={disabled}>
                          Resend OTP
                        </Button>
                      </>
                    ) : (
                      profileData.account_status === null && (
                        <>
                          <TextInput
                            style={{
                              paddingHorizontal: 8,
                              borderWidth: 1,
                              flex: 1,
                              borderRadius: 5,
                              color: 'black',
                              marginRight: 5,
                            }}
                            keyboardType="number-pad"
                            placeholder="Enter your number"
                            placeholderTextColor={'lightgrey'}
                            inputMode="numeric"
                            value={phoneNumber}
                            onChangeText={text => {
                              setPhoneNumber(text?.replace(/[^0-9]/g, ''));
                            }}
                          />
                          <Button
                            theme={{
                              colors: {primary: color.orange},
                              roundness: 90,
                            }}
                            mode={'contained'}
                            onPress={SendOTP}
                            textColor="white">
                            SEND OTP
                          </Button>
                        </>
                      )
                    )}
                  </View>
                </>
              )}
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

            <Text
              style={{marginVertical: 5, color: 'black', fontWeight: '700'}}>
              Upload upto 20 images
            </Text>
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
              multiline={true}
              value={form.description ?? ''}
              onChangeText={text => setForm({...form, description: text})}
              numberOfLines={5}
            />

            <TouchableOpacity
              onPress={() => {
                !IsVerifiedStorage
                  ? Alert.alert('Please Verify OTP')
                  : PostAdFunc();
              }}
              disabled={isOtp ? true : false}
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
                style={{
                  color: color.white,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {button}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
