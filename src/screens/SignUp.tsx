import {REGISTER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, setAccessToken} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import {color} from '../constants/Colors';
const {width, height} = Dimensions.get('window');
const SignUp = ({navigation, route}) => {
  const {city} = route.params;
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState('');
  const [registerButtonText, setRegisterButtonText] = useState<any>('Register');
  const [showDropDown, setShowDropDown] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    acc_type: '',
    password: '',
    conf_password: '',
    terms: 1,
    area: '',
    shop_name: '',
    shop_address: '',
    emailDomain: '',
  });
  // console.log(formData)

  const data = [
    {label: 'individual', value: 'individual'},
    {label: 'business', value: 'business'},
  ];
  const emailDomains = [
    {label: 'Gmail', value: 'gmail.com'},
    {label: 'Hotmail', value: 'hotmail.com'},
    {label: 'Yahoo', value: 'yahoo.com'},
    // Add more email domains as needed
  ];
  const CityData = [
    {label: 'Karachi', value: 'Karachi'},
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Islamabad', value: 'Islamabad'},
    {label: 'Faisalabad', value: 'Faisalabad'},
    {label: 'Rawalpindi', value: 'Rawalpindi'},
    {label: 'Multan', value: 'Multan'},
    {label: 'Gujranwala', value: 'Gujranwala'},
    {label: 'Peshawar', value: 'Peshawar'},
    {label: 'Quetta', value: 'Quetta'},
    {label: 'Sialkot', value: 'Sialkot'},
    {label: 'Gujrat', value: 'Gujrat'},
    {label: 'Bahawalpur', value: 'Bahawalpur'},
    {label: 'Sargodha', value: 'Sargodha'},
    {label: 'Sukkur', value: 'Sukkur'},
    {label: 'Jhang', value: 'Jhang'},
    {label: 'Larkana', value: 'Larkana'},
    {label: 'Sheikhupura', value: 'Sheikhupura'},
    {label: 'Rahim Yar Khan', value: 'Rahim Yar Khan'},
    {label: 'Chiniot', value: 'Chiniot'},
    {label: 'Sahiwal', value: 'Sahiwal'},
    {label: 'Mardan', value: 'Mardan'},
    {label: 'Kasur', value: 'Kasur'},
    {label: 'Dera Ghazi Khan', value: 'Dera Ghazi Khan'},
    {label: 'Nawabshah', value: 'Nawabshah'},
    {label: 'Mingora', value: 'Mingora'},
    {label: 'Okara', value: 'Okara'},
    {label: 'Mirpur Khas', value: 'Mirpur Khas'},
    {label: 'Chiniot', value: 'Chiniot'},
    {label: 'Kamoke', value: 'Kamoke'},
    {label: 'Sadiqabad', value: 'Sadiqabad'},
    {label: 'Burewala', value: 'Burewala'},
    {label: 'Jhelum', value: 'Jhelum'},
    {label: 'Kohat', value: 'Kohat'},
    {label: 'Khanewal', value: 'Khanewal'},
    {label: 'Dera Ismail Khan', value: 'Dera Ismail Khan'},
    {label: 'Gojra', value: 'Gojra'},
    {label: 'Bahawalnagar', value: 'Bahawalnagar'},
    {label: 'Muridke', value: 'Muridke'},
    {label: 'Pakpattan', value: 'Pakpattan'},
    {label: 'Abottabad', value: 'Abottabad'},
    {label: 'Tando Adam', value: 'Tando Adam'},
    {label: 'Jaranwala', value: 'Jaranwala'},
    {label: 'Khairpur', value: 'Khairpur'},
    {label: 'Chishtian', value: 'Chishtian'},
    {label: 'Daska', value: 'Daska'},
    {label: 'Mandi Bahauddin', value: 'Mandi Bahauddin'},
    {label: 'Ahmedpur East', value: 'Ahmedpur East'},
    {label: 'Kamalia', value: 'Kamalia'},
    {label: 'Tando Allahyar', value: 'Tando Allahyar'},
    {label: 'Khuzdar', value: 'Khuzdar'},
    {label: 'Vihari', value: 'Vihari'},
    {label: 'Attock', value: 'Attock'},
    {label: 'Badin', value: 'Badin'},
    {label: 'Sanghar', value: 'Sanghar'},
    {label: 'Nankana Sahib', value: 'Nankana Sahib'},
    {label: 'Hafizabad', value: 'Hafizabad'},
    {label: 'Kotli', value: 'Kotli'},
    {label: 'Lodhran', value: 'Lodhran'},
    {label: 'Nowshera', value: 'Nowshera'},
    {label: 'Charsadda', value: 'Charsadda'},
    {label: 'Jamshoro', value: 'Jamshoro'},
    {label: 'Kandhkot', value: 'Kandhkot'},
    {label: 'Mianwali', value: 'Mianwali'},
    {label: 'Hassan Abdal', value: 'Hassan Abdal'},
    {label: 'Muzaffargarh', value: 'Muzaffargarh'},
    {label: 'Toba Tek Singh', value: 'Toba Tek Singh'},
    {label: 'Jhang Sadr', value: 'Jhang Sadr'},
    {label: 'Khairpur Mir’s', value: 'Khairpur Mir’s'},
    {label: 'Narowal', value: 'Narowal'},
    {label: 'Shakargarh', value: 'Shakargarh'},
    {label: 'Hujra', value: 'Hujra'},
    {label: 'Kabirwala', value: 'Kabirwala'},
    {label: 'Kasur', value: 'Kasur'},
    {label: 'Mansehra', value: 'Mansehra'},
    {label: 'Layyah', value: 'Layyah'},
    {label: 'Kambar', value: 'Kambar'},
    {label: 'Moro', value: 'Moro'},
    {label: 'Mianwali', value: 'Mianwali'},
    {label: 'Turbat', value: 'Turbat'},
    {label: 'Shahdadkot', value: 'Shahdadkot'},
    {label: 'Nawabshah', value: 'Nawabshah'},
    {label: 'Dadu', value: 'Dadu'},
    {label: 'Ali Pur', value: 'Ali Pur'},
    {label: 'Lodhran', value: 'Lodhran'},
    {label: 'Kotli', value: 'Kotli'},
    {label: 'Loralai', value: 'Loralai'},
    {label: 'Dera Allahyar', value: 'Dera Allahyar'},
    {label: 'Pakpattan', value: 'Pakpattan'},
    {label: 'Sehwan', value: 'Sehwan'},
    {label: 'Chaman', value: 'Chaman'},
    {label: 'Tando Jam', value: 'Tando Jam'},
    {label: 'Kandiaro', value: 'Kandiaro'},
    {label: 'Kunjah', value: 'Kunjah'},
    {label: 'Sahiwal', value: 'Sahiwal'},
    {label: 'Kamber', value: 'Kamber'},
    {label: 'Malakand', value: 'Malakand'},
    {label: 'Mithi', value: 'Mithi'},
    {label: 'Ziarat', value: 'Ziarat'},
    {label: 'Loralai', value: 'Loralai'},
    {label: 'Dera Murad Jamali', value: 'Dera Murad Jamali'},
    {label: 'Kohlu', value: 'Kohlu'},
    {label: 'Gwadar', value: 'Gwadar'},
    {label: 'Dera Bugti', value: 'Dera Bugti'},
    {label: 'Tando Allahyar', value: 'Tando Allahyar'},
    {label: 'Kot Addu', value: 'Kot Addu'},
    {label: 'Turbat', value: 'Turbat'},
    {label: 'Dullewala', value: 'Dullewala'},
    {label: 'Shahkot', value: 'Shahkot'},
    {label: 'Harunabad', value: 'Harunabad'},
    {label: 'Pattoki', value: 'Pattoki'},
    {label: 'Mamu Kanjan', value: 'Mamu Kanjan'},
    {label: 'Jalalpur', value: 'Jalalpur'},
    {label: 'Bhai Pheru', value: 'Bhai Pheru'},
    {label: 'Kabirwala', value: 'Kabirwala'},
    {label: 'Kot Radha Kishan', value: 'Kot Radha Kishan'},
    {label: 'Hujra', value: 'Hujra'},
    {label: 'Pindi Bhattian', value: 'Pindi Bhattian'},
    {label: 'Khalabat', value: 'Khalabat'},
    {label: 'Narang', value: 'Narang'},
    {label: 'Topi', value: 'Topi'},
    {label: 'Kamra', value: 'Kamra'},
    {label: 'Mitha Tiwana', value: 'Mitha Tiwana'},
    {label: 'Basirpur', value: 'Basirpur'},
    {label: 'Naushahro Feroze', value: 'Naushahro Feroze'},
    {label: 'Tando Muhammad Khan', value: 'Tando Muhammad Khan'},
    {label: 'Haripur', value: 'Haripur'},
    {label: 'Shikarpur', value: 'Shikarpur'},
    {label: 'Bhakkar', value: 'Bhakkar'},
    {label: 'Kharian', value: 'Kharian'},
    {label: 'Lala Musa', value: 'Lala Musa'},
    {label: 'Kasur', value: 'Kasur'},
    {label: 'Mian Channun', value: 'Mian Channun'},
    {label: 'Kundian', value: 'Kundian'},
    {label: 'Bhawana', value: 'Bhawana'},
    {label: 'Dajal', value: 'Dajal'},
    {label: 'Chawinda', value: 'Chawinda'},
    {label: 'Qadirpur Ran', value: 'Qadirpur Ran'},
    {label: 'Tandlianwala', value: 'Tandlianwala'},
    {label: 'Khewra', value: 'Khewra'},
    {label: 'Kahror Pakka', value: 'Kahror Pakka'},
    {label: 'Toba Tek Singh', value: 'Toba Tek Singh'},
    {label: 'Tando Qaiser', value: 'Tando Qaiser'},
    {label: 'Khairpur Nathan Shah', value: 'Khairpur Nathan Shah'},
    {label: 'Gujar Khan', value: 'Gujar Khan'},
    {label: 'Haripur', value: 'Haripur'},
    {label: 'Ghotki', value: 'Ghotki'},
    {label: 'Sarai Alamgir', value: 'Sarai Alamgir'},
    {label: 'Pir Mahal', value: 'Pir Mahal'},
    {label: 'Dinga', value: 'Dinga'},
    {label: 'Jampur', value: 'Jampur'},
    {label: 'Mangla', value: 'Mangla'},
    {label: 'Qadirpur Ran', value: 'Qadirpur Ran'},
    {label: 'Pishin', value: 'Pishin'},
    {label: 'Kahna', value: 'Kahna'},
    {label: 'Mianwali', value: 'Mianwali'},
    {label: 'Samundri', value: 'Samundri'},
    {label: 'Renala Khurd', value: 'Renala Khurd'},
    {label: 'Kahuta', value: 'Kahuta'},
    {label: 'Mehar', value: 'Mehar'},
    {label: 'Narowal', value: 'Narowal'},
    {label: 'Khushab', value: 'Khushab'},
    {label: 'Gandava', value: 'Gandava'},
    {label: 'Khairpur', value: 'Khairpur'},
    {label: 'Shahdadpur', value: 'Shahdadpur'},
    {label: 'Matiari', value: 'Matiari'},
    {label: 'Sibi', value: 'Sibi'},
    {label: 'Muzaffarabad', value: 'Muzaffarabad'},
    {label: 'Chaman', value: 'Chaman'},
    {label: 'Miran Shah', value: 'Miran Shah'},
    {label: 'Uthal', value: 'Uthal'},
    {label: 'Moro', value: 'Moro'},
    {label: 'Tump', value: 'Tump'},
    {label: 'Shahpur', value: 'Shahpur'},
    {label: 'Sakrand', value: 'Sakrand'},
    {label: 'Sehwan Sharif', value: 'Sehwan Sharif'},
    {label: 'Khairpur Tamewali', value: 'Khairpur Tamewali'},
    {label: 'Topi', value: 'Topi'},
    {label: 'Leiah', value: 'Leiah'},
    {label: 'Mingora', value: 'Mingora'},
    {label: 'Ghakhar Mandi', value: 'Ghakhar Mandi'},
    {label: 'Tando Ghulam Ali', value: 'Tando Ghulam Ali'},
    {label: 'Thatta', value: 'Thatta'},
    {label: 'Kandhkot', value: 'Kandhkot'},
    {label: 'Hattar', value: 'Hattar'},
    {label: 'Arifwala', value: 'Arifwala'},
    {label: 'Bannu', value: 'Bannu'},
    {label: 'Parachinar', value: 'Parachinar'},
    {label: 'Gakuch', value: 'Gakuch'},
    {label: 'Hangu', value: 'Hangu'},
    {label: 'Timargara', value: 'Timargara'},
    {label: 'Gwadar', value: 'Gwadar'},
    {label: 'Kalat', value: 'Kalat'},
    {label: 'Gandawa', value: 'Gandawa'},
    {label: 'Rakhni', value: 'Rakhni'},
    {label: 'Loralai', value: 'Loralai'},
    {label: 'Gaddani', value: 'Gaddani'},
    {label: 'Kulachi', value: 'Kulachi'},
    {label: 'Zaida', value: 'Zaida'},
    {label: 'Jand', value: 'Jand'},
    {label: 'Lachi', value: 'Lachi'},
    {label: 'Havelian', value: 'Havelian'},
    {label: 'Ladhewala Waraich', value: 'Ladhewala Waraich'},
    {label: 'Kamoke', value: 'Kamoke'},
    {label: 'Matiari', value: 'Matiari'},
    {label: 'Nankana Sahib', value: 'Nankana Sahib'},
    {label: 'Kundian', value: 'Kundian'},
    {label: 'Renala Khurd', value: 'Renala Khurd'},
    {label: 'Risalpur', value: 'Risalpur'},
    {label: 'Kot Mumin', value: 'Kot Mumin'},
    {label: 'Kamra', value: 'Kamra'},
    {label: 'Pindi Bhattian', value: 'Pindi Bhattian'},
    {label: 'Ghakhar Mandi', value: 'Ghakhar Mandi'},
    {label: 'Gojra', value: 'Gojra'},
    {label: 'Makhdumpur', value: 'Makhdumpur'},
    {label: 'Khurrianwala', value: 'Khurrianwala'},
    {label: 'Gurjaani', value: 'Gurjaani'},
  ];
  const validateForm = () => {
    const errors = {};

    if (!formData.first_name) {
      errors.first_name = 'First name is required';
    }

    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[\w\.-]+@gmail\.com|hotmail\.com|([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        formData.email,
      )
    ) {
      errors.email = 'Invalid email format';
    }
    console.log(formData.email + '@' + formData.emailDomain);

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }

    if (!formData.conf_password) {
      errors.conf_password = 'Confirm password is required';
    } else if (formData.conf_password !== formData.password) {
      errors.conf_password = 'Passwords do not match';
    }

    if (!formData.terms) {
      errors.terms = 'You must accept terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if no errors
  };

  const fetchData = async () => {
    if (validateForm()) {
      setRegisterButtonText(
        <ActivityIndicator size="small" color={color.white} />,
      );
      try {
        const response = await axios.post(REGISTER, formData);
        if (response.data.errors) {
          // console.log(errors);
          // Alert.alert(JSON.stringify(response.data.errors));
          setMessage(response.data.errors);
        } else if (response.data.status == 200) {
          console.log(response.data);
          // setMessage(response.data);
          dispatch(setAccessToken(response.data.token));
          PutAccessTokenToAsync(response.data.token);
        } else {
          console.log('Exceptionnn', response);
        }
      } catch (error) {
        console.log(error);
        // Handle error if needed
      } finally {
        // Reset the button text after registration is complete (success or error)
        setRegisterButtonText('Register');
      }
    }
  };
  const PutAccessTokenToAsync = async accessToken => {
    try {
      navigation.navigate('OTPScreen', {phone: formData.phone});
      await AsyncStorage.setItem('@user_token', accessToken);
    } catch (e) {
      console.log('Error saving Data to AsyncStorage:', e);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-1`}>
            <Header title="SignUp" />
            <View style={[tw` flex-1 items-center justify-center`]}>
              <Image
                style={{width: 200, height: 80, marginVertical: 30}}
                source={require('../assets/mobile-logo.png')}
              />
              <Text style={tw`py-4 pt-0  text-black text-2xl  mx-10 font-bold`}>
                Create your Account
              </Text>

              <View style={[tw`bg-white p-2 rounded-2xl py-5 shadow-md `]}>
                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.first_name}
                    // placeholder="First name"
                    textColor="black"
                    onChangeText={text => {
                      setFormErrors({...formErrors, first_name: ''});
                      setFormData({...formData, first_name: text});
                    }}
                  />
                  <Text style={styles.errorText}>{formErrors.first_name}</Text>
                </View>
                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.last_name}
                    textColor="black"
                    onChangeText={text => {
                      setFormErrors({...formErrors, last_name: ''});

                      setFormData({...formData, last_name: text});
                    }}
                  />
                  <Text style={styles.errorText}>{formErrors.last_name}</Text>
                </View>

                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    textColor="black"
                    value={formData.phone}
                    onChangeText={text =>
                      setFormData({...formData, phone: text})
                    }
                  />
                  <Text style={styles.errorText}>{formErrors.phone}</Text>
                </View>

                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Email</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    textColor="black"
                    value={formData.email}
                    onChangeText={text =>
                      setFormData({...formData, email: text.toLowerCase()})
                    }
                  />
                  <Text style={styles.errorText}>{formErrors.email}</Text>
                </View>

                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    secureTextEntry={true}
                    textColor="black"
                    onChangeText={text =>
                      setFormData({...formData, password: text})
                    }
                  />
                  <Text style={styles.errorText}>{formErrors.password}</Text>
                </View>

                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={formData.conf_password}
                    textColor="black"
                    onChangeText={text =>
                      setFormData({...formData, conf_password: text})
                    }
                  />
                  <Text style={styles.errorText}>
                    {formErrors.conf_password}
                  </Text>
                </View>
                {/* <View style={tw`mt-1 `}>
                <SelectList
                  placeholder="City"
                  inputStyles={{color: 'black'}}
                  boxStyles={styles.border_style}
                  maxHeight={100}
                  setSelected={val => {
                    setFormData({...formData, city: val});
                  }}
                  data={CityData}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{borderCurve: 'continuous'}}
                />
              </View> */}

                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>Account Type</Text>
                  <SelectList
                    // placeholder="Account Type"
                    inputStyles={{
                      color: 'black',
                      marginTop: 0,
                    }}
                    boxStyles={styles.border_style}
                    // boxStyles={styles.input}
                    maxHeight={100}
                    setSelected={val => {
                      setFormData({...formData, acc_type: val});
                    }}
                    data={data}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                    dropdownStyles={{
                      borderCurve: 'continuous',
                      // borderTopWidth: 0,
                      // borderTopLeftRadius: 0,
                      // borderTopRightRadius: 0,

                      // marginTop: -10,
                    }}
                  />
                </View>

                {formData.acc_type === 'business' && (
                  <>
                    <View style={styles.input_box}>
                      <Text style={styles.box_heading}>Shop Name</Text>
                      <TextInput
                        style={styles.input}
                        value={formData.shop_name}
                        textColor="black"
                        onChangeText={text =>
                          setFormData({...formData, shop_name: text})
                        }
                      />
                    </View>

                    <View style={styles.input_box}>
                      <Text style={styles.box_heading}>Shop Address</Text>
                      <TextInput
                        style={styles.input}
                        value={formData.shop_address}
                        textColor="black"
                        onChangeText={text =>
                          setFormData({...formData, shop_address: text})
                        }
                      />
                    </View>
                  </>
                )}
                <View style={styles.input_box}>
                  <Text style={styles.box_heading}>City</Text>
                  <SelectList
                    // placeholder="City"
                    inputStyles={{
                      color: 'black',
                    }}
                    boxStyles={styles.border_style}
                    maxHeight={100}
                    setSelected={val => {
                      setFormData({...formData, city: val});
                    }}
                    data={CityData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                    dropdownStyles={{borderCurve: 'continuous'}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width - 40,
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    onPress={() => setCheck(!check)}
                    style={{
                      marginLeft: 10,
                      borderWidth: 1,
                      width: 20,
                      height: 20,
                      // alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    {check && (
                      <MaterialIcon
                        name="check"
                        color={color.orange}
                        size={17}
                      />
                    )}
                  </Pressable>
                  <Text style={{marginLeft: 5, color: color.black}}>
                    I accept and agree to terms and conditions
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 30,
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    disabled={!check}
                    onPress={fetchData}
                    style={{
                      height: 42,
                      backgroundColor: color.orange,

                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {registerButtonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={tw`flex flex-row justify-center w-full bottom-3  z-20 `}></View>

              <View style={tw`flex-row items-center my-5`}>
                <Text style={{color: 'black'}}>Already have account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: color.blue}}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <AlertModale message={message} setMessage={setMessage} />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    alignItems: 'center',
    // backgroundColor:color.white
  },
  input_box: {
    marginTop: 10,
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
  input: {
    justifyContent: 'flex-end',
    paddingHorizontal: 1,
    color: color.black,

    height: 35,
    borderBottomWidth: 1,
    borderColor: color.gray,
    backgroundColor: 'white',
  },
  box: {
    width: width - 40,
    marginTop: 15,
  },
  box_heading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
  },
  box_input: {
    height: 50,
    fontSize: 12,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 5,
  },
  border_style: {
    // borderBottomWidth: 1,
    borderColor: 'white',
    borderWidth: 1,
    // borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5, // Add some spacing between the input and error message
  },
  social_buttons: tw`bg-[#3B5998] h-11 w-11 mx-4 rounded-full top--6 justify-center items-center flex-row `,
});
