import {REGISTER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const SignUp = ({navigation, route}) => {
  const {city} = route.params;
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [check, setCheck] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState<any>('Register');
  const [showDropDown, setShowDropDown] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: 'Karachi',
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
          console.log(response.data.errors);
          Alert.alert(JSON.stringify(response.data));
        } else {
          console.log(response.data);
          dispatch(setAccessToken(response.data.token));
          PutAccessTokenToAsync(response.data.token);
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
      await AsyncStorage.setItem('@user_token', accessToken);
      navigation.navigate('OTPScreen', {phone: formData.phone});
      console.log(formData.phone);
    } catch (e) {
      console.log('Error saving Data to AsyncStorage:', e);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`h-full items-center `}>
            <Header title="SignUp" />
            <Text style={tw`py-10 pt-20  text-black text-2xl  mx-10`}>
              Create your <Text style={tw`font-bold`}>Account</Text>
            </Text>

            <View style={tw`bg-white rounded-3x1 p-2 m-4 pb-12 `}>
              <TextInput
                style={styles.box_input}
                value={formData.first_name}
                placeholder="First name"
                textColor="black"
                onChangeText={text => {
                  setFormErrors({...formErrors, first_name: ''});
                  setFormData({...formData, first_name: text});
                }}
              />
              <Text style={styles.errorText}>{formErrors.first_name}</Text>

              <TextInput
                style={styles.box_input}
                value={formData.last_name}
                placeholder="Last name"
                textColor="black"
                onChangeText={text => {
                  setFormErrors({...formErrors, last_name: ''});

                  setFormData({...formData, last_name: text});
                }}
              />
              <Text style={styles.errorText}>{formErrors.last_name}</Text>

              <TextInput
                style={styles.box_input}
                keyboardType="number-pad"
                placeholder="Phone number"
                textColor="black"
                value={formData.phone}
                onChangeText={text => setFormData({...formData, phone: text})}
              />
              <Text style={styles.errorText}>{formErrors.phone}</Text>

              <TextInput
                style={styles.box_input}
                keyboardType="email-address"
                placeholder="Email"
                textColor="black"
                value={formData.email}
                onChangeText={text =>
                  setFormData({...formData, email: text.toLowerCase()})
                }
              />
              <Text style={styles.errorText}>{formErrors.email}</Text>

              <TextInput
                style={styles.box_input}
                value={formData.password}
                placeholder="password"
                secureTextEntry={true}
                textColor="black"
                onChangeText={text =>
                  setFormData({...formData, password: text.toLowerCase()})
                }
              />
              <Text style={styles.errorText}>{formErrors.password}</Text>

              <TextInput
                style={styles.box_input}
                secureTextEntry={true}
                value={formData.conf_password}
                placeholder="confirm password"
                textColor="black"
                onChangeText={text =>
                  setFormData({...formData, conf_password: text.toLowerCase()})
                }
              />
              <Text style={styles.errorText}>{formErrors.conf_password}</Text>

              <View style={tw`mt-1 `}>
                <SelectList
                  placeholder="Account Type"
                  inputStyles={{color: 'black'}}
                  boxStyles={styles.border_style}
                  maxHeight={100}
                  setSelected={val => {
                    setFormData({...formData, acc_type: val});
                  }}
                  data={data}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{borderCurve: 'continuous'}}
                />
              </View>

              {formData.acc_type === 'business' && (
                <>
                  <TextInput
                    style={styles.box_input}
                    value={formData.shop_name}
                    placeholder="shop name"
                    textColor="black"
                    onChangeText={text =>
                      setFormData({...formData, shop_name: text})
                    }
                  />

                  <TextInput
                    style={styles.box_input}
                    value={formData.shop_address}
                    placeholder="shop address"
                    textColor="black"
                    onChangeText={text =>
                      setFormData({...formData, shop_address: text})
                    }
                  />
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  width: width - 40,
                  marginTop: 30,
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => setCheck(!check)}
                  style={{
                    marginLeft: 10,
                    borderWidth: 1,
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  {check && (
                    <MaterialIcon name="check" color={color.orange} size={23} />
                  )}
                </Pressable>
                <Text style={{marginLeft: 5, color: color.black}}>
                  I have read and accept terms and conditions.
                </Text>
              </View>
              <TouchableOpacity
                disabled={!check}
                onPress={fetchData}
                style={{
                  height: 50,
                  backgroundColor: color.orange,
                  marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 25,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  {registerButtonText}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={tw`flex flex-row justify-center w-full bottom-3  z-20 `}></View>

            <View style={tw`flex-row items-center my-5`}>
              <Text style={tw`text-gray-500`}>Already have account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={tw`text-black mx-1`}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
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
  box: {
    width: width - 40,
    marginTop: 15,
  },
  box_heading: {
    color: color.black,
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
  },
  box_input: {
    height: 50,
    fontSize: 12,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 5,
  },
  border_style: {
    borderColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5, // Add some spacing between the input and error message
  },
  social_buttons: tw`bg-[#3B5998] h-11 w-11 mx-4 rounded-full top--6 justify-center items-center flex-row `,
});
