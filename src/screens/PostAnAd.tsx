import {POST_AN_AD, SUBMIT_OTP} from '@env';
import React, {ReactNode, useEffect, useState} from 'react';

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import axios, {AxiosRequestConfig} from 'axios';
import FormData from 'form-data';
import mime from 'mime';

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  selectProfileData,
  setProfileData,
} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import PostAndAdForm from '../components/PostAndAdForm';
import {color} from '../constants/Colors';
import {Category, Form, IndexNavigationProps, Profile} from '../types';
const {width, height} = Dimensions.get('window');

const PredefineData = {
  acc_type: 'individual',
  accessories: ['box'],
  brand: 'Apple',
  category: 'Mobile',
  city: 'Gujrat',
  description: 'Testing ',
  errorAccountStatus: '',
  errorBrand: '',
  errorCategory: '',
  errorCity: '',
  errorModel: '',
  errorPTA_status: '',
  errorPrice: '',
  errorProduct_type: '',
  errorRam: '',
  errorStorage: '',
  errorWarranty: '',
  image: [
    {
      fileName:
        'rn_image_picker_lib_temp_5c3e58f0-1c50-418d-a28e-53149bdac359.jpg',
      fileSize: 94521,
      height: 1600,
      type: 'image/jpeg',
      uri: 'file:///data/user/0/com.wizard.mobilez/cache/rn_image_picker_lib_temp_5c3e58f0-1c50-418d-a28e-53149bdac359.jpg',
      width: 1200,
    },
  ],
  isAccountTypeVisible: false,
  isBrandVisible: false,
  isCategoryVisible: false,
  isCityVisible: false,
  isModelVisible: false,
  isOtherBrand: false,
  isOtherModel: false,
  isOtherProductUsed: false,
  isPTA_statusVisible: false,
  isProduct_typeVisible: false,
  isRamVisible: false,
  isStorageVisible: false,
  isWarrantyVisible: false,
  model: 'I phone x',
  otherModel: false,
  price: '35000',
  product_type: false,
  pta_status: 'Approved',
  ram: '8',
  storage: '32',
  warranty: '',
};
const defaultData = {
  category: Category.PHONE,
  isCategoryVisible: false,
  errorCategory: '',
  brand: '',
  isBrandVisible: false,
  errorBrand: '',
  isOtherBrand: false,
  model: null,
  errorModel: '',
  isOtherModel: false,
  isModelVisible: false,
  otherModel: false,
  price: '',
  errorPrice: '',
  ram: '1',
  errorRam: '',
  isRamVisible: false,
  pta_status: 'Not Aprroved',
  errorPTA_status: '',
  isPTA_statusVisible: false,
  storage: '4',
  errorStorage: '',
  isStorageVisible: false,
  product_type: 'New',
  isProduct_typeVisible: false,
  errorProduct_type: '',
  isOtherProductUsed: false,
  warranty: 'No Warranty',
  errorWarranty: '',
  isWarrantyVisible: false,
  image: [],
  description: null,
  accessories: [''],
  city: '',
  errorCity: '',
  isCityVisible: false,
  isAccountTypeVisible: false,
  errorAccountStatus: '',
};

