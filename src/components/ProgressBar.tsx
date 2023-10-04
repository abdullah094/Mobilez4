import {MY_ADS} from '@env';
import axios from 'axios';
import React, {ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import {color} from '../constants/Colors';
import AlertModale from './AlertModale';
import Header from './Header';
const {width, height} = Dimensions.get('window');

const ProgressBarComponent = () => {
  const profile = useSelector(selectProfileData);
  const dispatch = useDispatch();
  // console.log('profile', profile);
  const form_fields = {
    fName: profile?.first_name,
    lName: profile?.last_name,
    ShopName: profile?.shop_name,
    Shopaddress: profile?.shop_address,
    cnicNumber: profile?.nic_number,
    account_title: profile?.account_title,
    whatsapp_number: profile?.whatsapp_num,
  };
  const [progressForm, setProgressForm] = useState(form_fields);
  const [message, setMessage] = useState('');
  const [form, setform] = useState({});
  const [nicForm, setNicForm] = useState({});
  const [shopForm, setShopForm] = useState({});

  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: 1, // Change this to 1 for full width
  //     duration: 2000,
  //     useNativeDriver: false, // Important: useNativeDriver must be false for layout animations
  //   }).start();
  // }, []);

  // const width = progress.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0%', '100%'], // Set the desired width values
  // });
  const _accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState();
  const [uploadButton, setUploadButton] = useState<ReactNode | String>(
    'Upload Image',
  );
  // const [state, setState] = useState<{
  //   first_name: string;
  //   last_name: string;
  //   shop_name: string;
  //   shop_address: string;
  //   nic_number: string;
  //   account_title: string;
  //   shop_visiting_card: string;
  //   cnic_front_image: string;
  //   cnic_back_image: string;
  //   whatsapp_number: string;
  // }>({
  //   first_name: progressForm.fName,
  //   last_name: progressForm.lName,
  //   shop_name: progressForm.ShopName,
  //   shop_address: progressForm.Shopaddress,
  //   nic_number: progressForm.cnicNumber,
  //   shop_visiting_card: shopForm?.image,
  //   cnic_front_image: form?.image,
  //   cnic_back_image: nicForm?.image,
  //   account_title: progressForm.account_title,
  //   whatsapp_number: progressForm.whatsapp_number,
  // });
  // useEffect(() => {
  //   setState({
  //     first_name: progressForm.fName,
  //     last_name: progressForm.lName,
  //     shop_name: progressForm.ShopName,
  //     shop_address: progressForm.Shopaddress,
  //     nic_number: progressForm.cnicNumber,
  //     shop_visiting_card: shopForm?.image,
  //     cnic_front_image: form?.image,
  //     cnic_back_image: nicForm?.image,
  //     account_title: progressForm.account_title,
  //     whatsapp_number: progressForm.whatsapp_number,
  //   });
  // }, [profile]);

  // console.log('state', form);
  // console.log('state', nicForm);
  // console.log('state', shopForm);
  // console.log('state', state);

  const myAdd = () => {
    axios
      .get(MY_ADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        if (response.data.my_adds) {
          setData(response.data.my_adds);
          // updateProgress();
        } else {
        }
      })
      .catch(error => {
        console.log('hello', error);
      });
  };

  useEffect(() => {
    myAdd();
  }, [_accessToken]);

  // const updateProgress = () => {
  //   const currentDate = new Date();

  //   // Check if a new day has started
  //   if (currentDate.getDate() !== lastUpdateDate.getDate()) {
  //     setAdsPosted([1]);
  //   } else {
  //     const updatedAdsPosted = [...adsPosted, 1];
  //     if (updatedAdsPosted.length <= DAILY_GOAL) {
  //       setAdsPosted(updatedAdsPosted);
  //     } else {
  //       setAdsPosted([1]);
  //     }
  //   }

  //   if (currentDate.getMonth() !== lastUpdateDate.getMonth()) {
  //     setAdsPosted([1]);
  //   }

  //   setLastUpdateDate(currentDate);
  // };
  // const DAILY_GOAL = 3;

  // const totalAdsPosted = adsPosted;
  // const combinedGoal = DAILY_GOAL * 30; // Assuming 30 days in a month
  // const combinedProgressPercentage = (totalAdsPosted / combinedGoal) * 100;

  const ImageUpload = async (type: string) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 10,
    };
    setUploadButton(<ActivityIndicator size={15} color={color.white} />);
    //Image upload Function
    let image: Asset[] = [];
    const result = await launchImageLibrary(options);
    // console.log('result.assets', result);

    result.assets?.forEach(element => {
      image.push(element);
    });
    if (type == 'front') {
      setform(prev => ({...prev, image: image}));
    } else if (type == 'back') {
      setNicForm(prev => ({...prev, image: image}));
    } else {
      setShopForm(prev => ({...prev, image: image}));
    }

    setUploadButton('Upload Image');
  };

  const submitForm = () => {
    if (progressForm.fName == '') {
      setMessage('First Name is required');
    } else if (progressForm.lName == '') {
      setMessage('Last Name is required');
    } else if (progressForm.ShopName == '') {
      setMessage('Shop Name is required');
    } else if (progressForm.Shopaddress == '') {
      setMessage('Shop Address is required');
    } else if (progressForm.cnicNumber == '') {
      setMessage('CNIC Number is required');
    } else if (form == undefined) {
      setMessage('Upload CNIC front image');
    } else if (nicForm == undefined) {
      setMessage('Upload CNIC back image');
    } else if (shopForm == undefined) {
      setMessage('Upload shop card image');
    } else {
      const body = {
        first_name: progressForm.fName,
        last_name: progressForm.lName,
        shop_name: progressForm.ShopName,
        shop_address: progressForm.Shopaddress,
        nic_number: progressForm.cnicNumber,
        shop_visiting_card: shopForm?.image?.[0],
        cnic_front_image: form?.image?.[0],
        cnic_back_image: nicForm?.image?.[0],
        account_title: progressForm.account_title,
        whatsapp_number: progressForm.whatsapp_number,
      };
      console.log('Body', body);
      axios
        .post('https://www.mobilezmarket.com/api/prize-participation', body, {
          headers: {Authorization: `Bearer ${_accessToken}`},
        })
        .then(response => {
          console.log('response', response);

          const {
            message,
            status,
            errors,
          }: {
            message: string;
            status: number;
            errors: {
              first_name: string[];
              last_name: string[];
              account_title: string[];
              shop_name: string;
              shop_address: string;
              nic_number: string;
              shop_visiting_card: string[];
              cnic_front_image: string[];
              cnic_back_image: string[];
              whatsapp_number: string[];
            };
          } = response.data;
          console.log({
            message,
            status,
            errors,
          });

          if (status == 400) {
            Object.entries(errors).map(([key, value]) => {
              // Alert.alert(value[key]);
              setMessage(value[0]);
            });
          } else {
            setMessage(message);
            // dispatch(
            //   setProfileData({
            //     ...profile,
            //     first_name: state.first_name,
            //     last_name: state.last_name,
            //     shop_name: state.shop_name,
            //     shop_address: state.shop_address,
            //     nic_number: state.nic_number,
            //     shop_visiting_card: state.nic_number,
            //     cnic_front_image: state.cnic_front_image,
            //     cnic_back_image: state.cnic_back_image,
            //     account_title: state.account_title,
            //     whatsapp_number: state.whatsapp_number,
            //   }),
            // );
          }
          // setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setMessage(error);
          // setLoading(false);
        });
    }
  };
  const handleFormValidation = () => {
    if (progressForm.fName == '') {
      setMessage('First Name is required');
    } else if (progressForm.lName == '') {
      setMessage('Last Name is required');
    } else if (progressForm.shop_name == '') {
      setMessage('Shop Name is required');
    } else if (progressForm.shop_address == '') {
      setMessage('Shop Address is required');
    } else if (progressForm.cnicNumber == '') {
      setMessage('CNIC Number is required');
    } else if (form == undefined) {
      setMessage('Upload CNIC front image');
    } else if (nicForm == undefined) {
      setMessage('Upload CNIC back image');
    } else if (shopForm == undefined) {
      setMessage('Upload shop card image');
    } else {
      // const body = {}
      // console.log('h', profile);
      // const newProfileData = {
      //   ...profile,
      //   shop_visiting_card: shopForm?.image,
      //   cnic_back_image: nicForm?.image,
      //   cnic_front_image: form?.image,
      //   shop_address: form.shop_address,
      //   shop_name: form.shop_address,
      // };
      // dispatch(setProfileData(newProfileData));
    }
  };

  console.log('profile data', profile);
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-1`}>
            <Header title="Registration Form " />
            {/* <View style={tw`flex-row jrustify-center`}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Monthly Progress</Text>
                <Progress.Circle
                  progress={combinedProgressPercentage / 10}
                  size={400}
                  direction="clockwise"
                  borderWidth={6}
                  showsText
                  strokeCap="butt"
                  thickness={3}
                  color="#FA8128"
                />
                <Text style={styles.progressText}>
                  {totalAdsPosted} / {combinedGoal} ads posted
                </Text>
              </View>
            </View> */}
            {/* {RegistrationForm} */}

            <View style={[tw`w-full p-5`, {marginTop: 10}]}>
              <View style={[tw`justify-center items-center w-full`]}>
                <Text
                  style={[
                    tw`text-[#000000] font-bold text-xl`,
                    {textAlign: 'center', width: '80%'},
                  ]}>
                  Register and win cash prize of Rs 10,000 every month
                </Text>
              </View>
              <TextInput
                mode="outlined"
                label="First name"
                placeholder={'First name'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={false}
                value={progressForm?.fName}
                onChangeText={fName => {
                  setProgressForm({...progressForm, fName});
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}
              />
              <TextInput
                mode="outlined"
                label="Last name"
                placeholder={'Last name'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.lName}
                onChangeText={lName => {
                  setProgressForm({...progressForm, lName});
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />
              <TextInput
                mode="outlined"
                label="Shop name"
                placeholder={'Shop name'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.ShopName}
                onChangeText={shopName => {
                  setProgressForm({...progressForm, ShopName: shopName});
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />
              <TextInput
                mode="outlined"
                label="Shop Address"
                placeholder={'Shop Address'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.Shopaddress}
                onChangeText={shopAdress => {
                  setProgressForm({...progressForm, Shopaddress: shopAdress});
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />
              <TextInput
                mode="outlined"
                label="CNIC Number"
                placeholder={'CNIC Number'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.cnicNumber}
                onChangeText={cnicNumber => {
                  setProgressForm({...progressForm, cnicNumber: cnicNumber});
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />
              <TextInput
                mode="outlined"
                label="Whatsapp Number"
                placeholder={'Whatsapp Number'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.whatsapp_number}
                onChangeText={whatsapp_number => {
                  setProgressForm({
                    ...progressForm,
                    whatsapp_number: whatsapp_number,
                  });
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />

              <TextInput
                mode="outlined"
                label="Account Title"
                placeholder={'Account Title'}
                keyboardType={'ascii-capable'}
                placeholderTextColor={'black'}
                editable={true}
                value={progressForm?.account_title}
                onChangeText={account_title => {
                  setProgressForm({
                    ...progressForm,
                    account_title: account_title,
                  });
                }}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                style={{marginTop: 10, paddingHorizontal: 10}}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
              }}>
              <Text style={tw`font-bold text-black`}>Upload CNIC Front</Text>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    ImageUpload('front');
                  }}
                  style={{
                    borderWidth: 0.7,
                    width: 110,
                    height: 75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    borderRadius: 10,
                  }}>
                  <PlusIcon size={25} name="plus" color={'blue'} />
                </TouchableOpacity>
                <FlatList
                  horizontal
                  data={form?.image}
                  contentContainerStyle={{borderWidth: 1, borderColor: 'red'}}
                  renderItem={({item}) => (
                    <Image
                      style={{
                        width: 110,
                        height: '100%',
                        marginLeft: 10,
                        borderRadius: 5,
                        // marginVertical: 5,
                      }}
                      // resizeMode="contain"
                      source={{uri: item.uri}}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Text style={tw`mt-3 font-bold text-black`}>
                Upload CNIC Back
              </Text>
              {/* <FlatList
                horizontal
                data={nicForm?.image}
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
            </View>

            <View style={tw`w-full items-center justify-center`}>
              <Button
                onPress={() => {
                  ImageUpload('back');
                }}
                mode="contained"
                buttonColor="#015dcf">
                Upload Picture
              </Button>
            </View> */}
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    ImageUpload('back');
                  }}
                  style={{
                    borderWidth: 0.7,
                    width: 110,
                    height: 75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    borderRadius: 10,
                  }}>
                  <PlusIcon size={25} name="plus" color={'blue'} />
                </TouchableOpacity>
                <FlatList
                  horizontal
                  data={nicForm?.image}
                  contentContainerStyle={{borderWidth: 1, borderColor: 'red'}}
                  renderItem={({item}) => (
                    <Image
                      style={{
                        width: 110,
                        height: '100%',
                        marginLeft: 10,
                        borderRadius: 5,
                        // marginVertical: 5,
                      }}
                      // resizeMode="contain"
                      source={{uri: item.uri}}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Text style={tw`mt-3 font-bold text-black`}>
                Upload Shop Card Picture
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    ImageUpload('shop');
                  }}
                  style={{
                    borderWidth: 0.7,
                    width: 110,
                    height: 75,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    borderRadius: 10,
                  }}>
                  <PlusIcon size={25} name="plus" color={'blue'} />
                </TouchableOpacity>
                <FlatList
                  horizontal
                  data={shopForm?.image}
                  contentContainerStyle={{borderWidth: 1, borderColor: 'red'}}
                  renderItem={({item}) => (
                    <Image
                      style={{
                        width: 110,
                        height: '100%',
                        marginLeft: 10,
                        borderRadius: 5,
                        // marginVertical: 5,
                      }}
                      // resizeMode="contain"
                      source={{uri: item.uri}}
                    />
                  )}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Button
                onPress={submitForm}
                mode="contained"
                buttonColor="#015dcf"
                style={{borderRadius: 10}}>
                Submit your form
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
      <AlertModale message={message} setMessage={setMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 20,

    borderRadius: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  progressLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  progressText: {
    fontSize: 20,
    marginTop: 5,
    color: 'black',
  },
  box: {
    backgroundColor: 'red',
    width: 40,
    marginTop: 15,
    alignItems: 'center',
  },
});

export default ProgressBarComponent;