const PostAnAd = () => {
  const route = useRoute();
  const id = route?.params?.id || 20;
  const from = route.params?.from || 'Post';

  const profileData = useSelector(selectProfileData) as Profile;
  const [reset, setReset] = useState(0);

  const _accessToken = useSelector(selectAccessToken);
  const [IsVerifiedStorage, setIsVerifiedStorage] = useState(true);
  const [submitText, setSubmitText] = useState('Submit');
  const [otp, setOtp] = useState('');

  const navigation = useNavigation<IndexNavigationProps<'PostAnAd'>>();

  const [button, setButton] = useState<ReactNode | String>('Post Add');
  const [uploadButton, setUploadButton] = useState<ReactNode | String>(
    'Upload Image',
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtp, setOTP] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(false);

  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [form, setForm] = useState<Form>(defaultData);

  useEffect(() => {
    if (
      profileData.account_status == '1' &&
      profileData.social_login === null
    ) {
      setIsVerifiedStorage(true);
    } else if (
      profileData.social_login == '1' &&
      profileData.account_status === null
    ) {
      setIsVerifiedStorage(false);
    } else if (
      profileData.social_login == '1' &&
      profileData.account_status == '1'
    ) {
      setIsVerifiedStorage(true);
      setOTP(false);
    } else {
      setIsVerifiedStorage(false);
    }
  }, [profileData]);

  const resetError = () => {
    setForm(prev => ({
      ...prev,
      errorCategory: '',
      errorBrand: '',
      errorModel: '',
      errorPrice: '',
      errorRam: '',
      errorPTA_status: '',
      errorStorage: '',
      errorProduct_type: '',
      errorWarranty: '',
      errorCity: '',
    }));
  };

  useEffect(() => {
    resetError();
  }, [
    form.category,
    form.brand,
    form.model,
    form.price,
    form.ram,
    form.pta_status,
    form.storage,
    form.product_type,
    from.warranty,
    form.city,
  ]);

  // useEffect(() => {
  //   clearData();
  // }, [form.category]);

  const clearData = () => {
    setReset(reset + 1);
    setForm(prev => ({
      ...prev,
      // category: Category.PHONE,
      isCategoryVisible: false,
      errorCategory: '',
      brand: '',
      isBrandVisible: false,
      errorBrand: '',
      isOtherBrand: false,
      model: '',
      errorModel: '',
      isOtherModel: false,
      isModelVisible: false,
      otherModel: false,
      price: '',
      errorPrice: '',
      ram: '',
      errorRam: '',
      isRamVisible: false,
      pta_status: false,
      errorPTA_status: '',
      isPTA_statusVisible: false,
      storage: '',
      errorStorage: '',
      isStorageVisible: false,
      product_type: false,
      isProduct_typeVisible: false,
      errorProduct_type: '',
      isOtherProductUsed: false,
      warranty: '',
      errorWarranty: '',
      isWarrantyVisible: false,
      image: [],
      description: null,
      accessories: ['box'],
      city: '',
      errorCity: '',
      isCityVisible: false,
      isAccountTypeVisible: false,
      errorAccountStatus: '',
    }));
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
    let image: Asset[] = [];
    const result = await launchImageLibrary(options);
    console.log('result.assets', result);

    result.assets?.forEach(element => {
      image.push(element);
    });
    setForm(prev => ({...prev, image: image}));
    setUploadButton('Upload Image');
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
        if (error.message === 'Request failed with status code 419') {
          Alert.alert('Error', 'Number Already exist');
        } else {
          Alert.alert('Failed', error.message);
        }
      });
  };
  const ResendOTP = () => {
    setDisabled(true);
    if (phoneNumber.length < 7 || phoneNumber.length > 13) {
      Alert.alert('Phone Number is invalid');
      return;
    }
    axios
      .post(
        'https://www.mobilezmarket.com/api/resend-otp',
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
        if (error.message === 'Request failed with status code 419') {
          Alert.alert('Error', 'Number Already exist');
        } else {
          Alert.alert('Failed', error.message);
        }
      });
  };

  const UploadImageToServer = (product_id: string) => {
    const formData = new FormData();
    let images: {uri: any; name: any; type: any}[] = [];
    form.image?.forEach(image => {
      if (image.uri == undefined) return;
      if (Platform.OS === 'android') {
        const newImageUri = 'file:///' + image.uri.split('file:/').join('');
        images.push({
          uri: newImageUri,
          name: image.fileName ?? image.uri.split('/').pop(),
          type: mime.getType(newImageUri),
        });
      } else {
        images.push({
          uri: image.uri,
          name: image.fileName ?? image.uri.split('/').pop(),
          type: image.type,
        });
      }
    });
    // console.log('images is here ', images);

    images.forEach((image, index) => {
      formData.append('image[]', image, `image${index + 1}.png`);
    });
    formData.append('product_id', product_id);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.mobilezmarket.com/api/upload-Ad-image',
      headers: {
        Authorization: `Bearer ${_accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };
    axios
      .request(config)
      .then(response => {
        if (response.data.status === 200) {
          // setForm({...form, image: images});
          // console.log(response.data);
          // Alert.alert(response.data.message);
          // setMessage(response.data.message);
        }
        clearData();
      })
      .catch(error => {
        console.log('error' + error);
        clearData();
      });
  };

  const PostAdFunc = async () => {
    setActive(true);
    setButton(<ActivityIndicator size={15} color={color.white} />);
    const data = new FormData();

    Object.entries(form)
      .filter(x => x[0] != 'image')
      .map(([key, value]) => {
        data.append(key, value);
      });

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        Authorization: `Bearer ${_accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      maxBodyLength: Infinity,
    };
    // console.log(data);
    // return;

    // Make the request
    // Make the request
    _accessToken
      ? axios
          .post(POST_AN_AD, data, config)
          .then(response => {
            // console.log(response.data);
            const {
              errors,
              status,
              message,
              product_id,
            }: {
              errors: {
                brand: string[];
                category: string[];
                description: string[];
                // image: string[];
                model: string[];
                price: string[];
                product_type: string[];
                pta_status: string[];
                ram: string[];
                storage: string[];
                warranty: string[];
                city: string[];
              };
              status: number;
              message: string;
              product_id: string;
            } = response.data;

            if (status == 200) {
              UploadImageToServer(product_id);
              const newProfileData = {
                ...profileData,
                city: form.city,
                acc_type: form.acc_type,
              };
              dispatch(setProfileData(newProfileData));
              // setMessage(message);
              navigation.navigate('Home');
            } else {
              if (Object.entries(errors).length > 0) {
                for (const [key, value] of Object.entries(errors)) {
                  Alert.alert(key, value[0]);
                }
              }
            }
            setButton('Post Ad');
          })
          .catch(error => {
            console.log('Error', error);
            setButton('Post Ad');
          })
      : Alert.alert('Please Login First');
  };

  const validateAndSubmitForm = () => {
    if (!IsVerifiedStorage) {
      Alert.alert('Please Verify OTP');
      return;
    }
    if (!form.brand) {
      setForm(prev => ({...prev, errorBrand: 'Brand is required'}));
      return;
    }
    if (!form.model) {
      setForm(prev => ({...prev, errorModel: 'Model is required'}));
      return;
    }
    if (!form.price) {
      setForm(prev => ({...prev, errorPrice: 'Price is required'}));
      return;
    }
    if (!form.pta_status) {
      setForm(prev => ({...prev, errorPTA_status: 'PTA status is required'}));
      return;
    }
    if (!form.storage) {
      setForm(prev => ({...prev, errorStorage: 'Storage is required'}));
      return;
    }
    if (!form.product_type) {
      setForm(prev => ({...prev, errorProduct_type: 'Condition is required'}));
      return;
    }
    if (!form.warranty) {
      setForm(prev => ({...prev, errorWarranty: 'Warranty is required'}));
      return;
    }
    if (!form.ram) {
      setForm(prev => ({...prev, errorRam: 'RAM is required'}));
      return;
    }
    if (profileData.acc_type === null) {
      if (!form.acc_type) {
        setForm(prev => ({...prev, errorBrand: 'Account Type is required'}));
        return;
      }
    }
    if (profileData.city === null) {
      if (!form.city) {
        setForm(prev => ({...prev, errorBrand: 'City is required'}));
        return;
      }
    }
    PostAdFunc();
  };
  // console.log(profileData);
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
              <PostAndAdForm form={form} setForm={setForm} reset={reset} />
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
                          }}
                          mode={'contained'}
                          compact
                          textColor="white"
                          onPress={ResendOTP}
                          disabled={disabled}>
                          Resend OTP
                        </Button>
                      </>
                    ) : (
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
                          }}
                          mode={'contained'}
                          onPress={SendOTP}
                          textColor="white">
                          SEND OTP
                        </Button>
                      </>
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
              onPress={validateAndSubmitForm}
              disabled={isOtp ? true : active ? true : false}
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
                  fontSize: 15,
                }}>
                {button}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <AlertModale message={message} setMessage={setMessage} />
    </SafeAreaView>
  );
};

export default PostAnAd;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    padding: 5,
  },
  emptyError: {
    padding: 0,
  },
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
